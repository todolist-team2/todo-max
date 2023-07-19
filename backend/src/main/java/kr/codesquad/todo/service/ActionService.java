package kr.codesquad.todo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.domain.ActionType;
import kr.codesquad.todo.dto.response.ActionData;
import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.dto.response.Slice;
import kr.codesquad.todo.repository.ActionRepository;
import org.springframework.util.ObjectUtils;

@Service
public class ActionService {

	private final ActionRepository actionRepository;

	public ActionService(ActionRepository actionRepository) {
		this.actionRepository = actionRepository;
	}

	@Transactional
	public void register(ActionType actionType, ActionData actionData) {
		actionRepository.save(actionData.toEntity(actionType));
	}

	// 활동기록(히스토리) 목록 조회
	@Transactional(readOnly = true)
	public Object getActions(String cursor, String size) {
		// 로그인한 유저 정보는 find 로 가져왔다고 가정
		String nickname = "bruni";
		String imageUrl = "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg";

		if (cursor == null && size == null) {
			return ActionResponse.toResponse(actionRepository.findAll(), nickname, imageUrl);
		} else if (ObjectUtils.isEmpty(cursor)) {
			cursor = Long.MAX_VALUE + "";
		} else if (ObjectUtils.isEmpty(size)) {
			size = "20";
		}
		Slice<Action> actionList = actionRepository.findSliceByCursor(cursor, Integer.parseInt(size));
		return ActionResponse.toResponse(actionList, nickname, imageUrl);
	}

	// 활동기록(히스토리) 전체 삭제
	@Transactional
	public void deleteActions() {
		// 나중에 활동기록 마다 유저 정보가 다를 수 있다면
		// 로그인된 유저 정보를 이용해서 본인의 활동기록만 삭제할 수 있도록 해야한다.
		actionRepository.deleteAll();
	}
}
