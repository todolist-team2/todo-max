package kr.codesquad.todo.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import kr.codesquad.todo.domain.Category;
import kr.codesquad.todo.dto.request.CategoryRequest;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.repository.CategoryRepository;

@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

	@Mock
	private CategoryRepository categoryRepository;

	@InjectMocks
	private CategoryService categoryService;

	@DisplayName("카테고리 등록 정보가 주어지면 카테고리 등록에 성공한다.")
	@Test
	void saveTest() {
		// given
		CategoryRequest categoryRequest = FixtureFactory.createCategoryRequest();
		given(categoryRepository.save(any(Category.class))).willReturn(1L);

		// when
		Long categoryId = categoryService.createCategory(categoryRequest);

		// then
		assertAll(
			() -> assertNotNull(categoryId, "저장된 카테고리 아이디는 null이 아니어야 함"),
			() -> assertEquals(
				categoryRequest.getName(),
				FixtureFactory.createCategoryRequest().getName(),
				"저장된 카테고리의 이름이 일치해야 함"),
			() -> then(categoryRepository).should(times(1)).save(any(Category.class))
		);
	}

	@DisplayName("변경하고자 하는 카테고리 아이디가 존재하지 않는다면 수정이 불가하다.")
	@Test
	void modifyTest() {
		// given
		CategoryRequest categoryRequest = FixtureFactory.createCategoryRequest();
		given(categoryRepository.existById(1L)).willReturn(Boolean.FALSE);

		// when & then
		assertThrows(BusinessException.class,
			() -> categoryService.updateCategory(1L, categoryRequest));
	}
}
