package kr.codesquad.todo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.dto.request.CardCreationRequest;
import kr.codesquad.todo.exeption.BusinessException;
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
			throw new BusinessException("categoryId가 존재하지 않습니다.");
		}
		Long headId = cardRepository.findHeadIdByCategoryId(categoryId).orElse(0L);
		Long id = cardRepository.save(cardCreationRequest.toEntity(categoryId));
		if (headId != 0L) {
			cardRepository.updateById(headId, id);
		}
		return id;
	}
}
