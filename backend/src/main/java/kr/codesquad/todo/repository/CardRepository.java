package kr.codesquad.todo.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.codesquad.todo.domain.Card;
import kr.codesquad.todo.dto.response.CardData;
import kr.codesquad.todo.dto.response.CardDataForActionResponse;
import kr.codesquad.todo.dto.response.CategoryResponse;

@Repository
public class CardRepository {

	private static final RowMapper<CardData> CARD_DATA_ROW_MAPPER = ((rs, rowNum) -> new CardData(
		rs.getLong("id"),
		rs.getString("title"),
		rs.getString("content"),
		rs.getString("nickname"),
		rs.getLong("prev_card_id"),
		new CategoryResponse(rs.getLong("category_id"), rs.getString("name"))));
	private static final RowMapper<CardDataForActionResponse> CARD_DATA_FOR_ACTION_RESPONSE_ROW_MAPPER = (rs, rowNum) ->
		new CardDataForActionResponse(
			rs.getString("title"),
			rs.getString("name"),
			rs.getLong("user_account_id")
		);
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

	public void deleteById(Long cardId) {
		String deleteById = "UPDATE card SET is_deleted = true WHERE id = :id";
		jdbcTemplate.update(deleteById, Map.of("id", cardId));
	}

	public Optional<Long> findIdByPrevId(Long prevId, Long categoryId) {
		String findByPrevId = "SELECT id FROM card WHERE prev_card_id = :prevId AND category_id = :categoryId AND is_deleted = false";
		return Optional.ofNullable(DataAccessUtils.singleResult(jdbcTemplate.query(findByPrevId,
			Map.of("prevId", prevId, "categoryId", categoryId),
			(rs, rowNum) -> rs.getLong("id"))));
	}

	public void updateCategoryIdAndPrevCardIdById(Long id, Long categoryId, Long prevId) {
		String updateCategoryIdAndPrevCardIdById =
			"UPDATE card SET prev_card_id = :prevId, category_id = :categoryId WHERE id = :id AND is_deleted = false";
		jdbcTemplate.update(updateCategoryIdAndPrevCardIdById,
			Map.of("prevId", prevId, "categoryId", categoryId, "id", id));
	}

	public void update(Long id, String title, String content) {
		String updateSql = "UPDATE card SET title = :title, content = :content WHERE id = :id AND is_deleted = false";
		SqlParameterSource parameters = new MapSqlParameterSource()
			.addValue("id", id)
			.addValue("title", title)
			.addValue("content", content);
		jdbcTemplate.update(updateSql, parameters);
	}

	public Optional<CardData> findById(Long cardId) {
		String findById = "SELECT c.id,title,content,nickname,prev_card_id,cg.id AS category_id,cg.name "
			+ "FROM card as c "
			+ "LEFT JOIN category as cg ON c.category_id = cg.id "
			+ "LEFT JOIN user_account as u ON cg.user_account_id = u.id "
			+ "WHERE c.id = :id AND is_deleted = false";
		return Optional.ofNullable(
			DataAccessUtils.singleResult(
				jdbcTemplate.query(findById, Map.of("id", cardId), (rs, rowNum) ->
					new CardData(
						rs.getLong("id"),
						rs.getString("title"),
						rs.getString("content"),
						rs.getString("nickname"),
						rs.getLong("prev_card_id"),
						new CategoryResponse(rs.getLong("category_id"), rs.getString("name"))
					)
				)
			)
		);
	}

	public List<CardData> findAll() {
		String findAll =
			"SELECT c.id, c.title, c.content, u.nickname, c.prev_card_id, cg.id as category_id, cg.name FROM card c "
				+ "RIGHT JOIN category cg ON c.category_id = cg.id AND c.is_deleted = false "
				+ "LEFT JOIN user_account u ON cg.user_account_id = u.id "
				+ "WHERE u.id = 1";
		return jdbcTemplate.query(findAll, CARD_DATA_ROW_MAPPER);
	}

	public List<CardData> findByCategoryId(Long categoryId) {
		String findByCategoryId =
			"SELECT c.id, c.title, c.content, u.nickname, c.prev_card_id, cg.id as category_id, cg.name FROM card c "
				+ "RIGHT JOIN category cg ON c.category_id = cg.id AND c.is_deleted = false"
				+ "LEFT JOIN user_account u ON cg.user_account_id = u.id "
				+ "WHERE u.id = 1 AND cg.id = :categoryId";
		return jdbcTemplate.query(findByCategoryId, Map.of("categoryId", categoryId), CARD_DATA_ROW_MAPPER);
	}

	public void deleteAllByCategoryId(Long categoryId) {
		String deleteAllByCategoryId = "UPDATE card SET is_deleted = true WHERE category_id = :categoryId";
		jdbcTemplate.update(deleteAllByCategoryId, Map.of("categoryId", categoryId));
	}

	public Optional<CardDataForActionResponse> findCardDataById(Long cardId) {
		String cardDataForActionResponse = "SELECT c.title, cg.name, cg.user_account_id FROM card c "
			+ "JOIN category cg ON cg.id = c.category_id "
			+ "WHERE c.id = :id";
		return Optional.ofNullable(
			DataAccessUtils.singleResult(
				jdbcTemplate.query(cardDataForActionResponse, Map.of("id", cardId),
					CARD_DATA_FOR_ACTION_RESPONSE_ROW_MAPPER)));
	}
}
