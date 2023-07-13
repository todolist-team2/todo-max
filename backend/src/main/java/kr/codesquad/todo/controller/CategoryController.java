package kr.codesquad.todo.controller;


import kr.codesquad.todo.dto.request.CategoryRequestDto;
import kr.codesquad.todo.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;


	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}


	// 카테고리 추가
	@PostMapping("/category")
	public ResponseEntity<?> createCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.saveCategory(categoryRequestDto));
	}


	// 카테고리 수정
	@PutMapping("/category/{categoryId}")
	public ResponseEntity<?> updateCategory(@PathVariable Long categoryId, @RequestBody CategoryRequestDto categoryRequestDto) {
		return ResponseEntity.ok(categoryService.modifyCategory(categoryId, categoryRequestDto));
	}
}
