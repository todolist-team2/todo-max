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
import org.springframework.http.HttpStatus;
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

	private static ExtractableResponse<Response> 전체_카드_조회() {
		return RestAssured
			.given().log().all()
			.when().get("/api/cards")
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

	private static ExtractableResponse<Response> 카테고리별_카드_조회(int categoryId) {
		return RestAssured
			.given().log().all().queryParam("categoryId", categoryId)
			.when().get("/api/cards")
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

	@DisplayName("전체 카드를 조회한다.")
	@Test
	void retrieveAllCards() {
		// when
		var response = 전체_카드_조회();

		// then
		assertThat(response.statusCode()).isEqualTo(200);
	}

	@DisplayName("카테고리별 카드 조회를 성공한다.")
	@Test
	void retrieveOneCards_success() {
		// when
		var response = 카테고리별_카드_조회(1);

		// then
		assertAll(
			() -> assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value()),
			() -> assertThat(response.jsonPath().getString("categoryId")).isNotEmpty()
		);
	}

	@DisplayName("카테고리별 카드 조회를 실패한다.")
	@Test
	void retrieveOneCards_fail() {
		// when
		var response = 카테고리별_카드_조회(100000);

		// then
		assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
	}
}
