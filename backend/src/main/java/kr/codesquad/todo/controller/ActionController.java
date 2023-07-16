package kr.codesquad.todo.controller;

import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.dto.response.Slice;
import kr.codesquad.todo.service.ActionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class ActionController {

	private final ActionService actionService;

	public ActionController(ActionService actionService) {
		this.actionService = actionService;
	}

	// 활동기록(히스토리) 목록 조회
	// 무한 스크롤을 위해서 슬라이스로 반환
	@GetMapping("/actions")
	public ResponseEntity<Slice<ActionResponse>> getActions(@RequestParam(defaultValue = "0") int page,
	                                                        @RequestParam(defaultValue = "20") int size) {
		return ResponseEntity.ok(actionService.getActions(page, size));
	}

	// 활동기록(히스토리) 전체 삭제
	@DeleteMapping("/actions")
	public ResponseEntity<Void> deleteActions() {
		actionService.deleteActions();
		return ResponseEntity.noContent().build();
	}
}
