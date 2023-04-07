package it.epicode.giulia_franzosi.Capstone_Project.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import it.epicode.giulia_franzosi.Capstone_Project.entities.Cards;

@Repository
public interface CardsRepository extends JpaRepository<Cards, Integer>{
	
	public Page<Cards> findAll(Pageable pageable);
}
