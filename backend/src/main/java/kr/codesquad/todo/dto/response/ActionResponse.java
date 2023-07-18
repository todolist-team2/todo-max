package kr.codesquad.todo.dto.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

	public ActionResponse(String nickname, String actionName, String cardName, String originCategoryName,
		String targetCategoryName) {
		this.nickname = nickname;
		this.imageUrl = "";
		this.actionName = actionName;
		this.cardName = cardName;
		this.originCategoryName = originCategoryName;
		this.targetCategoryName = targetCategoryName;
		this.createdAt = LocalDateTime.now();
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

	public static Slice<ActionResponse> of(Slice<Action> actionList, String nickname, String imageUrl) {
		List<ActionResponse> actionResponseList = new ArrayList<>();

		actionList.getContent().forEach(action -> {
			actionResponseList.add(new ActionResponse(nickname,
				action.getActionName(),
				action.getCardName(),
				action.getOriginCategoryName(),
				action.getTargetCategoryName()));
		});

		return new Slice<>(actionResponseList, actionList.getHasNext());
	}

	public Action toEntity() {
		return new Action(null, actionName, cardName, originCategoryName, targetCategoryName, createdAt, 1L);
	}
}
