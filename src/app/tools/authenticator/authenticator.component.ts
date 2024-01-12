import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state:string = "Login"
  LoginForm:FormGroup;
  RegisterForm:FormGroup;
  ResetForm:FormGroup;
  firebasetsAuth = new FirebaseTSAuth();

  

  constructor( private loginSheet: MatBottomSheet) { 
    // this.firebasetsAuth = new FirebaseTSAuth();
  }


  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'email':  new FormControl(null , [Validators.required , Validators.email]),
      'password': new FormControl(null , Validators.required),
    })
    this.RegisterForm = new FormGroup({
      'email':  new FormControl(null , [Validators.required , Validators.email]),
      'password': new FormControl(null , Validators.required),
      'confirmPassword': new FormControl(null , Validators.required),
    });
    this.ResetForm = new FormGroup({
      'email':  new FormControl(null , [Validators.required , Validators.email]),
    })
   
  }

  onSubmit(){
    let email = this.LoginForm.value.email;
    let password = this.LoginForm.value.password;
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
  onRegisterClick(){
    let email = this.RegisterForm.value.email;
    let password = this.RegisterForm.value.password;
    let confirmPassword = this.RegisterForm.value.confirmPassword;
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
                // email = "";
                // password= "";
                // confirmPassword = "";
             },
             onFail: (err) => {
                alert("Failed to create the account.");
             }
           }
        );
    }
  }
  onResetClick(){
    let email = this.ResetForm.value.email;
    if(this.isNotEmpty(email)) {
      this.firebasetsAuth.sendPasswordResetEmail(
        {
        email: email,
        onComplete: (err) => {
          this.loginSheet.dismiss();
          // alert(`Reset email sent to ${email}`);
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
  // onAddHobby(){
  //   (<FormArray>this.LoginForm.get('hobbies')).push(new FormControl(null , Validators.required))
    
  // }
  onForgotPasswordClick(){
    this.state="ForgetPassword"
  }
  
  onCreateAccountClick(){
    this.state="Register"
  }
  
  onLoginClick(){
    this.state="Login"
  }
}
