package kr.codesquad.todo.repository;

import java.util.Map;
import java.util.Optional;

import javax.sql.DataSource;

import org.springframework.dao.support.DataAccessUtils;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.codesquad.todo.domain.UserAccount;

@Repository
public class UserAccountRepository {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SimpleJdbcInsert jdbcInsert;

	public UserAccountRepository(DataSource dataSource) {
		this.jdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
		this.jdbcInsert = new SimpleJdbcInsert(dataSource)
			.withTableName("user_account")
			.usingColumns("login_id", "password", "nickname", "image_url")
			.usingGeneratedKeyColumns("id");
	}

	public void save(UserAccount userAccount) {
		jdbcInsert.executeAndReturnKey(new BeanPropertySqlParameterSource(userAccount));
	}

	public Optional<UserAccount> findByLoginId(final String loginId) {
		String findByLoginId = "SELECT id, login_id, password, nickname, image_url FROM user_account WHERE login_id = :loginId";

		return Optional.ofNullable(DataAccessUtils.singleResult(
			jdbcTemplate.query(findByLoginId, Map.of("loginId", loginId),
				(rs, rowNum) -> new UserAccount(
					rs.getString("login_id"),
					rs.getString("password"),
					rs.getString("nickname"),
					rs.getString("image_url")))));
	}
}
