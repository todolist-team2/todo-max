package kr.codesquad.todo.dto.request;

public class CardMoveRequest {

	private Long fromPrevCardId;
	private Long toCategoryId;
	private Long toPrevCardId;

	public CardMoveRequest() {
	}

	public CardMoveRequest(Long fromPrevCardId, Long toCategoryId, Long toPrevCardId) {
		this.fromPrevCardId = fromPrevCardId;
		this.toCategoryId = toCategoryId;
		this.toPrevCardId = toPrevCardId;
	}

	public Long getFromPrevCardId() {
		return fromPrevCardId;
	}

	public Long getToCategoryId() {
		return toCategoryId;
	}

	public Long getToPrevCardId() {
		return toPrevCardId;
	}
}
