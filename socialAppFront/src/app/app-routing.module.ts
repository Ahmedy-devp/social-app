import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/pages/user/signup/signup.component';
import { SigninComponent } from './components/pages/user/signin/signin.component';
import { PostsComponent } from './components/pages/posts/posts.component';
import {ProfileComponent } from './components/pages/user/profile/profile.component'
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import {EditPostComponent} from './components/pages/edit-post/edit-post.component'
import { IsLoggedGuard } from './guards/is-logged.guard';
import { SureGuard } from './guards/sure.guard';

const routes: Routes = [

  { path: '', component: SigninComponent,canActivate: [IsLoggedGuard]},
  { path: 'signup', component: SignupComponent,canActivate: [IsLoggedGuard] },
  { path: 'posts', component: PostsComponent, },
  { path:'profile', component:ProfileComponent},
  {path:'editProfile', component:EditProfileComponent},
  {path:'editPost/:id', component:EditPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
