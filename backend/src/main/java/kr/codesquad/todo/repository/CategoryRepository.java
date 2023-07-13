package kr.codesquad.todo.repository;

import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class CategoryRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;

	public CategoryRepository(NamedParameterJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public Boolean existById(Long categoryId) {
		String existById = "SELECT EXISTS (SELECT id FROM category WHERE id = :id)";
		return jdbcTemplate.queryForObject(existById, Map.of("id", categoryId), Boolean.class);
	}
}
