package kr.codesquad.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.domain.ActionType;
import kr.codesquad.todo.dto.ActionData;
import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.dto.response.CardData;
import kr.codesquad.todo.dto.response.CardsResponse;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.repository.CardRepository;
import kr.codesquad.todo.repository.CategoryRepository;

@Service
public class CardService {

	private final ActionService actionService;
	private final CardRepository cardRepository;
	private final CategoryRepository categoryRepository;

	public CardService(ActionService actionService, CardRepository cardRepository,
		CategoryRepository categoryRepository) {
		this.actionService = actionService;
		this.cardRepository = cardRepository;
		this.categoryRepository = categoryRepository;
	}

	@Transactional
	public Long register(Long categoryId, CardCreationRequest cardCreationRequest) {
		String categoryName = categoryRepository.findNameById(categoryId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

		Long headId = cardRepository.findHeadIdByCategoryId(categoryId).orElse(0L);
		Long id = cardRepository.save(cardCreationRequest.toEntity(categoryId));
		if (headId != 0L) {
			cardRepository.updateById(headId, id);
		}

		registerAction(ActionType.REGISTER, new ActionData(cardCreationRequest.getTitle(), categoryName, null));
		return id;
	}

	@Transactional
	public void delete(Long cardId) {
		CardData card = cardRepository.findById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));

		cardRepository.findIdByPrevId(cardId, card.getCategoryResponse().getCategoryId())
			.ifPresent(nextId -> cardRepository.updateById(nextId, card.getPrevCardId()));
		cardRepository.deleteById(cardId);

		registerAction(ActionType.DELETE, new ActionData(card.getTitle()));
	}

	@Transactional
	public void move(Long cardId, CardMoveRequest cardMoveRequest) {
		CardData card = cardRepository.findById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		if (cardMoveRequest.isSamePosition(card.getCategoryResponse().getCategoryId())) {
			return;
		}
		updateNextCard(cardId, card.getCategoryResponse().getCategoryId(), cardMoveRequest.getFromPrevCardId());
		updateNextCard(cardMoveRequest.getToPrevCardId(), cardMoveRequest.getToCategoryId(), cardId);

		cardRepository.updateCategoryIdAndPrevCardIdById(cardId, cardMoveRequest.getToCategoryId(),
			cardMoveRequest.getToPrevCardId());

		String targetCategoryName = categoryRepository.findNameById(cardMoveRequest.getToCategoryId())
			.orElseThrow(() -> new BusinessException(ErrorCode.CATEGORY_NOT_FOUND));

		registerAction(ActionType.MOVE,
			new ActionData(card.getTitle(), card.getCategoryResponse().getCategoryName(), targetCategoryName));
	}

	private void updateNextCard(Long cardId, Long categoryId, Long changedCardId) {
		cardRepository.findIdByPrevId(cardId, categoryId)
			.ifPresent(nextCardId -> cardRepository.updateById(nextCardId, changedCardId));
	}

	@Transactional
	public void update(Long cardId, CardCreationRequest cardCreationRequest) {
		cardRepository.update(cardId, cardCreationRequest.getTitle(), cardCreationRequest.getContent());
		registerAction(ActionType.MODIFY, new ActionData(cardCreationRequest.getTitle()));
	}

	private void registerAction(ActionType actionType, ActionData actionData) {
		actionService.register(actionType, actionData);
	}

	@Transactional(readOnly = true)
	public CardData getById(Long cardId) {
		return cardRepository.findById(cardId).orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
	}

	@Transactional(readOnly = true)
	public List<CardsResponse> retrieveAll() {
		List<CardData> cardData = cardRepository.findAll();
		return CardsResponse.listFrom(cardData);
	}

	@Transactional(readOnly = true)
	public CardsResponse retrieveOne(Long categoryId) {
		List<CardData> cardData = cardRepository.findByCategoryId(categoryId);
		return CardsResponse.singleFrom(cardData);
	}
}
