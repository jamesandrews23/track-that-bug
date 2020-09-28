package com.trackthatbug.trackthatbug;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@SpringBootTest
@AutoConfigureMockMvc
class TrackthatbugApplicationTests {
	@Autowired
	private MockMvc mockMvc;

	@Test
	void contextLoads() {
	}

	@Test
	public void testRegisterUser() throws Exception {
//		mockMvc.perform(post("/registerUser")
//				.contentType(MediaType.APPLICATION_JSON_VALUE)
//				.content("{\"firstName\":\"John\",\"lastName\":\"Doe\",\"username\":\"jamesandrews\"}")
//				.accept(MediaType.APPLICATION_JSON_VALUE))
//				.andExpect(status().isOk())
//				.andExpect(content().string(""));
	}

	@Test
	public void testCreateIssue() throws Exception {
//		mockMvc.perform(post("/createIssue")
//			.contentType(MediaType.APPLICATION_JSON_VALUE)
//			.content("{\"user\":\"jamesandrews23\",\"assignedTo\":\"Doe\",\"createdOn\":\"12341234\",\"createdBy\":\"james\",\"description\":\"this is it\",\"title\":\"this is the title\"}")
//			.accept(MediaType.APPLICATION_JSON_VALUE))
//			.andExpect(status().isOk())
//			.andExpect(content().string(""));
	}

}
