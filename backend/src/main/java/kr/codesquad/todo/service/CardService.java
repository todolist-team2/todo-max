package kr.codesquad.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.aop.ActionLogging;
import kr.codesquad.todo.domain.ActionType;
import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.dto.response.CardData;
import kr.codesquad.todo.dto.response.CardsResponse;
import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;
import kr.codesquad.todo.repository.CardRepository;

@Service
public class CardService {

	private final CardRepository cardRepository;

	public CardService(CardRepository cardRepository) {
		this.cardRepository = cardRepository;
	}

	@ActionLogging(ActionType.REGISTER)
	@Transactional
	public Long register(Long categoryId, CardCreationRequest cardCreationRequest) {
		Long headId = cardRepository.findHeadIdByCategoryId(categoryId).orElse(0L);
		Long id = cardRepository.save(cardCreationRequest.toEntity(categoryId));
		if (headId != 0L) {
			cardRepository.updateById(headId, id);
		}
		return id;
	}

	@ActionLogging(ActionType.DELETE)
	@Transactional
	public Long delete(Long cardId) {
		CardData card = cardRepository.findById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));

		cardRepository.findIdByPrevId(cardId, card.getCategoryResponse().getCategoryId())
			.ifPresent(nextId -> cardRepository.updateById(nextId, card.getPrevCardId()));
		cardRepository.deleteById(cardId);
		return cardId;
	}

	@ActionLogging(ActionType.MOVE)
	@Transactional
	public Long move(Long cardId, CardMoveRequest cardMoveRequest) {
		CardData card = cardRepository.findById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		if (cardMoveRequest.isSamePosition(card.getCategoryResponse().getCategoryId())) {
			return null;
		}
		updateNextCard(cardId, card.getCategoryResponse().getCategoryId(), cardMoveRequest.getFromPrevCardId());
		updateNextCard(cardMoveRequest.getToPrevCardId(), cardMoveRequest.getToCategoryId(), cardId);

		cardRepository.updateCategoryIdAndPrevCardIdById(cardId, cardMoveRequest.getToCategoryId(),
			cardMoveRequest.getToPrevCardId());
		return cardId;
	}

	private void updateNextCard(Long cardId, Long categoryId, Long changedCardId) {
		cardRepository.findIdByPrevId(cardId, categoryId)
			.ifPresent(nextCardId -> cardRepository.updateById(nextCardId, changedCardId));
	}

	@ActionLogging(ActionType.MODIFY)
	@Transactional
	public Long update(Long cardId, CardCreationRequest cardCreationRequest) {
		cardRepository.update(cardId, cardCreationRequest.getTitle(), cardCreationRequest.getContent());
		return cardId;
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
