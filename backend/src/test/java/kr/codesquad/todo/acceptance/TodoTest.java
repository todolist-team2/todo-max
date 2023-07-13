package kr.codesquad.todo.acceptance;

import static org.assertj.core.api.Assertions.*;

import java.util.Map;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import kr.codesquad.todo.domain.Card;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class TodoTest {

	@Autowired
	DatabaseInitializer databaseInitializer;
	@Autowired
	DatabaseAccessor databaseAccessor;

	@BeforeEach
	void setUp() {
		databaseInitializer.truncateTables();
		databaseInitializer.initTables();
	}

	@DisplayName("카드 이동 시나리오")
	@Nested
	class MoveTest {

		@DisplayName("카드를 이동한다.")
		@Test
		void moveTest() {
			// given

			// when
			var response = 카드를_이동한다(1L);

			// then
			이동된_카드를_검증한다(response);
		}

		@DisplayName("잘못된 카드번호가 주어지면 카드 이동에 실패한다.")
		@Test
		void given_moveFailTest() {
			// given

			// when
			var response = 카드를_이동한다(1234L);

			// then
			assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
		}
	}

	private ExtractableResponse<Response> 카드를_이동한다(Long cardId) {
		return RestAssured
			.given().log().all()
			.contentType(ContentType.JSON)
			.body(Map.of("fromPrevCardId", "0", "toCategoryId", "2", "toPrevCardId", "0"))
			.when()
			.patch("/api/cards/" + cardId)
			.then().log().all()
			.extract();
	}

	private void 이동된_카드를_검증한다(ExtractableResponse<Response> response) {
		Card card = databaseAccessor.findOneCardById(1L);

		SoftAssertions.assertSoftly(softAssertions -> {
			softAssertions.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
			softAssertions.assertThat(card.getCategoryId()).isEqualTo(2L);
			softAssertions.assertThat(card.getPrevCardId()).isEqualTo(0L);
		});
	}
}
