package kr.codesquad.todo.dto.response;

import java.time.LocalDateTime;

import kr.codesquad.todo.domain.Action;
import kr.codesquad.todo.domain.ActionType;

public class ActionData {

	private final String nickname;
	private final String imageUrl;
	private final String cardTitle;
	private final String originCategoryName;
	private final String targetCategoryName;

	public ActionData(String cardTitle, String originCategoryName, String targetCategoryName) {
		// 임시 유저 정보 -> 나중에 데이터 받는 부분 옮겨야 할 듯
		this.nickname = "bruni";
		this.imageUrl = "https://github-production-user-asset-6210df.s3.amazonaws.com/48724199/254183695-5d025f0a-e616-494d-8ec0-287a279d800f.jpg";
		this.cardTitle = cardTitle;
		this.originCategoryName = originCategoryName;
		this.targetCategoryName = targetCategoryName;
	}

	public ActionData(String cardTitle) {
		this(cardTitle, null, null);
	}

	public String getNickname() {
		return nickname;
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

	public Action toEntity(ActionType actionType) {
		return new Action(
			null,
			actionType.getDescription(),
			cardTitle,
			originCategoryName,
			targetCategoryName,
			LocalDateTime.now(),
				1L
		);
	}
}
