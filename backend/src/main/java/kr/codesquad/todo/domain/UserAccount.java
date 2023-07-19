package kr.codesquad.todo.domain;

import java.time.LocalDateTime;

import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;

public class UserAccount {

	private Long id;
	private String loginId;
	private String password;
	private String nickname;
	private String imageUrl;
	private LocalDateTime createdAt;

	public UserAccount(String loginId, String password, String nickname, String imageUrl) {
		this.loginId = loginId;
		this.password = password;
		this.nickname = nickname;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public String getLoginId() {
		return loginId;
	}

	public String getPassword() {
		return password;
	}

	public String getNickname() {
		return nickname;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void validatePassword(final String encryptedPassword) {
		if (password.equals(encryptedPassword)) {
			return;
		}
		throw new BusinessException(ErrorCode.AUTHENTICATION_FAIL);
	}
}
