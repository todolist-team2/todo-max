package kr.codesquad.todo.infrastructure.jwt;

public class Jwt {

	private final String secretKey;
	private final long expirationMilliseconds;

	public Jwt(String secretKey, long expirationMilliseconds) {
		this.secretKey = secretKey;
		this.expirationMilliseconds = expirationMilliseconds;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public long getExpirationMilliseconds() {
		return expirationMilliseconds;
	}
}
