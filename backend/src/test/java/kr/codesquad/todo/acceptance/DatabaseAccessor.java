package kr.codesquad.todo.acceptance;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

import kr.codesquad.todo.domain.Card;

@Component
public class DatabaseAccessor {

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	public Card findOneCardById(Long id) {
		return DataAccessUtils.singleResult(jdbcTemplate.query(
			"SELECT id, title, content, created_at, modified_at, category_id, prev_card_id FROM card WHERE id=:id",
			Map.of("id", id), (rs, rowNum) -> new Card(
				rs.getLong("id"),
				rs.getString("title"),
				rs.getString("content"),
				rs.getTimestamp("created_at").toLocalDateTime(),
				rs.getTimestamp("modified_at").toLocalDateTime(),
				rs.getLong("category_id"),
				rs.getLong("prev_card_id")
			)));
	}
}
