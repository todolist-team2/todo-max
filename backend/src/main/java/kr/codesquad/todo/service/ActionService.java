package kr.codesquad.todo.service;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.dto.response.Slice;
import kr.codesquad.todo.repository.ActionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {

	private final ActionRepository actionRepository;

	public ActionService(ActionRepository actionRepository) {
		this.actionRepository = actionRepository;
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
}
