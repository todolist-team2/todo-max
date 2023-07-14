package kr.codesquad.todo.fixture;

import kr.codesquad.todo.dto.request.CardCreationRequest;

import kr.codesquad.todo.dto.request.CardMoveRequest;
import kr.codesquad.todo.dto.request.CategoryRequestDto;

public class FixtureFactory {

    public static CardCreationRequest createCardCreationRequest() {
        return new CardCreationRequest("Github 공부하기", "열심히 해야지~");
    }

    // TODO: 클래스명 통합 필요
    public static CategoryRequestDto createCategoryRequest() {
        return new CategoryRequestDto("1일 1커밋 도전!");
    }
  
    public static CardMoveRequest createCardMoveRequest(Long fromPrevId, Long toCategoryId, Long toPrevId) {
      return new CardMoveRequest(fromPrevId, toCategoryId, toPrevId);
    }
}
