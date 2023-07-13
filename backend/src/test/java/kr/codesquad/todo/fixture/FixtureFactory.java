package kr.codesquad.todo.fixture;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;

public class FixtureFactory {

	public static CardCreationRequest createCardCreationRequest() {
		return new CardCreationRequest("Github 공부하기", "열심히 해야지~");
	}

	public static CardMoveRequest createCardMoveRequest(Long fromPrevId, Long toCategoryId, Long toPrevId) {
		return new CardMoveRequest(fromPrevId, toCategoryId, toPrevId);
	}
}
