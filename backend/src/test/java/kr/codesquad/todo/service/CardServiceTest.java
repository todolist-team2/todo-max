package kr.codesquad.todo.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.anyLong;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import kr.codesquad.todo.domain.Card;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.repository.CardRepository;
import kr.codesquad.todo.repository.CategoryRepository;

@ExtendWith(MockitoExtension.class)
class CardServiceTest {

	@Mock
	private CardRepository cardRepository;
	@Mock
	private CategoryRepository categoryRepository;
	@Mock
	private ActionService actionService;

	@InjectMocks
	private CardService cardService;

	@DisplayName("카드 등록 테스트")
	@Nested
	class RegisterTest {

		@DisplayName("카테고리 아이디와 카드 등록 정보가 주어지면 카드 등록에 성공한다.")
		@Test
		void registerTest() {
			// given
			given(cardRepository.findHeadIdByCategoryId(anyLong())).willReturn(Optional.of(1L));
			given(cardRepository.save(any(Card.class))).willReturn(2L);
			willDoNothing().given(cardRepository).updateById(anyLong(), anyLong());
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.of("TO-DO"));

			// when
			cardService.register(1L, FixtureFactory.createCardCreationRequest());

			// then
			assertAll(
				() -> then(cardRepository).should(times(1)).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(times(1)).save(any(Card.class)),
				() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong()),
				() -> then(categoryRepository).should(times(1)).findNameById(anyLong())
			);
		}

		@DisplayName("올바르지 않은 카테고리 아이디가 주어지면 예외를 던진다.")
		@Test
		void givenInvalidCategoryId_thenThrowsException() {
			// given
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.empty());

			// when & then
			assertAll(
				() -> assertThatThrownBy(() -> cardService.register(100L, FixtureFactory.createCardCreationRequest()))
					.isInstanceOf(BusinessException.class)
					.extracting("errorCode").isEqualTo(ErrorCode.CATEGORY_NOT_FOUND),
				() -> then(cardRepository).should(never()).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(never()).save(any(Card.class)),
				() -> then(cardRepository).should(never()).updateById(anyLong(), anyLong())
			);
		}

		@DisplayName("headId가 empty 라면 update 되지 않는다.")
		@Test
		void givenEmptyHeadId_thenDoNotUpdate() {
			// given
			given(cardRepository.findHeadIdByCategoryId(anyLong())).willReturn(Optional.empty());
			given(cardRepository.save(any(Card.class))).willReturn(2L);
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.of("TO-DO"));

			// when
			cardService.register(1L, FixtureFactory.createCardCreationRequest());

			// then
			assertAll(
				() -> then(cardRepository).should(times(1)).findHeadIdByCategoryId(anyLong()),
				() -> then(cardRepository).should(times(1)).save(any(Card.class)),
				() -> then(cardRepository).should(never()).updateById(anyLong(), anyLong()),
				() -> then(categoryRepository).should(times(1)).findNameById(anyLong())
			);
		}
	}

	@DisplayName("카드 이동 테스트")
	@Nested
	class MoveTest {

		@DisplayName("카드 id와 카드 이동 정보가 주어지면 카드 이동에 성공한다.")
		@Test
		void moveTest() {
			// given
			given(cardRepository.findById(anyLong())).willReturn(Optional.of(FixtureFactory.createCardData(2L, 1L)));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.of(2L));
			given(cardRepository.findIdByPrevId(5L, 2L)).willReturn(Optional.of(6L));
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.of("to-do"));

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 5L));

			// then
			assertAll(
				() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(2)).updateById(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(1))
					.updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong()),
				() -> then(categoryRepository).should(times(1)).findNameById(anyLong())
			);
		}

		@DisplayName("같은 위치로 카드를 옮길 때 성공한다.")
		@Test
		void givenSamePositionRequest_thenSuccess() {
			// given
			given(cardRepository.findById(anyLong())).willReturn(Optional.of(FixtureFactory.createCardData(2L, 0L)));

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(0L, 1L, 0L));

			// then
			assertAll(
				() -> then(cardRepository).should(never()).findIdByPrevId(anyLong(), anyLong()),
				() -> then(cardRepository).should(never()).updateById(anyLong(), anyLong()),
				() -> then(cardRepository).should(never())
					.updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong()),
				() -> then(categoryRepository).should(never()).findNameById(anyLong())
			);
		}

		@DisplayName("카테고리의 마지막 카드를 옮기면 이동에 성공한다.")
		@Test
		void givenLastCardInCategory_thenSuccess() {
			// given
			given(cardRepository.findById(anyLong())).willReturn(Optional.of(FixtureFactory.createCardData(2L, 1L)));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.empty());
			given(cardRepository.findIdByPrevId(4L, 2L)).willReturn(Optional.of(6L));
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.of("to-do"));

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 4L));

			// then
			assertAll(
				() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(1))
					.updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong()),
				() -> then(categoryRepository).should(times(1)).findNameById(anyLong())
			);
		}

		@DisplayName("가고자 하는 카테고리에 아무것도 없어도 이동에 성공한다.")
		@Test
		void givenNothingExistsToCategoryId_thenSuccess() {
			// given
			given(cardRepository.findById(anyLong())).willReturn(Optional.of(FixtureFactory.createCardData(2L, 1L)));
			given(cardRepository.findIdByPrevId(1L, 1L)).willReturn(Optional.of(2L));
			given(cardRepository.findIdByPrevId(4L, 2L)).willReturn(Optional.empty());
			willDoNothing().given(cardRepository).updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong());
			given(categoryRepository.findNameById(anyLong())).willReturn(Optional.of("to-do"));

			// when
			cardService.move(1L, FixtureFactory.createCardMoveRequest(1L, 2L, 4L));

			// then
			assertAll(
				() -> then(cardRepository).should(times(2)).findIdByPrevId(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(1)).updateById(anyLong(), anyLong()),
				() -> then(cardRepository).should(times(1))
					.updateCategoryIdAndPrevCardIdById(anyLong(), anyLong(), anyLong()),
				() -> then(categoryRepository).should(times(1)).findNameById(anyLong())
			);
		}
	}
}
