package kr.codesquad.todo.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.codesquad.todo.dto.request.JoinRequest;
import kr.codesquad.todo.dto.request.LoginRequest;
import kr.codesquad.todo.service.AuthService;

@RequestMapping("/api/auth")
@RestController
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/join")
	public ResponseEntity<Void> join(@RequestBody JoinRequest request) {
		authService.join(request);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody LoginRequest request) {
		return ResponseEntity.status(HttpStatus.OK)
			.header(HttpHeaders.AUTHORIZATION, authService.login(request))
			.build();
	}
}
