import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SocialMediaComponent } from './components/social-media/social-media.component';
import { PostfeedComponent } from './components/pages/postfeed/postfeed.component';

const routes: Routes = [
  {path: "" , component:HomeComponent},
  {path:"social-media" , component:SocialMediaComponent},
  {path:"postfeed" , component:PostfeedComponent},
  {path:"**" , component:HomeComponent},
  
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }