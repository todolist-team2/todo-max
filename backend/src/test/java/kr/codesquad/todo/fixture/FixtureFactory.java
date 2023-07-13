package kr.codesquad.todo.fixture;

import kr.codesquad.todo.dto.request.CardCreationRequest;

public class FixtureFactory {

	public static CardCreationRequest createCardCreationRequest() {
		return new CardCreationRequest("Github 공부하기", "열심히 해야지~");
	}
}
