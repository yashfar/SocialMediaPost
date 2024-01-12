import { Injectable } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  firebasetsAuth = new FirebaseTSAuth();
  constructor() { }

  isSignIn(){
    return this.firebasetsAuth.isSignedIn();
  }
}
