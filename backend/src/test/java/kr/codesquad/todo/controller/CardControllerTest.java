package kr.codesquad.todo.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.service.CardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
		given(cardService.register(anyLong(), any(CardCreationRequest.class))).willThrow(new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

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
}
