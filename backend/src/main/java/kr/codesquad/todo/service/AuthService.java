package kr.codesquad.todo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.codesquad.todo.domain.UserAccount;
import kr.codesquad.todo.dto.request.JoinRequest;
import kr.codesquad.todo.dto.request.LoginRequest;
import kr.codesquad.todo.infrastructure.hash.PasswordEncoder;
import kr.codesquad.todo.infrastructure.jwt.JwtProvider;
import kr.codesquad.todo.repository.UserAccountRepository;

@Service
public class AuthService {

	private final JwtProvider jwtProvider;
	private final PasswordEncoder passwordEncoder;
	private final UserAccountRepository userAccountRepository;

	public AuthService(JwtProvider jwtProvider, PasswordEncoder passwordEncoder,
		UserAccountRepository userAccountRepository) {
		this.jwtProvider = jwtProvider;
		this.passwordEncoder = passwordEncoder;
		this.userAccountRepository = userAccountRepository;
	}

	@Transactional
	public void join(JoinRequest request) {
		String encryptedPassword = passwordEncoder.encrypt(request.getPassword());

		UserAccount userAccount = new UserAccount(request.getLoginId(),
			encryptedPassword,
			request.getNickname(),
			"/image-url");
		userAccountRepository.save(userAccount);
	}

	@Transactional(readOnly = true)
	public String login(LoginRequest request) {
		UserAccount userAccount = userAccountRepository.findByLoginId(request.getLoginId())
			.orElseThrow();
		userAccount.validatePassword(passwordEncoder.encrypt(request.getPassword()));

		return jwtProvider.createToken(String.valueOf(userAccount.getId()));
	}
}
