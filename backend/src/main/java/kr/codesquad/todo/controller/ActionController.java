package kr.codesquad.todo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.todo.dto.response.ActionResponse;
import kr.codesquad.todo.service.ActionService;

@RestController
@RequestMapping("/api")
public class ActionController {

	private final ActionService actionService;

	public ActionController(ActionService actionService) {
		this.actionService = actionService;
	}

	// 활동기록(히스토리) 목록 조회
	// 무한 스크롤을 위해서 슬라이스로 반환
	// 쿼리 파라미터 없으면 전체 리스트 반환
	@GetMapping("/actions")
	public ResponseEntity<List<ActionResponse>> getActions() {
		return ResponseEntity.ok(actionService.getActions());
	}

	// 활동기록(히스토리) 전체 삭제
	@DeleteMapping("/actions")
	public ResponseEntity<Void> deleteActions() {
		actionService.deleteActions();
		return ResponseEntity.noContent().build();
	}
}
