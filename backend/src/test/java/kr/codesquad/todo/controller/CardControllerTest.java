package kr.codesquad.todo.controller;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.service.CardService;

@WebMvcTest(controllers = CardController.class)
class CardControllerTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private CardService cardService;

	@DisplayName("카테고리 아이디와 카드 등록 정보가 주어지면 카드 등록에 성공한다.")
	@Test
	void registerTest() throws Exception {
		// given
		given(cardService.register(anyLong(), any(CardCreationRequest.class))).willReturn(1L);

		// when & then
		mockMvc.perform(post("/api/cards")
				.contentType(MediaType.APPLICATION_JSON)
				.queryParam("categoryId", "1")
				.content(objectMapper.writeValueAsString(FixtureFactory.createCardCreationRequest())))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.categoryId").value(1))
			.andDo(print());
	}

	@DisplayName("유효하지 않은 카테고리 아이디가 주어지면 404 NOT FOUND 를 응답한다.")
	@Test
	void givenInvalidCategoryId_Response404NotFound() throws Exception {
		// given
		given(cardService.register(anyLong(), any(CardCreationRequest.class))).willThrow(
			new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

		// when & then
		mockMvc.perform(post("/api/cards")
				.contentType(MediaType.APPLICATION_JSON)
				.queryParam("categoryId", "1")
				.content(objectMapper.writeValueAsString(FixtureFactory.createCardCreationRequest())))
			.andExpect(status().isNotFound())
			.andExpect(jsonPath("$.errorCode").value("CATEGORY_NOT_FOUND"))
			.andExpect(jsonPath("$.message").value("카테고리 아이디를 찾을 수 없습니다."))
			.andDo(print());
	}

	@DisplayName("카드 이동 테스트")
	@Nested
	class MoveTest {

		@DisplayName("카드 아이디와 카드 이동정보가 주어지면 카드 이동에 성공한다.")
		@Test
		void moveTest() throws Exception {
			// given
			willDoNothing().given(cardService).move(anyLong(), any(CardMoveRequest.class));

			// when & then
			mockMvc.perform(patch("/api/cards/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(FixtureFactory.createCardMoveRequest(1L, 2L, 0L))))
				.andExpect(status().isOk())
				.andDo(print());
		}

		@DisplayName("잘못된 카드 아이디가 주어지면 예외를 던진다.")
		@Test
		void givenInvalidCardId_thenThrowsException() throws Exception {
			// given
			willThrow(new BusinessException(ErrorCode.CARD_NOT_FOUND))
				.given(cardService).move(anyLong(), any(CardMoveRequest.class));

			// when & then
			mockMvc.perform(patch("/api/cards/1")
					.contentType(MediaType.APPLICATION_JSON)
					.content(objectMapper.writeValueAsString(FixtureFactory.createCardMoveRequest(1L, 2L, 0L))))
				.andExpect(status().isNotFound())
				.andDo(print());
		}
	}
}
