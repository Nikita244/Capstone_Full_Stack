package it.epicode.giulia_franzosi.Capstone_Project.controllers;

import java.util.HashSet;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import it.epicode.giulia_franzosi.Capstone_Project.entities.TypeRole;
import it.epicode.giulia_franzosi.Capstone_Project.entities.User;
import it.epicode.giulia_franzosi.Capstone_Project.entities.UserRole;
import it.epicode.giulia_franzosi.Capstone_Project.security.MessageResponse;
import it.epicode.giulia_franzosi.Capstone_Project.services.RoleService;
import it.epicode.giulia_franzosi.Capstone_Project.services.UserService;

@RestController
@RequestMapping("/app")
public class PageController {

	@Autowired
	UserService us;

	@Autowired
	RoleService rs;

	@Autowired
	PasswordEncoder encoder;


	@GetMapping("/")
	public String home() {
		return "Pagina home!";
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	@GetMapping("/logged")
	public String logged() {
		return "Sei loggato";
	}

	@CrossOrigin
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/role")
	public String role() {
		return "Vedi perche sei admin";
	}

}
