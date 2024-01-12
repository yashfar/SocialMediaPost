
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { UserDocument } from '../interfaces/userDocument.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() show: boolean;
  auth:FirebaseTSAuth;
  firestore:FirebaseTSFirestore;

  ProfileForm:FormGroup;

  constructor(){
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
    this.ProfileForm = new FormGroup({
      'name': new FormControl(null , Validators.required),
      'surname':  new FormControl(null ,Validators.required),
      'description':  new FormControl(),
    })
  }

  onSubmit(){
    let name = this.ProfileForm.value.name;
    let surname = this.ProfileForm.value.surname;
    let description = this.ProfileForm.value.description;

      this.firestore.create(
        {
          path: ["Users", this.auth.getAuth().currentUser.uid],
          data: {
            name: name,
            surname: surname,
            description:description,
          },
          onComplete: (uc) => {
            alert("Profile Created");
            this.ProfileForm.value.name = "";
            this.ProfileForm.value.surname = "";
            this.ProfileForm.value.description= "";
          },
          onFail: (err) => {
              alert(err);
          }
        }
     );
  }
  onLogout(){
    this.auth.signOut();
  }
}


