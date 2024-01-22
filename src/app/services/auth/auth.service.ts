import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebasetsAuth = new FirebaseTSAuth();

  constructor(private loginSheet: MatBottomSheet) { }
  
  Login(LoginForm:FormGroup){
    let email = LoginForm.value.email;
    let password = LoginForm.value.password;
    if(this.isNotEmpty(email) && 
    this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith(
        {
            email: email,
            password: password,
            onComplete: (uc) => {
              this.loginSheet.dismiss();
            },
            onFail: (err) => {
                alert(err);
            }
        }
     );
    }
  }

  Register(RegisterForm:FormGroup){
    let email = RegisterForm.value.email;
    let password = RegisterForm.value.password;
    let confirmPassword = RegisterForm.value.confirmPassword;
    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) && 
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
       this.firebasetsAuth.createAccountWith(
            { 
             email: email,
             password: password,
             onComplete: (uc) => {
                this.loginSheet.dismiss();
             },
             onFail: (err) => {
                alert("Failed to create the account.");
             }
           }
        );
    }
  }

  ResetPass(ResetForm:FormGroup){
    let email = ResetForm.value.email;
    if(this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
        email: email,
        onComplete: (err) => {
          this.loginSheet.dismiss();
        }
        });
    }
  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  } 
  isAMatch(text: string, comparedWith: string){
    return text == comparedWith;
  }
}
