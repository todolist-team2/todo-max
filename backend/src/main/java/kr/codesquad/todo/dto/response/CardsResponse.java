package kr.codesquad.todo.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;

public class CardsResponse {

	private final Long categoryId;
	private final String categoryName;
	private final List<CardData> cards;

	public CardsResponse() {
		this.categoryId = null;
		this.categoryName = null;
		this.cards = null;
	}

	public CardsResponse(Long categoryId, String categoryName, List<CardData> cards) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.cards = cards;
	}

	public static List<CardsResponse> listFrom(List<CardData> cardData) {
		Map<CategoryResponse, List<CardData>> groupingCardData = cardData.stream()
			.collect(Collectors.groupingBy(CardData::getCategoryResponse));
		return groupingCardData.entrySet().stream()
			.map(CardsResponse::from)
			.collect(Collectors.toList());
	}

	public static CardsResponse singleFrom(List<CardData> cardData) {
		Map<CategoryResponse, List<CardData>> card = cardData.stream()
			.collect(Collectors.groupingBy(CardData::getCategoryResponse));
		return card.entrySet().stream()
			.map(CardsResponse::from)
			.findFirst()
			.orElse(new CardsResponse());
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

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public Long getCategoryId() {
		return categoryId;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public String getCategoryName() {
		return categoryName;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public List<CardData> getCards() {
		return cards;
	}
}
