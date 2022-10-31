import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SignupComponent } from './components/pages/user/signup/signup.component';
import { SigninComponent } from './components/pages/user/signin/signin.component';
import { AuthInterceptor } from './auth.interceptor';
import { ProfileComponent } from './components/pages/user/profile/profile.component';
import { PostsComponent } from './components/pages/posts/posts.component';
import { EditProfileComponent } from './components/pages/user/edit-profile/edit-profile.component';
import { EditPostComponent } from './components/pages/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    PostsComponent,
    EditProfileComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
