import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
      const config = {
          apiKey: 'AIzaSyBLyKSdI4Q6tA9tT1LL3h3BuZAFM3G6zSU',
          authDomain: 'http-pokemon.firebaseapp.com',
          databaseURL: 'https://http-pokemon.firebaseio.com',
          projectId: 'http-pokemon',
          storageBucket: 'http-pokemon.appspot.com',
          messagingSenderId: '4534509301'
      };
      firebase.initializeApp(config);
  }
}
