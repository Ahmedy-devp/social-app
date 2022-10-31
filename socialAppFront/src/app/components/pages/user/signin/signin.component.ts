import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  isSubmitted=false
  loginForm=new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
  })



  get userName() { return this.loginForm.get('userName')}
  get password() { return this.loginForm.get('password')}


  constructor(private router: Router,private _auth: AuthService) { }
msg=''
  ngOnInit(): void {
  }
  handleLogin(){

    if(this.loginForm.valid){
      this._auth.login(this.loginForm.value).subscribe(
        res=>{
          console.log(res)
          localStorage.setItem("g23",res.data.token)
          this._auth.isLoggedIn=true
          this._auth.userData=res.data.userData
        },
        e=>{
          this.msg=e.error.message
          this._auth.isLoggedIn = false
          this._auth.userData = null
        },
        ()=>{
          this.router.navigate(['posts'], {
            queryParams: { loggedIn: 'true' },
          });
        }
        )

   }
  }

}
