package kr.codesquad.todo.infrastructure.hash;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import kr.codesquad.todo.exeption.BusinessException;
import kr.codesquad.todo.exeption.ErrorCode;

public class SHA256 implements PasswordEncoder {

	@Override
	public String encrypt(final String text) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(text.getBytes());
			return bytesToHex(md.digest());
		} catch (NoSuchAlgorithmException e) {
			throw new BusinessException(ErrorCode.ENCODE_FAIL);
		}
	}

	private String bytesToHex(byte[] bytes) {
		StringBuilder hexBuilder = new StringBuilder();
		for (byte b : bytes) {
			hexBuilder.append(String.format("%02x", b));
		}
		return hexBuilder.toString();
	}
}
