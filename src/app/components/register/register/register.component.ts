import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    nome: null,
    cognome: null,
    username: null,
    email: null,
    password: null

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword = false;

  token: string | undefined;

  formSubmitted = false;

  constructor(private authService: AuthService) { this.token = undefined; }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nome, cognome, username, email, password } = this.form;

    this.formSubmitted = true;


    this.authService.register(nome, cognome, username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log(`Token [${this.token}] generated`);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
