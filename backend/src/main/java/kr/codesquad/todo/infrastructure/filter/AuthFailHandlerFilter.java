package kr.codesquad.todo.infrastructure.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.todo.exeption.ErrorResponse;

public class AuthFailHandlerFilter extends OncePerRequestFilter {

	private final ObjectMapper objectMapper;

	public AuthFailHandlerFilter(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response);
		} catch (UnAuthorizedException e) {
			response.setStatus(e.getErrorCode().getStatusCode());
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter()
				.write(objectMapper.writeValueAsString(new ErrorResponse(e.getErrorCode(), e.getMessage())));
		}
	}
}
