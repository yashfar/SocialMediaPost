import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { UserServiceService } from '../user/user-service.service';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;
  userHasProfile = true;

  constructor( private router:Router , private snackBar: MatSnackBar , private userService:UserServiceService ) {
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
  }

  authSetting(){
    this.auth.listenToSignInStateChanges(
      user=>{
          this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.snackBar.open('Login Succefully', 'Close', {
                duration: 3000, // Duration in milliseconds
              });
              
              this.router.navigate(["postfeed"]);
              this.userService.getUserProfile();
            },
            whenSignedOut: user => {
              this.snackBar.open('Logout Succefully', 'Close', {
                duration: 3000, // Duration in milliseconds
              });
              this.router.navigate([""])
            },
            whenSignedInAndEmailVerified: user => {

            },
            whenSignedInAndEmailNotVerified: user => {
              
            },
            whenChanged: user => {
              
            }
          }
        )
      }
    )
  }

  isSignIn(){
    return this.auth.isSignedIn();
  }
}
