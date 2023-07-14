package kr.codesquad.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	private final CardRepository cardRepository;
	private final CategoryRepository categoryRepository;

	public CardService(CardRepository cardRepository, CategoryRepository categoryRepository) {
		this.cardRepository = cardRepository;
		this.categoryRepository = categoryRepository;
	}

	@Transactional
	public Long register(Long categoryId, CardCreationRequest cardCreationRequest) {
		if (!categoryRepository.existById(categoryId)) {
			throw new BusinessException(ErrorCode.CATEGORY_NOT_FOUND);
		}
		Long headId = cardRepository.findHeadIdByCategoryId(categoryId).orElse(0L);
		Long id = cardRepository.save(cardCreationRequest.toEntity(categoryId));
		if (headId != 0L) {
			cardRepository.updateById(headId, id);
		}
		return id;
	}

	@Transactional
	public void delete(Long cardId) {
		Long prevId = cardRepository.findPrevIdById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		Long categoryId = cardRepository.findCategoryIdById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		Long nextId = cardRepository.findIdByPrevId(cardId, categoryId).orElse(-1L);
		cardRepository.deleteById(cardId);
		if (nextId != -1L) {
			cardRepository.updateById(nextId, prevId);
		}
	}

	@Transactional
	public void move(Long cardId, CardMoveRequest cardMoveRequest) {
		Long categoryId = cardRepository.findCategoryIdById(cardId)
			.orElseThrow(() -> new BusinessException(ErrorCode.CARD_NOT_FOUND));
		if (cardMoveRequest.isSamePosition(categoryId)) {
			return;
		}
		cardRepository.findIdByPrevId(cardId, categoryId)
			.ifPresent(
				originNextCardId -> cardRepository.updateById(originNextCardId, cardMoveRequest.getFromPrevCardId()));

		cardRepository.findIdByPrevId(cardMoveRequest.getToPrevCardId(), cardMoveRequest.getToCategoryId())
			.ifPresent(targetNextCardId -> cardRepository.updateById(targetNextCardId, cardId));
		cardRepository.updateCategoryIdAndPrevCardIdById(cardId, cardMoveRequest.getToCategoryId(),
			cardMoveRequest.getToPrevCardId());
  }

  @Transactional
	public void update(Long cardId, CardCreationRequest cardCreationRequest) {
		cardRepository.update(cardId, cardCreationRequest.getTitle(), cardCreationRequest.getContent());
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
