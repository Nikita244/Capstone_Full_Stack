package it.epicode.giulia_franzosi.Capstone_Project.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import it.epicode.giulia_franzosi.Capstone_Project.entities.Cards;
import it.epicode.giulia_franzosi.Capstone_Project.repositories.CardsRepository;

@Service
public class CardsService {

	@Autowired
	CardsRepository cs;

	public Optional<Cards> getById(int id) {
		return cs.findById(id);
	}

	public List<Cards> getAll() {
		return cs.findAll();
	}

	public void addCard(Cards c) {
		cs.save(c);
	}

	public void deleteCard(Cards c) {
		cs.delete(c);
	}

	public void save(Cards c) {
		cs.save(c);
	}

	public Page<Cards> getAllCards(Pageable pageable) {
		return cs.findAll(pageable);
	}

}
