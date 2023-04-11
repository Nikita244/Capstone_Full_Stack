package it.epicode.giulia_franzosi.Capstone_Project.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.epicode.giulia_franzosi.Capstone_Project.entities.UserRole;
import it.epicode.giulia_franzosi.Capstone_Project.repositories.RoleRepository;

@Service
public class RoleService {

	@Autowired
	RoleRepository repo;

	public void addRole(UserRole r) {
		repo.save(r);
	}

	public Optional<UserRole> getById(int id) {
		return repo.findById(id);
	}

}
