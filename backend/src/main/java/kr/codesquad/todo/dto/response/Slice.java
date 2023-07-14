package kr.codesquad.todo.dto.response;

import java.util.List;

public class Slice<T> {

	private List<T> content;
	private boolean hasNextPage;

	public Slice(List<T> content, boolean hasNextPage) {
		this.content = content;
		this.hasNextPage = hasNextPage;
	}

	public List<T> getContent() {
		return content;
	}

	public boolean getHasNext() {
		return hasNextPage;
	}
}
