package kr.codesquad.todo.domain;

import java.time.LocalDateTime;

public class Card {

	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
	private Long categoryId;
	private Long prevCardId;

	public Long getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public LocalDateTime getModifiedAt() {
		return modifiedAt;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public Long getPrevCardId() {
		return prevCardId;
	}
}
