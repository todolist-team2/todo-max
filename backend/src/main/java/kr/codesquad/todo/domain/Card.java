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

	public Card(Long categoryId, String title, String content) {
		this.categoryId = categoryId;
		this.title = title;
		this.content = content;
		this.prevCardId = 0L;
		this.createdAt = LocalDateTime.now();
		this.modifiedAt = LocalDateTime.now();
	}

	public Card(Long id, String title, String content, LocalDateTime createdAt, LocalDateTime modifiedAt,
		Long categoryId, Long prevCardId) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.categoryId = categoryId;
		this.prevCardId = prevCardId;
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
