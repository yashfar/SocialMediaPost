import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  

  constructor( private loginSheet: MatBottomSheet , private authService:AuthService) { 
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
      this.authService.Login(this.LoginForm)
  }
  onRegisterClick(){
    this.authService.Register(this.RegisterForm)
  }
  onResetClick(){
    this.authService.ResetPass(this.ResetForm)
  }

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
