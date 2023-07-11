package kr.codesquad.todo.dto.request;

import kr.codesquad.todo.domain.Card;

public class CardCreationRequest {

	private String title;
	private String content;

	public CardCreationRequest() {
	}

	public CardCreationRequest(String title, String content) {
		this.title = title;
		this.content = content;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public Card toEntity(Long categoryId) {
		return new Card(categoryId, title, content);
	}
}
