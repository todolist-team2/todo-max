package kr.codesquad.todo.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;

import kr.codesquad.todo.domain.Action;

public class ActionResponse {

	private String nickname;
	private String imageUrl;
	private String actionName;
	private String cardName;
	private String originCategoryName;
	private String targetCategoryName;
	private LocalDateTime createdAt;

	public ActionResponse(String nickname, String imageUrl, String actionName, String cardName,
		String originCategoryName,
		String targetCategoryName, LocalDateTime createdAt) {
		this.nickname = nickname;
		this.imageUrl = imageUrl;
		this.actionName = actionName;
		this.cardName = cardName;
		this.originCategoryName = originCategoryName;
		this.targetCategoryName = targetCategoryName;
		this.createdAt = createdAt;
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

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public String getOriginCategoryName() {
		return originCategoryName;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public String getTargetCategoryName() {
		return targetCategoryName;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public static List<ActionResponse> toResponse(List<Action> actionList, String nickname, String imageUrl) {
		return actionList.stream().map(
			action -> new ActionResponse(
				nickname,
				imageUrl,
				action.getActionName(),
				action.getCardName(),
				action.getOriginCategoryName(),
				action.getTargetCategoryName(),
				action.getCreatedAt())).collect(Collectors.toList());
	}
}
