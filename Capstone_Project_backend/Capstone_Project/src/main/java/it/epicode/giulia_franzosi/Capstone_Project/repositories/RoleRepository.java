package it.epicode.giulia_franzosi.Capstone_Project.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import it.epicode.giulia_franzosi.Capstone_Project.entities.TypeRole;
import it.epicode.giulia_franzosi.Capstone_Project.entities.UserRole;

@Repository
public interface RoleRepository extends JpaRepository<UserRole, Integer> {
	
	Optional<UserRole>findByName(TypeRole name);

}