package kr.codesquad.config.jwt;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import kr.codesquad.todo.infrastructure.jwt.Jwt;
import kr.codesquad.todo.infrastructure.jwt.JwtProperties;

@EnableConfigurationProperties(JwtProperties.class)
public class JwtConfig {

	private final JwtProperties properties;

	public JwtConfig(JwtProperties properties) {
		this.properties = properties;
	}

	@Bean
	public Jwt jwt() {
		return new Jwt(properties.getSecretKey(), properties.getExpirationMilliseconds());
	}
}
