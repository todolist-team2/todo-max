package kr.codesquad.todo.exeption;

public enum ErrorCode {

	CATEGORY_NOT_FOUND(404, "카테고리 아이디를 찾을 수 없습니다."),
	CARD_NOT_FOUND(404, "카드 아이디를 찾을 수 없습니다."),
	VALIDATION_FAILED(400, "입력값이 올바르지 않습니다."),
	EMPTY_AUTH_TOKEN(401, "헤더에 토큰값이 존재하지 않습니다."),
	JWT_INVALID(401, "유효하지 않은 토큰입니다."),
	JWT_EXPIRED(401, "만료된 토큰입니다."),
	ENCODE_FAIL(500, "패스워드 암호화에 실패했습니다."),
	AUTHENTICATION_FAIL(401, "로그인에 실패했습니다.");

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
