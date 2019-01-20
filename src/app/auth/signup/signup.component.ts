import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private form: FormGroup;
  private errorMessage: string;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.intiForm();
  }

  intiForm() {
    this.form = this.formBuilder.group({
        email: [ '', [ Validators.required ] ],
        password: [ '', [ Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/) ] ]
    });
  }

  onValidate() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.createNewUser(email, password).then(
        () => {
          this.router.navigate(['/pokemons']);
        },
        (error) => {
          this.errorMessage = error;
        }
    );
  }

  get email() {
      return this.form.get('email');
  }

  get password() {
      return this.form.get('password');
  }

}
