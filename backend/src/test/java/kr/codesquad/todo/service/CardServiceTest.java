package kr.codesquad.todo.service;

import kr.codesquad.todo.domain.Card;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.repository.CardRepository;
import kr.codesquad.todo.repository.CategoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

	@Mock
	private CardRepository cardRepository;
	@Mock
	private CategoryRepository categoryRepository;

	@InjectMocks
	private CardService cardService;

	@DisplayName("카테고리 아이디와 카드 등록 정보가 주어지면 카드 등록에 성공한다.")
	@Test
	void registerTest() {
		// given
		given(categoryRepository.existById(anyLong())).willReturn(Boolean.TRUE);
		given(cardRepository.findHeadIdByCategoryId(anyLong())).willReturn(Optional.of(1L));
		given(cardRepository.save(any(Card.class))).willReturn(2L);
		willDoNothing().given(cardRepository).updateById(anyLong(), anyLong());

		// when
		cardService.register(1L, FixtureFactory.createCardCreationRequest());

		// then
		assertAll(
				() -> then(categoryRepository).should(times(1)).existById(anyLong()),
				() -> then(cardRepository).should(times(1)).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(times(1)).save(any(Card.class)),
				() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong())
		);
	}

	@DisplayName("올바르지 않은 카테고리 아이디가 주어지면 예외를 던진다.")
	@Test
	void givenInvalidCategoryId_thenThrowsException() {
		// given
		given(categoryRepository.existById(anyLong())).willReturn(Boolean.FALSE);

		// when & then
		assertAll(
				() -> assertThatThrownBy(() -> cardService.register(100L, FixtureFactory.createCardCreationRequest()))
						.isInstanceOf(BusinessException.class)
						.extracting("errorCode").isEqualTo(ErrorCode.CATEGORY_NOT_FOUND),
				() -> then(categoryRepository).should(times(1)).existById(anyLong()),
				() -> then(cardRepository).should(never()).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(never()).save(any(Card.class)),
				() -> then(cardRepository).should(never()).updateById(anyLong(), anyLong())
		);
	}

	@DisplayName("headId가 empty 라면 update 되지 않는다.")
	@Test
	void givenEmptyHeadId_thenDoNotUpdate() {
		// given
		given(categoryRepository.existById(anyLong())).willReturn(Boolean.TRUE);
		given(cardRepository.findHeadIdByCategoryId(anyLong())).willReturn(Optional.empty());
		given(cardRepository.save(any(Card.class))).willReturn(2L);

		// when
		cardService.register(1L, FixtureFactory.createCardCreationRequest());

		// then
		assertAll(
				() -> then(categoryRepository).should(times(1)).existById(anyLong()),
				() -> then(cardRepository).should(times(1)).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(times(1)).save(any(Card.class)),
				() -> then(cardRepository).should(never()).updateById(anyLong(), anyLong())
		);
	}

	@DisplayName("카드 이동 테스트")
	@Nested
	class MoveTest {

		@DisplayName("카드 id와 카드 이동 정보가 주어지면 카드 이동에 성공한다.")
		@Test
		void moveTest() {
			// given
			given(cardRepository.findCategoryIdById(anyLong())).willReturn(Optional.of(1L));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.of(2L));
			given(cardRepository.findIdByPrevId(5L, 2L)).willReturn(Optional.of(6L));
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 5L));

			// then
			assertAll(
					() -> then(cardRepository).should(times(1)).findCategoryIdById(anyLong()),
					() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(2)).updateById(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(1)).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong())
			);
		}

		@DisplayName("카테고리의 마지막 카드를 옮기면 이동에 성공한다.")
		@Test
		void givenLastCardInCategory_thenSuccess() {
			// given
			given(cardRepository.findCategoryIdById(anyLong())).willReturn(Optional.of(1L));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.empty());
			given(cardRepository.findIdByPrevId(4L, 2L)).willReturn(Optional.of(6L));
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 4L));

			// then
			assertAll(
					() -> then(cardRepository).should(times(1)).findCategoryIdById(anyLong()),
					() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(1)).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong())
			);
		}

		@DisplayName("가고자 하는 카테고리에 아무것도 없어도 이동에 성공한다.")
		@Test
		void givenNothingExistsToCategoryId_thenSuccess() {
			// given
			given(cardRepository.findCategoryIdById(anyLong())).willReturn(Optional.of(1L));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.of(2L));
			given(cardRepository.findIdByPrevId(4L, 2L)).willReturn(Optional.empty());
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 4L));

			// then
			assertAll(
					() -> then(cardRepository).should(times(1)).findCategoryIdById(anyLong()),
					() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong()),
					() -> then(cardRepository).should(times(1)).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong())
			);
		}
	}
}
