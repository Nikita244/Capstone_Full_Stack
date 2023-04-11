package it.epicode.giulia_franzosi.Capstone_Project.entities;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users", uniqueConstraints = {
		// Specifico le chiavi che devono essere uniche
		@UniqueConstraint(columnNames = "username"), @UniqueConstraint(columnNames = "email") })
@ToString
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotBlank
	private String nome;

	@NotBlank
	private String cognome;

	@NotBlank
	private String email;

	@Column(unique = true, nullable = false)
	@NotBlank
	private String username;

	@NotBlank
	private String password;

	private Boolean active;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<UserRole> roles = new HashSet<>();

	public User(String username, String email, String password, String nome, String cognome, boolean active) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.nome = nome;
		this.cognome = cognome;
		this.active = active;
	}

}
