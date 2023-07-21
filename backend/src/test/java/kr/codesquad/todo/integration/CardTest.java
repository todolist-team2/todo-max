package kr.codesquad.todo.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.codesquad.todo.acceptance.DatabaseInitializer;
import kr.codesquad.todo.service.CardService;

@AutoConfigureMockMvc
@SpringBootTest
public class CardTest {

	@Autowired
	MockMvc mockMvc;

	@Autowired
	ObjectMapper objectMapper;

	@Autowired
	CardService cardService;

	@Autowired
	DatabaseInitializer databaseInitializer;

	@BeforeEach
	void setUp() {
		databaseInitializer.truncateTables();
		databaseInitializer.initTables();
	}

	@DisplayName("카드를 삭제한다.")
	@Test
	void deleteCard() throws Exception {
		// given

		// when&then
		mockMvc.perform(delete("/api/cards/" + 1))
			.andExpect(status().isNoContent())
			.andDo(print());
	}
}
