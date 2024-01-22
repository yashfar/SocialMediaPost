import { Component } from '@angular/core';
import { Router } from '@angular/router';
//firebase
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { UserDocument } from './components/interfaces/userDocument.interface';

import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from './services/user/user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;
  userHasProfile = true;
  userDocument: UserDocument;

 
  
  constructor( private router:Router , private snackBar: MatSnackBar) {
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
    this.auth.listenToSignInStateChanges(
        user=>{
            this.auth.checkSignInState(
            {
              whenSignedIn: user => {
                this.snackBar.open('Login Succefully', 'Close', {
                  duration: 3000, // Duration in milliseconds
                });
                
                this.router.navigate(["postfeed"]);
                this.getUserProfile();
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

  islogIn(){return this.auth.isSignedIn()};

  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: [ "Users", this.auth.getAuth().currentUser.uid ],
        onUpdate: (result) => {
            this.userDocument = <UserDocument>result.data();
            this.userHasProfile = result.exists;
            if(this.userHasProfile) {
              this.router.navigate(["postfeed"]);
            }
        }
      }
    );
  } 

}



