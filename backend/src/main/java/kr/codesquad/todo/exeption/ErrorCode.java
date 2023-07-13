package kr.codesquad.todo.exeption;

public enum ErrorCode {

	CATEGORY_NOT_FOUND(404, "카테고리 아이디를 찾을 수 없습니다.");

	private final int statusCode;
	private final String message;

	ErrorCode(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public String getMessage() {
		return message;
	}
}
