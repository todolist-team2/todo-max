package kr.codesquad.todo.dto.response;

import kr.codesquad.todo.domain.Action;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ActionResponse {

	private String nickname;
	private String imageUrl;
	private String actionName;
	private String cardName;
	private String originCategoryName;
	private String targetCategoryName;
	private LocalDateTime createdAt;

	public ActionResponse(String nickname, String imageUrl, Action action) {
		this.nickname = nickname;
		this.imageUrl = imageUrl;
		this.actionName = action.getActionName();
		this.cardName = action.getCardName();
		this.originCategoryName = action.getOriginCategoryName();
		this.targetCategoryName = action.getTargetCategoryName();
		this.createdAt = action.getCreatedAt();
	}

	public String getNickname() {
		return nickname;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public String getActionName() {
		return actionName;
	}

	public String getCardName() {
		return cardName;
	}

	public String getOriginCategoryName() {
		return originCategoryName;
	}

	public String getTargetCategoryName() {
		return targetCategoryName;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public static Slice<ActionResponse> of(Slice<Action> actionList, String nickname, String imageUrl) {
		List<ActionResponse> actionResponseList = new ArrayList<>();

		actionList.getContent().forEach(action -> {
			actionResponseList.add(new ActionResponse(nickname, imageUrl, action));
		});

		return new Slice<>(actionResponseList, actionList.getHasNext());
	}
}
