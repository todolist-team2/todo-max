package kr.codesquad.todo.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.dto.response.Slice;

@Repository
public class ActionRepository {

	private DataSource dataSource;
	private NamedParameterJdbcTemplate jdbcTemplate;
	private SimpleJdbcInsert jdbcInsert;

	public ActionRepository(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		this.jdbcInsert = new SimpleJdbcInsert(dataSource)
			.withTableName("action")
			.usingColumns("action_name", "card_name", "origin_category_name", "target_category_name", "user_id")
			.usingGeneratedKeyColumns("id");
	}

	public void save(Action action) {
		jdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(action));
	}

	public Slice<Action> findAll(int page, int size) {
		Connection connection = null;
		PreparedStatement statement = null;
		ResultSet rs = null;
		try {
			String sql = "SELECT * FROM action limit ?, ?";
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			statement.setInt(1, page * size);
			statement.setInt(2, size);
			rs = statement.executeQuery();
			List<Action> actions = new ArrayList<>();
			while (rs.next()) {
				Action a = mapper(rs);
				actions.add(a);
			}

			statement.setInt(1, (page + 1) * size);
			rs = statement.executeQuery();
			boolean hasNextPage = rs.next();

			return new Slice<>(actions, hasNextPage);

		} catch (SQLException e) {
			throw new RuntimeException(e.getSQLState());
		} finally {
			try {
				rs.close();
				statement.close();
				connection.close();
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		}
	}

	// Object Mapping
	public Action mapper(ResultSet rs) throws SQLException {
		return new Action(
			rs.getLong("id"),
			rs.getString("action_name"),
			rs.getString("card_name"),
			rs.getString("origin_category_name"),
			rs.getString("target_category_name"),
			rs.getTimestamp("created_at").toLocalDateTime(),
			rs.getLong("user_id"));
	}

	public void deleteAll() {
		Connection connection = null;
		PreparedStatement statement = null;
		try {
			String sql = "DELETE FROM action";
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new RuntimeException(e.getSQLState());
		} finally {
			try {
				statement.close();
				connection.close();
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		}
	}
}
