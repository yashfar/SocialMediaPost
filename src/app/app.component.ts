import { Component } from '@angular/core';
import { Router } from '@angular/router';
//firebase
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { UserDocument } from './components/interfaces/userDocument.interface';
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

  islogIn(){ return this.auth.isSignedIn()}
  
  constructor( private router:Router) {
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
    this.auth.listenToSignInStateChanges(
        user=>{
            this.auth.checkSignInState(
            {
              whenSignedIn: user => {
                alert("Logged in");
                this.router.navigate(["social-media"]);
                this.getUserProfile();
              },
              whenSignedOut: user => {
                alert("Logged out");
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


    getUserProfile(){
      this.firestore.listenToDocument(
        {
          name: "Getting Document",
          path: [ "Users", this.auth.getAuth().currentUser.uid ],
          onUpdate: (result) => {
              this.userDocument = <UserDocument >result.data();
              this.userHasProfile = result.exists; 
              if(this.userHasProfile) {
                this.router.navigate(["postfeed"]);
              }
          }
        }
      );
    } 
}



