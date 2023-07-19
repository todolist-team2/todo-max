package kr.codesquad.todo.domain;

import java.time.LocalDateTime;

public enum ActionType {

	REGISTER("등록"),
	MODIFY("변경"),
	DELETE("삭제"),
	MOVE("이동");

	private final String description;

	ActionType(String description) {
		this.description = description;
	}

	public Action from(String cardName, String originCategoryName, String targetCategoryName, Long userId) {
		return new Action(null, description, cardName, originCategoryName, targetCategoryName, LocalDateTime.now(),
			userId);
	}

	public String getDescription() {
		return description;
	}
}
