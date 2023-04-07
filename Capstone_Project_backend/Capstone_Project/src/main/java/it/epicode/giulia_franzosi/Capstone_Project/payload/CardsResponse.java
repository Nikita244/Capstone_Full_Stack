package it.epicode.giulia_franzosi.Capstone_Project.payload;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CardsResponse {
	
	private String immagine;
	private String nome_comune;
	private String nome_scientifico;
	private String habitat;
	private String descrizione;
}
