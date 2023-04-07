package it.epicode.giulia_franzosi.Capstone_Project.security;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class LoginResponse {
	private String token;
	private final String type = "Bearer";
	private int id;
	private String username;
	private String email;
	private List<String> roles;

}
