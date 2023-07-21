package kr.codesquad.todo.infrastructure.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.infrastructure.jwt.JwtExtractor;
import kr.codesquad.todo.infrastructure.jwt.JwtProvider;

public class JwtFilter extends OncePerRequestFilter {

	private final JwtProvider jwtProvider;

	public JwtFilter(JwtProvider jwtProvider) {
		this.jwtProvider = jwtProvider;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		JwtExtractor.extractAuthenticationParam(request)
			.ifPresentOrElse(jwtProvider::validateToken, () -> {
				throw new UnAuthorizedException(ErrorCode.EMPTY_AUTH_TOKEN);
			});
		filterChain.doFilter(request, response);
	}
}
