package kr.codesquad.todo.domain;

import java.time.LocalDateTime;

public class Action {

	private Long id;
	private String actionName;
	private String cardName;
	private String originCategoryName;
	private String targetCategoryName;
	private LocalDateTime createdAt;
	private Long userId;

	public Action(Long id, String actionName, String cardName, String originCategoryName, String targetCategoryName, LocalDateTime createdAt, Long userId) {
		this.id = id;
		this.actionName = actionName;
		this.cardName = cardName;
		this.originCategoryName = originCategoryName;
		this.targetCategoryName = targetCategoryName;
		this.createdAt = createdAt;
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public String getActionName() {
		return actionName;
	}

	public String getCardName() {
		return cardName;
	}

	public String getOriginCategoryName() {
		return originCategoryName;
	}

	public String getTargetCategoryName() {
		return targetCategoryName;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public Long getUserId() {
		return userId;
	}
}
