import { DebugEventListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';

//firebase
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserDocument } from 'src/app/components/interfaces/userDocument.interface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userHasProfile = new BehaviorSubject<boolean>(null);
  userDocument = new Subject<UserDocument>();

  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;

  constructor( private router:Router) {}


  getUserProfile(){
    this.firestore.listenToDocument(
      {
        name: "Getting Document",
        path: [ "Users", this.auth.getAuth().currentUser.uid ],
        onUpdate: (result) => {
            this.userDocument.next(<UserDocument>result.data());
            this.userHasProfile.next(result.exists);
            if(this.userHasProfile) {
              this.router.navigate(["postfeed"]);
            }
        }
      }
    );
  } 

}
