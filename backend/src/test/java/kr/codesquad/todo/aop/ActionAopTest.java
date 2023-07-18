package kr.codesquad.todo.aop;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import kr.codesquad.todo.acceptance.DatabaseAccessor;
import kr.codesquad.todo.acceptance.DatabaseInitializer;
import kr.codesquad.todo.domain.ActionType;
import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.fixture.FixtureFactory;
import kr.codesquad.todo.service.ActionService;
import kr.codesquad.todo.service.CardService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
class ActionAopTest {

	@Autowired
	DatabaseInitializer databaseInitializer;
	@Autowired
	DatabaseAccessor databaseAccessor;
	@Autowired
	private CardService cardService;
	@Autowired
	private ActionService actionService;

	@BeforeEach
	void setUp() {
		databaseInitializer.truncateTables();
		databaseInitializer.initTables();
	}

	@DisplayName("통합테스트")
	@Test
	void AopTest() {
		// given
		Long userId = 1L;
		Long categoryId = 1L;
		Long cardId = 1L;
		Long fromPrevId = 0L;
		Long toCategoryId = 1L;
		Long toPrevId = 3L;

		// when
		cardService.register(categoryId, FixtureFactory.createCardCreationRequest());
		cardService.update(cardId, FixtureFactory.updateCardCreationRequest());
		cardService.move(cardId, FixtureFactory.createCardMoveRequest(fromPrevId, toCategoryId, toPrevId));
		cardService.delete(cardId);
		List<ActionResponse> actions = actionService.retrieveAll(userId);

		// then
		assertAll(
			() -> assertThat(actions.size()).isEqualTo(4),
			() -> assertThat(actions.get(0).getActionName()).isEqualTo(ActionType.REGISTER.getDescription()),
			() -> assertThat(actions.get(1).getActionName()).isEqualTo(ActionType.MODIFY.getDescription()),
			() -> assertThat(actions.get(2).getActionName()).isEqualTo(ActionType.MOVE.getDescription()),
			() -> assertThat(actions.get(3).getActionName()).isEqualTo(ActionType.DELETE.getDescription())
		);
	}

	@DisplayName("카드 등록 후 액션 저장에 성공한다.")
	@Test
	void registerAopTest() {
		// given
		Long userId = 1L;
		Long categoryId = 1L;

		// when
		cardService.register(categoryId, FixtureFactory.createCardCreationRequest());
		cardService.register(categoryId, FixtureFactory.createCardCreationRequest());
		List<ActionResponse> actions = actionService.retrieveAll(userId);

		// then
		assertAll(
			() -> assertThat(actions.size()).isEqualTo(2),
			() -> assertThat(actions.get(0).getActionName()).isEqualTo(ActionType.REGISTER.getDescription())
		);
	}

	@DisplayName("카드 수정 후 액션 저장에 성공한다.")
	@Test
	void updateAopTest() {
		// given
		Long userId = 1L;
		Long cardId = 1L;

		// when
		cardService.update(cardId, FixtureFactory.updateCardCreationRequest());
		List<ActionResponse> actions = actionService.retrieveAll(userId);

		// then
		assertAll(
			() -> assertThat(actions.size()).isEqualTo(1),
			() -> assertThat(actions.get(0).getActionName()).isEqualTo(ActionType.MODIFY.getDescription())
		);
	}

	@DisplayName("카드 이동 후 액션 저장에 성공한다.")
	@Test
	void moveAopTest() {
		// given
		Long userId = 1L;
		Long cardId = 1L;
		Long fromPrevId = 0L;
		Long toCategoryId = 1L;
		Long toPrevId = 3L;

		// when
		cardService.move(cardId, FixtureFactory.createCardMoveRequest(fromPrevId, toCategoryId, toPrevId));
		List<ActionResponse> actions = actionService.retrieveAll(userId);

		// then
		assertAll(
			() -> assertThat(actions.size()).isEqualTo(1),
			() -> assertThat(actions.get(0).getActionName()).isEqualTo(ActionType.MOVE.getDescription())
		);
	}

	@DisplayName("카드 삭제 후 액션 저장에 성공한다.")
	@Test
	void deleteAopTest() {
		// given
		Long userId = 1L;
		Long cardId = 1L;

		// when
		cardService.delete(cardId);
		List<ActionResponse> actions = actionService.retrieveAll(userId);

		// then
		assertAll(
			() -> assertThat(actions.size()).isEqualTo(1),
			() -> assertThat(actions.get(0).getActionName()).isEqualTo(ActionType.DELETE.getDescription())
		);
	}
}
