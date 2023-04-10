package it.epicode.giulia_franzosi.Capstone_Project;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import it.epicode.giulia_franzosi.Capstone_Project.entities.TypeRole;
import it.epicode.giulia_franzosi.Capstone_Project.entities.UserRole;
import it.epicode.giulia_franzosi.Capstone_Project.services.RoleService;


@SpringBootApplication
public class CapstoneProjectApplication  implements CommandLineRunner{

	@Autowired
	RoleService rs;
	
	public static void main(String[] args) {
		SpringApplication.run(CapstoneProjectApplication.class, args);	
	}

	@Override
	public void run(String... args) throws Exception {
		
		/*UserRole roleAdmin = new UserRole();
		roleAdmin.setName(TypeRole.ROLE_ADMIN);
		rs.addRole(roleAdmin);
		
		UserRole roleUser = new UserRole();
		roleUser.setName(TypeRole.ROLE_USER);
		rs.addRole(roleUser);*/
	}
}
