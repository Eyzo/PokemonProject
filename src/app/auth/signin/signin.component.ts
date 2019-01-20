import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  private form: FormGroup;
  private errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }



  ngOnInit() {
    this.InitForm();
  }

  InitForm() {
    this.form = this.formBuilder.group({
        email: [ '', [ Validators.required ] ],
        password: [ '', [ Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/) ] ]
    });
  }

  onValidate() {
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.signIn(email, password).then(
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
