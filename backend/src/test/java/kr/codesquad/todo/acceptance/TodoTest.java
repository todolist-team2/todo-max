package kr.codesquad.todo.acceptance;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class TodoTest {

	private static ExtractableResponse<Response> 전체_카드_조회() {
		return RestAssured
			.given().log().all()
			.when().get("/api/cards")
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
