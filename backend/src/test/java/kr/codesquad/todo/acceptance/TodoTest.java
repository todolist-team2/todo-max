package kr.codesquad.todo.acceptance;

import static org.assertj.core.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class TodoTest {

	@DisplayName("card를 업데이트 한다")
	@Test
	@Sql(statements = "insert into category (id, name, user_account_id) values (1,'todo',1);")
	@Sql(statements = "insert into user_account (id, login_id, password, nickname, image_url) values (1,'bruni','password','bruni','image_url');")
	void update() {
		// given
		카드를_만든다();

		// when
		카드를_수정한다();

		// then
		수정된_카드를_검증한다();
	}

	private static void 수정된_카드를_검증한다() {
		var response = 카드를_가져온다();
		Assertions.assertAll(
			() -> assertThat(response.jsonPath().getString("title")).isEqualTo("변경후 타이틀"),
			() -> assertThat(response.jsonPath().getString("content")).isEqualTo("수정후 내용"),
			() -> assertThat(response.jsonPath().getString("nickname")).isEqualTo("bruni")
		);
	}

	private static ExtractableResponse<Response> 카드를_가져온다() {
		return RestAssured
			.given().log().all()
			.when().get("/api/cards/1")
			.then().log().all()
			.extract();
	}

	private static ExtractableResponse<Response> 카드를_수정한다() {
		return RestAssured
			.given().log().all().queryParam("cardId", "1")
			.contentType(ContentType.JSON).body(Map.of("title", "변경후 타이틀", "content", "수정후 내용"))
			.when().put("/api/cards/1")
			.then().log().all()
			.extract();
	}

	private static ExtractableResponse<Response> 카드를_만든다() {
		return RestAssured
			.given().log().all().queryParam("categoryId", "1")
			.contentType(ContentType.JSON).body(Map.of("title", "변경전 타이틀", "content", "수정전 내용"))
			.when().post("/api/cards")
			.then().log().all()
			.extract();
	}
}
