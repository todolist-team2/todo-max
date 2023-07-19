package kr.codesquad.todo.dto.request;

public class JoinRequest {

	private String loginId;
	private String password;
	private String nickname;

	public JoinRequest() {
	}

	public JoinRequest(String loginId, String password, String nickname) {
		this.loginId = loginId;
		this.password = password;
		this.nickname = nickname;
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
}
