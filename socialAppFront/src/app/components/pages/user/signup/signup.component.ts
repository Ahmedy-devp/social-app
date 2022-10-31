import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSubmitted=false
  registerForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    userName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    status:new FormControl('',[Validators.required])
  })


  get name() { return this.registerForm.get('name')}
  get userName() { return this.registerForm.get('userName')}
  get email() { return this.registerForm.get('email')}
  get password() { return this.registerForm.get('password')}
  get status() { return this.registerForm.get('status')}


  constructor(private router: Router,private _auth: AuthService) { }

  ngOnInit(): void {
  }
  handleRegister(){
    this.isSubmitted=true

    let data: User | any = this.registerForm.value
    if(this.registerForm.valid){
      this._auth.register(data).subscribe(
        res=>{
          console.log(res)

        },
        e=>{
          console.log(e)
        },
        ()=>{
          this.router.navigate([''], {
            queryParams: { registered: 'true' },
          });
        }
        )

   }
  }

}
