package kr.codesquad.todo.service;

import kr.codesquad.todo.domain.Category;
import kr.codesquad.todo.dto.request.CategoryRequestDto;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


	// 카테고리 수정
	@Transactional
	public Long modifyCategory(Long categoryId, CategoryRequestDto categoryRequestDto) {
		// existsById() 메소드를 사용해서 해당 카테고리가 존재하는지 확인
		if (!categoryRepository.existById(categoryId)) {
			throw new BusinessException(ErrorCode.CATEGORY_NOT_FOUND);
		}

		// 존재한다면 해당 카테고리를 수정
		Long userAccountId = 1L;
		return categoryRepository.update(categoryId, categoryRequestDto.toEntity(userAccountId));
	}
	}
}
