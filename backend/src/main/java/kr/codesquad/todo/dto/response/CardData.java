package kr.codesquad.todo.dto.response;

public class CardData {
	private final Long id;
	private final String title;
	private final String content;
	private final String nickname;

	public CardData(Long id, String title, String content, String nickname) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.nickname = nickname;
	}

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public String getNickname() {
		return nickname;
	}
}
