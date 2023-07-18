package kr.codesquad.todo.dto.response;

public class CardDataForActionResponse {

	private final String cardName;
	private final String targetCategoryName;
	private final Long userId;

	public CardDataForActionResponse(String cardName, String targetCategoryName, Long userId) {
		this.cardName = cardName;
		this.targetCategoryName = targetCategoryName;
		this.userId = userId;
	}

	public String getCardName() {
		return cardName;
	}

	public String getTargetCategoryName() {
		return targetCategoryName;
	}

	public Long getUserId() {
		return userId;
	}
}
