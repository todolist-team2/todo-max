package kr.codesquad.todo.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

public class CardsResponse {

	private final Long categoryId;
	private final String categoryName;
	private final List<CardData> cards;

	public CardsResponse(Long categoryId, String categoryName, List<CardData> cards) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.cards = cards;
	}

	public static List<CardsResponse> from(List<CardData> cardData) {
		Map<CategoryResponse, List<CardData>> groupingCardData = cardData.stream()
			.collect(Collectors.groupingBy(CardData::getCategoryResponse));
		return groupingCardData.entrySet().stream()
			.map(CardsResponse::from)
			.collect(Collectors.toList());
	}

	private static CardsResponse from(Map.Entry<CategoryResponse, List<CardData>> entry) {
		return new CardsResponse(entry.getKey().getCategoryId(), entry.getKey().getCategoryName(),
			sort(entry.getValue()));
	}

	private static List<CardData> sort(List<CardData> cardsData) {
		List<CardData> answer = new ArrayList<>();
		if (cardsData.size() == 1 && cardsData.get(0).getId() == 0L) {
			return answer;
		}
		Long prevId = 0L;
		for (int i = 0; i < cardsData.size(); i++) {
			for (CardData cardsDatum : cardsData) {
				if (Objects.equals(cardsDatum.getPrevCardId(), prevId)) {
					answer.add(cardsDatum);
					prevId = cardsDatum.getId();
					break;
				}
			}
		}
		return answer;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public List<CardData> getCards() {
		return cards;
	}
}
