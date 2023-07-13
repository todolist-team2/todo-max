package kr.codesquad.todo.acceptance;

import org.assertj.core.api.Assertions;
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
		Assertions.assertThat(response.statusCode()).isEqualTo(200);
	}

	@DisplayName("카테고리별 카드를 조회한다.")
	@Test
	void retrieveOneCards() {
		// when
		var response1 = 카테고리별_카드_조회(1);
		var response2 = 카테고리별_카드_조회(100000);

		// then
		Assertions.assertThat(response1.statusCode()).isEqualTo(HttpStatus.OK.value());
		Assertions.assertThat(response1.jsonPath().getString("categoryId")).isNotEmpty();
		Assertions.assertThat(response2.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
	}
}
