package it.epicode.giulia_franzosi.Capstone_Project.security;

import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {

	@NotBlank
	private String username;

	@NotBlank
	private String password;

}
