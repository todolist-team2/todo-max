package kr.codesquad.todo.controller;


import kr.codesquad.todo.dto.request.CategoryRequestDto;
import kr.codesquad.todo.dto.response.CategoryResponseDto;
import kr.codesquad.todo.service.CategoryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CategoryController {

	private final CategoryService categoryService;


	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}


	@PostMapping("/category")
	public Long createCategory(@RequestBody CategoryRequestDto categoryRequestDto) {
		return categoryService.createCategory(categoryRequestDto);
	}
}
