package kr.codesquad.todo.domain;

public enum ActionType {

	REGISTER("등록"),
	MODIFY("변경"),
	DELETE("삭제"),
	MOVE("이동");

	private final String description;

	ActionType(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
