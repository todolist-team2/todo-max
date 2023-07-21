package kr.codesquad.todo.acceptance;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseInitializer {

	private static final String TRUNCATE_QUEREY = "TRUNCATE TABLE %s";

	@Autowired
	private DataSource dataSource;

	@Autowired
	private NamedParameterJdbcTemplate jdbcTemplate;

	private final List<String> tableNames = new ArrayList<>();

	@PostConstruct
	public void afterConstruct() {
		try {
			DatabaseMetaData metaData = dataSource.getConnection().getMetaData();
			ResultSet tables = metaData.getTables(null, null, null, new String[] {"TABLE"});

			while (tables.next()) {
				String tableName = tables.getString("TABLE_NAME");
				tableNames.add(tableName);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void initTables() {
		jdbcTemplate.update("INSERT INTO user_account(login_id, password, nickname, image_url) " +
			"VALUES ('bruni', 'asdf1234', 'bruni', 'image-url')", Map.of());
		jdbcTemplate.update("INSERT INTO category(name, user_account_id) " +
			"VALUES ('to-do', 1), " +
			"       ('doing', 1), " +
			"       ('completed', 1)", Map.of());
		jdbcTemplate.update("INSERT INTO card(title, content, category_id, prev_card_id) " +
			"VALUES ('제목을 뭘로 할까~', '테스트 내용', 1, 0), " +
			"       ('Github 공부하기', '열심히 하자!', 1, 1), " +
			"       ('HTML/CSS 공부하기', '재밌겠다~', 1, 2), " +
			"       ('Spring 정복하기', '반드시 정복', 1, 3)", Map.of());
	}

	@Transactional
	public void truncateTables() {
		for (String tableName : tableNames) {
			truncateTable(tableName);
		}
	}

	private void truncateTable(final String tableName) {
		jdbcTemplate.update(String.format(TRUNCATE_QUEREY, tableName), Map.of());
	}
}
