package kr.codesquad.todo.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

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

	public Action actionRowMapper(ResultSet rs) throws SQLException {
		return new Action(
				rs.getLong("id"),
				rs.getString("action_name"),
				rs.getString("card_name"),
				rs.getString("origin_category_name"),
				rs.getString("target_category_name"),
				rs.getTimestamp("created_at").toLocalDateTime(),
				rs.getLong("user_id"));
	}

	public void save(Action action) {
		jdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(action));
	}

	public List<Action> findAll() {
		String sql = "SELECT id, action_name, card_name, origin_category_name, target_category_name, created_at, user_id FROM action ORDER BY id DESC";
		return jdbcTemplate.query(sql, (rs, rowNum) -> actionRowMapper(rs));
	}

	public Slice<Action> findSliceByCursor(String cursor, int size) {
		String sql = "SELECT id, action_name, card_name, origin_category_name, target_category_name, created_at, user_id " +
				"FROM action " +
				"WHERE id < :cursor " +
				"ORDER BY id DESC " +
				"LIMIT :size";
				List<Action> actionList = jdbcTemplate.query(sql, Map.of("size", size + 1, "cursor", cursor), (rs, rowNum) -> actionRowMapper(rs));
		boolean hasNextPage = actionList.size() > size;
		if (hasNextPage) {
			actionList.remove(actionList.size() - 1);
		}
		String currentCursor = actionList.get(actionList.size() - 1).getId().toString();
		return new Slice<>(actionList, currentCursor, hasNextPage);
	}

	public void deleteAll() {
		jdbcTemplate.update("DELETE FROM action", Map.of());
	}
}
