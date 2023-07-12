package kr.codesquad.todo.service;

import kr.codesquad.todo.domain.Category;
import kr.codesquad.todo.dto.request.CategoryRequestDto;
import kr.codesquad.todo.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;

	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}


	public Long createCategory(CategoryRequestDto categoryRequestDto) {
		Long userAccountId = 1L;
		return categoryRepository.save(new Category(categoryRequestDto.getName(), userAccountId));
	}
}
