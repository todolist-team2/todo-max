package kr.codesquad.todo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class CardData {

	private final Long id;
	private final String title;
	private final String content;
	private final String nickname;
	private final Long prevCardId;
	private CategoryResponse categoryResponse;

	public CardData(Long id, String title, String content, String nickname, Long prevCardId,
		CategoryResponse categoryResponse) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.nickname = nickname;
		this.prevCardId = prevCardId;
		this.categoryResponse = categoryResponse;
	}

	public CardData(Long id, String title, String content, String nickname) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.nickname = nickname;
		this.prevCardId = 0L;
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

	@JsonIgnore
	public Long getPrevCardId() {
		return prevCardId;
	}

	@JsonIgnore
	public CategoryResponse getCategoryResponse() {
		return categoryResponse;
	}
}
