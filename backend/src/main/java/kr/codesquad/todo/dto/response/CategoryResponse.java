package kr.codesquad.todo.dto.response;

import java.util.Objects;

public class CategoryResponse {

	private final Long categoryId;
	private final String categoryName;

	public CategoryResponse(Long categoryId, String categoryName) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CategoryResponse that = (CategoryResponse)o;
		return Objects.equals(categoryId, that.categoryId) && Objects.equals(categoryName,
			that.categoryName);
	}

	@Override
	public int hashCode() {
		return Objects.hash(categoryId, categoryName);
	}
}
