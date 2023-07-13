package kr.codesquad.todo.exeption;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BusinessException.class)
	public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException e) {
		return ResponseEntity.status(e.getErrorCode().getStatusCode())
				.body(new ErrorResponse(e.getErrorCode(), e.getErrorCode().getMessage()));
	}
}
