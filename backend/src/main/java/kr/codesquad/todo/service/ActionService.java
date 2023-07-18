package kr.codesquad.todo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.dto.response.CardDataForActionResponse;
import kr.codesquad.todo.dto.response.Slice;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.repository.ActionRepository;
import kr.codesquad.todo.repository.CardRepository;
import kr.codesquad.todo.repository.CategoryRepository;

@Service
public class ActionService {

	private final ActionRepository actionRepository;
	private final CardRepository cardRepository;
	private final CategoryRepository categoryRepository;

	public ActionService(ActionRepository actionRepository, CardRepository cardRepository,
		CategoryRepository categoryRepository) {
		this.actionRepository = actionRepository;
		this.cardRepository = cardRepository;
		this.categoryRepository = categoryRepository;
	}

	// 활동기록(히스토리) 목록 조회
	public Slice<ActionResponse> getActions(int page, int size) {
		// 로그인한 유저 정보 (임시)
		String nickname = "멋진삼";
		String imageUrl = "https://이미지어쩌구";

		Slice<Action> actionList = actionRepository.findAll(page, size);

		// 나중에 활동기록 마다 유저 정보가 다를 수 있다면
		// Action 의 userId 를 통해 유저 정보를 가져와서 ActionResponse 에 넣어주는 작업이 필요하다.
		return ActionResponse.of(actionList, nickname, imageUrl);
	}

	// 활동기록(히스토리) 전체 삭제
	public void deleteActions() {
		// 나중에 활동기록 마다 유저 정보가 다를 수 있다면
		// 로그인된 유저 정보를 이용해서 본인의 활동기록만 삭제할 수 있도록 해야한다.

		actionRepository.deleteAll();
	}

	@Transactional
	public void create(Long id, String actionName, Long originCategoryId) {
		CardDataForActionResponse cardDataForActionResponse = cardRepository.findCardDataById(id)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		String originCategoryName = null;
		if (originCategoryId != null) {
			originCategoryName = categoryRepository.findNameById(originCategoryId)
				.orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));
		}
		Action action = new Action(null, actionName, cardDataForActionResponse.getCardName(), originCategoryName,
			cardDataForActionResponse.getTargetCategoryName(), LocalDateTime.now(),
			cardDataForActionResponse.getUserId());
		actionRepository.save(action);
	}

	@Transactional(readOnly = true)
	public List<ActionResponse> retrieveAll(Long userId) {
		return actionRepository.retrieveAll(userId);
	}
}
