package kr.codesquad.todo.infrastructure.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties("jwt")
public class JwtProperties {

	private String secretKey;
	private long expirationMilliseconds;

	@ConstructorBinding
	public JwtProperties(String secretKey, long expirationMilliseconds) {
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
