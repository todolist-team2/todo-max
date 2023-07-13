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
	// TODO: 카테고리도 활동 기록에 저장해야 하는지?
	// 카테고리 추가
	public Long saveCategory(CategoryRequestDto categoryRequestDto) {
		Long userAccountId = 1L;
		return categoryRepository.save(categoryRequestDto.toEntity(userAccountId));
	}


	public Long createCategory(CategoryRequestDto categoryRequestDto) {
		Long userAccountId = 1L;
		return categoryRepository.save(new Category(categoryRequestDto.getName(), userAccountId));
	}
}
