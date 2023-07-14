package kr.codesquad.todo.repository;

import kr.codesquad.todo.domain.Category;
import kr.codesquad.todo.repository.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


@ExtendWith(MockitoExtension.class)
@DataJpaTest
class CategoryRepositoryTest {

	@Autowired
	private CategoryRepository categoryRepository;

	private Long userId;

	@BeforeEach
	public void setUp() {
		userId = 1L;
	}


	@Test
	@DisplayName("카테고리 저장 테스트")
	public void testSaveCategory() {

		// given
		Category category = new Category("공부 하기", userId);


		// when
		Long categoryId = categoryRepository.save(category);

		// then
		Assertions.assertEquals(0L, categoryId);

		Mockito.verify(categoryRepository, Mockito.times(1)).save(category);
	}
}