package kr.codesquad.todo.infrastructure.jwt;

import java.util.Enumeration;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

public final class JwtExtractor {

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_PREFIX = "Bearer";

	private JwtExtractor() {
	}

	public static Optional<String> extractAuthenticationParam(HttpServletRequest request) {
		Enumeration<String> headers = request.getHeaders(AUTHORIZATION_HEADER);
		String authenticationParam = null;
		while (headers.hasMoreElements()) {
			authenticationParam = getAuthenticationParam(headers, authenticationParam);
		}
		return Optional.ofNullable(authenticationParam);
	}

	private static String getAuthenticationParam(Enumeration<String> headers, String authenticationParam) {
		String value = headers.nextElement();
		if (value.toLowerCase().startsWith(BEARER_PREFIX.toLowerCase())) {
			authenticationParam = value.split(" ")[1].trim();
		}
		return authenticationParam;
	}
}
