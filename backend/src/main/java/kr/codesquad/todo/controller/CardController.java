package kr.codesquad.todo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.service.CardService;

@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
@RestController
public class CardController {

	private final CardService cardService;

	public CardController(CardService cardService) {
		this.cardService = cardService;
	}

	@PostMapping(path = "/api/cards")
	public ResponseEntity<Map<String, Long>> register(
		@RequestParam Long categoryId,
		@RequestBody CardCreationRequest cardCreationRequest) {
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(Map.of("categoryId", cardService.register(categoryId, cardCreationRequest)));
	}
}
