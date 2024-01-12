import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { AuthenticationServiceService } from 'src/app/services/authenticator/authentication-service.service';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';
import { UserDocument } from '../interfaces/userDocument.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() logedIn:boolean; 
  @Input() userInfo:UserDocument ;
  firebasetsAuth = new FirebaseTSAuth();
  constructor(private loginSheet: MatBottomSheet , private auth:AuthenticationServiceService ){
    this.firebasetsAuth.listenToSignInStateChanges(
      
      user=>{
        // if(user){
        //   this.logedIn= true;
        // }
        // else{
        //   this.logedIn=false;
        // }
      }
    )
  }
  onLogin(){
    this.loginSheet.open(AuthenticatorComponent);
  }
  onLogout(){
    this.firebasetsAuth.signOut();
  }

}
