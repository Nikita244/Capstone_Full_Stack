package it.epicode.giulia_franzosi.Capstone_Project.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import it.epicode.giulia_franzosi.Capstone_Project.entities.Cards;

@Repository
public interface CardsRepository extends JpaRepository<Cards, Integer>{
	
	public Page<Cards> findAll(Pageable pageable);
	
	@Query(
		    nativeQuery = true,
		    value = "SELECT * FROM cards WHERE LOWER(nome_comune) LIKE LOWER(concat('%', :nome, '%')) OR LOWER(nome_scientifico) LIKE LOWER(concat('%', :nome, '%'))")
		List<Cards> findByName(@Param("nome") String nome);

}
