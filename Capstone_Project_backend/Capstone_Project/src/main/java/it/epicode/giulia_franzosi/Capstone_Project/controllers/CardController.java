package it.epicode.giulia_franzosi.Capstone_Project.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import it.epicode.giulia_franzosi.Capstone_Project.entities.Cards;
import it.epicode.giulia_franzosi.Capstone_Project.payload.CardsResponse;
import it.epicode.giulia_franzosi.Capstone_Project.services.CardsService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class CardController {

	@Autowired
	CardsService cs;

//---------------------------------GET CARDS BY ID
	@GetMapping("card/{id}")
	@CrossOrigin(origins = "https://webobook.com/")
	public ResponseEntity<Object> getById(@PathVariable Integer id) {
		Optional<Cards> dispObj = cs.getById(id);
		ResponseEntity<Object> check = checkExists(dispObj);
		if (check != null)
			return check;

		return new ResponseEntity<>(dispObj.get(), HttpStatus.OK);
	}

//---------------------------------POST CARD
	@PostMapping("/cards")
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Object> updateCards(@RequestBody CardsResponse CardList) {
		var cards = Cards.builder().immagine(CardList.getImmagine()).nome_comune(CardList.getNome_comune())
				.nome_scientifico(CardList.getNome_scientifico()).habitat(CardList.getHabitat())
				.descrizione(CardList.getDescrizione()).build();
		cs.save(cards);

		return ResponseEntity.ok("");
	}

//---------------------------------GET ALL CARDS PAGINATION
	// http://localhost:8080/cards_page?page=0&size=1
	@GetMapping("/cards_page")
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	@CrossOrigin(origins = "http://localhost:4200")
	public Page<Cards> getAllCards(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int size, Pageable pageable) {
		pageable = PageRequest.of(page, size, Sort.by("id").ascending());
		return cs.getAllCards(pageable);
	}

//---------------------------------PUT CARD BY ID
	@PostMapping("modify_card/{id}")
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Object> update(@PathVariable Integer id, @RequestBody Cards _card) {

		Optional<Cards> dispObj = cs.getById(id);

		ResponseEntity<Object> check = checkExists(dispObj);
		if (check != null)
			return check;

		Cards card = dispObj.get();
		card.setImmagine(_card.getImmagine());
		card.setNome_comune(_card.getNome_comune());
		card.setNome_scientifico(_card.getNome_scientifico());
		card.setHabitat(_card.getHabitat());
		card.setDescrizione(_card.getDescrizione());

		cs.save(card);

		return new ResponseEntity<>(card, HttpStatus.CREATED);
	}

//---------------------------------DELETE CARD BY ID

	@DeleteMapping("/delete_card/{id}")
	// @PreAuthorize("hasRole('ROLE_ADMIN')")
	@CrossOrigin(origins = "http://localhost:4200")
	public ResponseEntity<Object> delete(@PathVariable Integer id) {
		Optional<Cards> dispObj = cs.getById(id);
		ResponseEntity<Object> check = checkExists(dispObj);
		if (check != null)
			return check;
		cs.deleteCard(dispObj.get());
		return new ResponseEntity<>(String.format("", id), HttpStatus.OK);
	}

	private ResponseEntity<Object> checkExists(Optional<Cards> obj) {
		if (!obj.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return null;
	}
}
