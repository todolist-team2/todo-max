package kr.codesquad.todo.infrastructure.filter;

import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;

public class UnAuthorizedException extends BusinessException {

	public UnAuthorizedException(ErrorCode errorCode) {
		super(errorCode);
	}

	public UnAuthorizedException(String message, ErrorCode errorCode) {
		super(message, errorCode);
	}
}
