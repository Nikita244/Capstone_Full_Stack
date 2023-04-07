package it.epicode.giulia_franzosi.Capstone_Project.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Cards {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String immagine;
	private String nome_comune;
	private String nome_scientifico;
	private String habitat;
	@Column(columnDefinition = "TEXT")
	private String descrizione;

}
