package kr.codesquad.todo.repository;

import kr.codesquad.todo.domain.Category;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.Map;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@Repository
public class CategoryRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SimpleJdbcInsert simpleJdbcInsert;
	private final DataSource dataSource;


	public CategoryRepository(NamedParameterJdbcTemplate jdbcTemplate, DataSource dataSource) {
		this.jdbcTemplate = jdbcTemplate;
		this.simpleJdbcInsert = new SimpleJdbcInsert(dataSource)
				.withTableName("category")
				.usingColumns("name", "user_account_id")
				.usingGeneratedKeyColumns("id");
		this.dataSource = dataSource;
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
	public Long update(Long categoryId, Category category) {
		Connection connection = null;
		PreparedStatement statement = null;
		try {
			String sql = "UPDATE category SET name = ? WHERE id = ?";
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			statement.setString(1, category.getName());
			statement.setLong(2, categoryId);
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new RuntimeException(e.getSQLState());
		} finally {
			try {
				statement.close();
				connection.close();
			} catch (SQLException e) {
				throw new RuntimeException(e.getMessage());
			}
		}
		return categoryId;
	}


	// 카테고리 삭제
	public void delete(Long categoryId) {
		Connection connection = null;
		PreparedStatement statement = null;
		try {
			String sql = "DELETE FROM category WHERE id = ?";
			connection = dataSource.getConnection();
			statement = connection.prepareStatement(sql);
			statement.setLong(1, categoryId);
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new RuntimeException(e.getSQLState());
		} finally {
			try {
				statement.close();
				connection.close();
			} catch (SQLException e) {
				throw new RuntimeException(e.getMessage());
			}
		}
	}
}
