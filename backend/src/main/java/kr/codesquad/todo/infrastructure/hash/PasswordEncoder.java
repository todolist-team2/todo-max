package kr.codesquad.todo.infrastructure.hash;

public interface PasswordEncoder {

	String encrypt(String text);
}
