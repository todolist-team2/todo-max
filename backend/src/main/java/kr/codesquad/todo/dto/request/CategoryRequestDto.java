package kr.codesquad.todo.dto.request;

import kr.codesquad.todo.domain.Category;

import javax.validation.constraints.NotBlank;

public class CategoryRequestDto {
	@NotBlank(message = "카테고리 이름을 입력해주세요.")
	private String name;


	public String getName() {
		return name;
	}

	public Category toEntity(Long userAccountId) {
		return new Category(name, userAccountId);
	}
}
