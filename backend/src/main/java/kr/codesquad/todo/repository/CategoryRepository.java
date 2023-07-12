package kr.codesquad.todo.repository;

import kr.codesquad.todo.domain.Category;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;

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

	public Long save(Category category) {
		return simpleJdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(category)).longValue();
	}
}
