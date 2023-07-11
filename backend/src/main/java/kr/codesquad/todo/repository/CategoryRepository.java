package kr.codesquad.todo.repository;

import java.util.Map;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;

	public CategoryRepository(NamedParameterJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public Boolean existById(Long categoryId) {
		String existById = "SELECT EXISTS (SELECT id FROM category WHERE id = :id) LIMIT 1";
		return jdbcTemplate.queryForObject(existById, Map.of("id", categoryId), Boolean.class);
	}
}
