package kr.codesquad.todo.service;

import kr.codesquad.todo.dto.request.CategoryRequest;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.repository.CardRepository;
import kr.codesquad.todo.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {

	private final CategoryRepository categoryRepository;
	private final CardRepository cardRepository;

	public CategoryService(CategoryRepository categoryRepository, CardRepository cardRepository) {
		this.categoryRepository = categoryRepository;
		this.cardRepository = cardRepository;
	}

	// 카테고리 추가
	@Transactional
	public Long createCategory(CategoryRequest categoryRequest) {
		Long userAccountId = 1L;
		return categoryRepository.save(categoryRequest.toEntity(userAccountId));
	}

	// 카테고리 수정
	@Transactional
	public void updateCategory(Long categoryId, CategoryRequest categoryRequest) {
		// existsById() 메소드를 사용해서 해당 카테고리가 존재하는지 확인
		if (!categoryRepository.existById(categoryId)) {
			throw new BusinessException(ErrorCode.CATEGORY_NOT_FOUND);
		}

		// 존재한다면 해당 카테고리를 수정
		Long userAccountId = 1L;
		categoryRepository.update(categoryId, categoryRequest.toEntity(userAccountId));
	}

	// 카테고리 삭제
	@Transactional
	public void deleteCategory(Long categoryId) {
		// existsById() 메소드를 사용해서 해당 카테고리가 존재하는지 확인
		if (!categoryRepository.existById(categoryId)) {
			throw new BusinessException(ErrorCode.CATEGORY_NOT_FOUND);
		}

		// 외래키 제약 조건이 없으니 순서는 상관 없을 것 같음
		// 존재한다면 해당 카테고리를 삭제
		categoryRepository.delete(categoryId);

		// 해당 카테고리 아아디를 가진 카드들 전부 삭제
		cardRepository.deleteAllByCategoryId(categoryId);
	}
}
