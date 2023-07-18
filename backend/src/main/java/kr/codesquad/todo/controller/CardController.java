package kr.codesquad.todo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.dto.response.CardData;
import kr.codesquad.todo.dto.response.CardsResponse;
import kr.codesquad.todo.service.CardService;

@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/api/cards")
@RestController
public class CardController {

	private final CardService cardService;

	public CardController(CardService cardService) {
		this.cardService = cardService;
	}

	@PostMapping
	public ResponseEntity<Map<String, Long>> register(
		@RequestParam Long categoryId,
		@RequestBody CardCreationRequest cardCreationRequest) {
		return ResponseEntity.status(HttpStatus.CREATED)
			.body(Map.of("categoryId", cardService.register(categoryId, cardCreationRequest)));
	}

	@DeleteMapping("/{cardId}")
	public ResponseEntity<Void> delete(@PathVariable Long cardId) {
		cardService.delete(cardId);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	@PatchMapping("/{cardId}")
	public ResponseEntity<Void> move(
		@PathVariable Long cardId,
		@RequestBody CardMoveRequest cardMoveRequest) {
		cardService.move(cardId, cardMoveRequest);
		return ResponseEntity.ok().build();
	}

	@PutMapping("/{cardId}")
	public ResponseEntity<Void> update(@PathVariable Long cardId,
		@RequestBody CardCreationRequest cardCreationRequest) {
		cardService.update(cardId, cardCreationRequest);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/{cardId}")
	public ResponseEntity<CardData> getById(@PathVariable Long cardId) {
		CardData card = cardService.getById(cardId);
		return ResponseEntity.ok(card);
	}

	@GetMapping
	public ResponseEntity<List<CardsResponse>> retrieveAll() {
		return ResponseEntity.status(HttpStatus.OK)
			.body(cardService.retrieveAll());
	}

	@GetMapping(params = "categoryId")
	public ResponseEntity<CardsResponse> retrieveOne(@RequestParam Long categoryId) {
		return ResponseEntity.status(HttpStatus.OK)
			.body(cardService.retrieveOne(categoryId));
	}
}
