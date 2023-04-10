package it.epicode.giulia_franzosi.Capstone_Project.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import it.epicode.giulia_franzosi.Capstone_Project.entities.TypeRole;
import it.epicode.giulia_franzosi.Capstone_Project.entities.User;
import it.epicode.giulia_franzosi.Capstone_Project.entities.UserRole;
import it.epicode.giulia_franzosi.Capstone_Project.repositories.RoleRepository;
import it.epicode.giulia_franzosi.Capstone_Project.repositories.UserRepository;
import it.epicode.giulia_franzosi.Capstone_Project.security.JwtUtils;
import it.epicode.giulia_franzosi.Capstone_Project.security.LoginRequest;
import it.epicode.giulia_franzosi.Capstone_Project.security.LoginResponse;
import it.epicode.giulia_franzosi.Capstone_Project.security.MessageResponse;
import it.epicode.giulia_franzosi.Capstone_Project.security.RegisterRequest;
import it.epicode.giulia_franzosi.Capstone_Project.security.UserDetailsImpl;
import it.epicode.giulia_franzosi.Capstone_Project.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	UserRepository userRepository;

	@Autowired
	JwtUtils jwtUtils;

	// -------------------------LOGIN

	@PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		authentication.getAuthorities();
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new LoginResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	// -------------------------REGISTER

	@PostMapping("/register")
	@CrossOrigin("http://localhost:4200")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Errore: Username e/o email già utilizzato!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Errore: Email già  utilizzata!"));
		}
		signUpRequest.setActive(true);
		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()), signUpRequest.getNome(), signUpRequest.getCognome(),
				signUpRequest.getActive());

		Set<String> strRoles = signUpRequest.getRole();
		Set<UserRole> roles = new HashSet<>();

		if (strRoles == null) {
			UserRole userRole = roleRepository.findByName(TypeRole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					UserRole adminRole = roleRepository.findByName(TypeRole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;

				default:
					UserRole userRole = roleRepository.findByName(TypeRole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/logout")
	public ResponseEntity<?> signOut(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		return ResponseEntity.ok(new MessageResponse("Successfully signed out"));
	}

}