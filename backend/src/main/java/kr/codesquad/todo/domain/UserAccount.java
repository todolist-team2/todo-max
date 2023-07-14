package kr.codesquad.todo.domain;

import java.time.LocalDateTime;

public class UserAccount {

	private Long id;
	private String loginId;
	private String password;
	private String nickname;
	private String imageUrl;
	private LocalDateTime createdAt;

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
}
