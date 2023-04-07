package it.epicode.giulia_franzosi.Capstone_Project.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.epicode.giulia_franzosi.Capstone_Project.entities.User;
import it.epicode.giulia_franzosi.Capstone_Project.repositories.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repo;

	public Optional<User> getById(int id) {
		return repo.findById(id);
	}

	public Iterable<User> getAll() {
		return repo.findAll();
	}

	public Optional<User> findByUsername(String nome) {
		return repo.findByUsername(nome);
	}

	public void addUser(User u) {
		repo.save(u);
	}

	public void deleteUser(User u) {
		repo.delete(u);
	}

	public void save(User u) {
		repo.save(u);
	}

}
