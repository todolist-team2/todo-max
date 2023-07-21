package kr.codesquad.todo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration(proxyBeanMethods = false)
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/api/**")
			.allowedMethods("GET", "OPTIONS", "POST", "PUT", "PATCH", "DELETE")
			.allowedOrigins("http://localhost:3000", "http://43.202.106.146:3000");
	}
}
