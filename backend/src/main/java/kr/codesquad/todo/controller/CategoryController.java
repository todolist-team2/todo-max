package kr.codesquad.todo.controller;


import kr.codesquad.todo.dto.request.CategoryRequest;
import kr.codesquad.todo.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	// 카테고리 추가
	@PostMapping("/category")
	public ResponseEntity<Long> createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryRequest));
	}

	// 카테고리 수정
	@PutMapping("/category/{categoryId}")
	public ResponseEntity<Void> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryRequest categoryRequest) {
		categoryService.updateCategory(categoryId, categoryRequest);
		return ResponseEntity.ok().build();
	}

	// 카테고리 삭제
	@DeleteMapping("/category/{categoryId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long categoryId) {
		categoryService.deleteCategory(categoryId);
		return ResponseEntity.noContent().build();
	}
}
