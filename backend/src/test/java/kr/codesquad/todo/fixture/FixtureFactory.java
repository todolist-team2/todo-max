package kr.codesquad.todo.fixture;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.dto.request.CategoryRequest;
import kr.codesquad.todo.dto.response.CardData;
import kr.codesquad.todo.dto.response.CategoryResponse;

public class FixtureFactory {

	public static CardCreationRequest createCardCreationRequest() {
		return new CardCreationRequest("Github 공부하기", "열심히 해야지~");
	}

	public static CardCreationRequest updateCardCreationRequest() {
		return new CardCreationRequest("수정된 제목", "수정된 내용");
	}

	public static CategoryRequest createCategoryRequest() {
		return new CategoryRequest("1일 1커밋 도전!");
	}

	public static CardMoveRequest createCardMoveRequest(Long fromPrevId, Long toCategoryId, Long toPrevId) {
		return new CardMoveRequest(fromPrevId, toCategoryId, toPrevId);
	}

	public static CardData createCardData(Long cardId, Long prevCardId) {
		return new CardData(cardId, "제목을 뭘로 할까~", "테스트 내용", "bruni", prevCardId, new CategoryResponse(1L, "to-do"));
	}
}
