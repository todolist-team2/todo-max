package kr.codesquad.todo.dto.response;

import java.util.List;

public class Slice<T> {

	private List<T> content;
	private String currentCursor;
	private boolean hasNextPage;

	public Slice(List<T> content, String currentCursor, boolean hasNextPage) {
		this.content = content;
		this.currentCursor = currentCursor;
		this.hasNextPage = hasNextPage;
	}

	public List<T> getContent() {
		return content;
	}

	public String getCurrentCursor() {
		return currentCursor;
	}

	public boolean getHasNext() {
		return hasNextPage;
	}
}
