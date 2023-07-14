package kr.codesquad.todo.repository;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.dto.response.Slice;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ActionRepository {

	private DataSource dataSource;

	public ActionRepository(DataSource dataSource) {
		this.dataSource = dataSource;
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
