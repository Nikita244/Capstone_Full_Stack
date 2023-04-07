package it.epicode.giulia_franzosi.Capstone_Project.security;

import java.util.Set;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

	@NotBlank
	private String nome;

	@NotBlank
	private String cognome;

	@NotBlank
	private String email;

	@NotBlank
	private String username;

	@NotBlank
	private String password;

	private Boolean active;

	private Set<String> role;

}
