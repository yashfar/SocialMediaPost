import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



//Material UI
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import {MatRippleModule} from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//Reactive form 
import { ReactiveFormsModule } from '@angular/forms';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostfeedComponent } from './components/pages/postfeed/postfeed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

//  NgxPhotoEditorModule
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { ImageEditorComponent } from './components/image-editor/image-editor.component';
import { PostComponent } from './components/post/post.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AuthenticatorComponent,
    SocialMediaComponent,
    ProfileComponent,
    PostfeedComponent,
    CreatePostComponent,
    ImageEditorComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxPhotoEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){

    FirebaseTSApp.init(
        environment.firebaseConfig
    );

 }
}
