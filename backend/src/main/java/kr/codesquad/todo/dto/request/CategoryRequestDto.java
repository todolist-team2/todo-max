package kr.codesquad.todo.dto.request;

import kr.codesquad.todo.domain.Category;

public class CategoryRequestDto {

	private String name;


	public String getName() {
		return name;
	}

	public Category toEntity(Long userAccountId) {
		return new Category(name, userAccountId);
	}
}
