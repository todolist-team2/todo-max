package kr.codesquad.todo.infrastructure.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.config.jwt.JwtConfig;
import kr.codesquad.todo.infrastructure.filter.AuthFailHandlerFilter;
import kr.codesquad.todo.infrastructure.filter.JwtFilter;
import kr.codesquad.todo.infrastructure.hash.PasswordEncoder;
import kr.codesquad.todo.infrastructure.hash.SHA256;
import kr.codesquad.todo.infrastructure.jwt.JwtProvider;

@Import(JwtConfig.class)
@Configuration
public class SecurityConfig implements WebMvcConfigurer {

	private final JwtProvider jwtProvider;
	private final ObjectMapper objectMapper;

	public SecurityConfig(JwtProvider jwtProvider, ObjectMapper objectMapper) {
		this.jwtProvider = jwtProvider;
		this.objectMapper = objectMapper;
	}

	@Bean
	public FilterRegistrationBean<JwtFilter> jwtFilter() {
		FilterRegistrationBean<JwtFilter> jwtFilterBean = new FilterRegistrationBean<>();
		jwtFilterBean.setFilter(new JwtFilter(jwtProvider));
		jwtFilterBean.addUrlPatterns("/api/cards/*", "/api/actions/*", "/api/category/*");
		jwtFilterBean.setOrder(2);
		return jwtFilterBean;
	}

	@Bean
	public FilterRegistrationBean<AuthFailHandlerFilter> AuthFailHandlerFilter() {
		FilterRegistrationBean<AuthFailHandlerFilter> authFailHandlerFilterBean = new FilterRegistrationBean<>();
		authFailHandlerFilterBean.setFilter(new AuthFailHandlerFilter(objectMapper));
		authFailHandlerFilterBean.setOrder(1);
		return authFailHandlerFilterBean;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new SHA256();
	}
}
