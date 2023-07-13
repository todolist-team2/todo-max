package kr.codesquad.todo.repository;

import kr.codesquad.todo.domain.Card;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Map;
import java.util.Optional;

@Repository
public class CardRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SimpleJdbcInsert simpleJdbcInsert;

	public CardRepository(NamedParameterJdbcTemplate jdbcTemplate, DataSource dataSource) {
		this.jdbcTemplate = jdbcTemplate;
		this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource)
				.withTableName("card")
				.usingColumns("title", "content", "category_id", "prev_card_id")
				.usingGeneratedKeyColumns("id");
	}

	public Optional<Long> findHeadIdByCategoryId(Long categoryId) {
		String findHeadIdByCategoryId = "SELECT id FROM card WHERE category_id = :categoryId AND prev_card_id = 0";
		try {
			return Optional.ofNullable(
					jdbcTemplate.queryForObject(findHeadIdByCategoryId, Map.of("categoryId", categoryId), Long.class));
		} catch (EmptyResultDataAccessException e) {
			return Optional.empty();
		}
	}

	public Long save(Card card) {
		return simpleJdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(card)).longValue();
	}

	public void updateById(Long id, Long prevCardId) {
		String updateById = "UPDATE card SET prev_card_id = :prevCardId WHERE id = :id";
		jdbcTemplate.update(updateById, Map.of("id", id, "prevCardId", prevCardId));
	}

	public Optional<Long> findPrevIdById(Long cardId) {
		String findPrevIdById = "SELECT prev_card_id FROM card WHERE id = :id";
		try {
			return Optional.ofNullable(jdbcTemplate.queryForObject(findPrevIdById, Map.of("id", cardId), Long.class));
		} catch (EmptyResultDataAccessException e) {
			return Optional.empty();
		}
	}

	public void deleteById(Long cardId) {
		String deleteById = "DELETE FROM card WHERE id = :id";
		jdbcTemplate.update(deleteById, Map.of("id", cardId));
	}

	public Optional<Long> findIdByPrevId(Long prevId, Long categoryId) {
		String findByPrevId = "SELECT id FROM card WHERE prev_card_id = :prevId AND category_id = :categoryId";
		return Optional.ofNullable(DataAccessUtils.singleResult(jdbcTemplate.query(findByPrevId,
				Map.of("prevId", prevId, "categoryId", categoryId),
				(rs, rowNum) -> rs.getLong("id"))));
	}

	public Optional<Long> findCategoryIdById(Long id) {
		String findCategoryIdById = "SELECT category_id FROM card WHERE id = :id";
		return Optional.ofNullable(DataAccessUtils.singleResult(jdbcTemplate.query(findCategoryIdById,
				Map.of("id", id),
				(rs, rowNum) -> rs.getLong("category_id"))));
	}
}
