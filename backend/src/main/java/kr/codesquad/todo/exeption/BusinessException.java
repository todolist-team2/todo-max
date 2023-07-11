package kr.codesquad.todo.exeption;

public class BusinessException extends RuntimeException {

	public BusinessException(String message) {
		super(message);
	}
}
