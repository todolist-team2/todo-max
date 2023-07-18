package kr.codesquad.todo.dto;

import java.time.LocalDateTime;

import kr.codesquad.todo.domain.ActionType;
import kr.codesquad.todo.dto.response.ActionResponse;

public class ActionData {

	private final String nickname;
	private final String cardTitle;
	private final String originCategoryName;
	private final String targetCategoryName;

	public ActionData(String cardTitle, String originCategoryName, String targetCategoryName) {
		this.nickname = "bruni";
		this.cardTitle = cardTitle;
		this.originCategoryName = originCategoryName;
		this.targetCategoryName = targetCategoryName;
	}

	public String getNickname() {
		return nickname;
	}

	public ActionData(String cardTitle) {
		this(cardTitle, null, null);
	}

	public String getCardTitle() {
		return cardTitle;
	}

	public String getOriginCategoryName() {
		return originCategoryName;
	}

	public String getTargetCategoryName() {
		return targetCategoryName;
	}

	public ActionResponse toResponse(ActionType actionType) {
		return new ActionResponse(
			nickname,
			actionType.getDescription(),
			cardTitle,
			originCategoryName,
			targetCategoryName,
			LocalDateTime.now()
		);
	}
}
