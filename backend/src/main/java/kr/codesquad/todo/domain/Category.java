package kr.codesquad.todo.domain;

public class Category {

	private Long id;
	private String name;
	private Long userAccountId;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public Long getUserAccountId() {
		return userAccountId;
	}

	public Category(String name, Long userAccountId) {
		this.name = name;
		this.userAccountId = userAccountId;
	}
}
