package kr.codesquad.todo.infrastructure.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.infrastructure.filter.UnAuthorizedException;

@Component
public class JwtProvider {

	private final SecretKey key;
	private final long expirationMilliseconds;

	public JwtProvider(Jwt jwt) {
		this.key = Keys.hmacShaKeyFor(jwt.getSecretKey().getBytes(StandardCharsets.UTF_8));
		this.expirationMilliseconds = jwt.getExpirationMilliseconds();
	}

	public String createToken(final String payload) {
		Date now = new Date();

		return Jwts.builder()
			.setSubject(payload)
			.setIssuedAt(now)
			.setExpiration(new Date(now.getTime() + expirationMilliseconds))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public void validateToken(final String token) {
		try {
			Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token);
		} catch (IllegalArgumentException | SecurityException | MalformedJwtException e) {
			throw new UnAuthorizedException("잘못된 JWT 서명입니다.", ErrorCode.JWT_INVALID);
		} catch (UnsupportedJwtException e) {
			throw new UnAuthorizedException("지원하지 않는 JWT 입니다.", ErrorCode.JWT_INVALID);
		} catch (SignatureException e) {
			throw new UnAuthorizedException("토큰의 SECRET KEY가 변조되었습니다.", ErrorCode.JWT_INVALID);
		} catch (ExpiredJwtException e) {
			throw new UnAuthorizedException(ErrorCode.JWT_EXPIRED);
		}
	}
}
