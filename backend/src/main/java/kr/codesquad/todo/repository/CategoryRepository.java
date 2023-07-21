package kr.codesquad.todo.repository;

import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.codesquad.todo.domain.Category;

@Repository
public class CategoryRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SimpleJdbcInsert simpleJdbcInsert;

	public CategoryRepository(NamedParameterJdbcTemplate jdbcTemplate, DataSource dataSource) {
		this.jdbcTemplate = jdbcTemplate;
		this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource)
			.withTableName("category")
			.usingColumns("name", "user_account_id")
			.usingGeneratedKeyColumns("id");
	}

	public Boolean existById(Long categoryId) {
		String existById = "SELECT EXISTS (SELECT id FROM category WHERE id = :id)";
		return jdbcTemplate.queryForObject(existById, Map.of("id", categoryId), Boolean.class);
	}

	// 카테고리 추가
	public Long save(Category category) {
		return simpleJdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(category)).longValue();
	}

	// 카테고리 수정
	public void update(Long categoryId, Category category) {
		jdbcTemplate.update("UPDATE category SET name = :name WHERE id = :id",
			Map.of("name", category.getName(), "id", categoryId));
	}

	// 카테고리 삭제
	public void delete(Long categoryId) {
		jdbcTemplate.update("DELETE FROM category WHERE id = :id",
			Map.of("id", categoryId));
	}

	public Optional<String> findNameById(Long id) {
		return Optional.ofNullable(DataAccessUtils.singleResult(
			jdbcTemplate.query("SELECT name FROM category WHERE id = :id", Map.of("id", id),
				(rs, rowNum) -> rs.getString("name"))));
	}
}
