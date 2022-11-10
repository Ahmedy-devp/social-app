import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm = new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl('',[Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])

  })

  constructor(private router: Router,public _auth:AuthService) { }
data:any =this._auth.userData
  ngOnInit(): void {
    this._auth.me().subscribe(
      (res) => {
        console.log(res);
        this._auth.isLoggedIn = true;
        this._auth.userData = res.data;
        this.editForm.patchValue(res.data)


      },
    )}
handleEdit(){
  this._auth.edit(this.editForm.value).subscribe(
    res=> {console.log(res)
     console.log(this._auth)}
    ,
    err=> console.log(err),
    ()=>{
      this.router.navigate(['profile'], {
        queryParams: { profileEdited: 'true' },
      });
      this.userUpdate()
    }
  )

}
delUser(id:any){
  this._auth.delUser(id).subscribe(
    res=> {localStorage.removeItem('g23')},
    err=> console.log(err),
    ()=> this.router.navigateByUrl('/')
  )
}
userUpdate(){
  this._auth.userUpdate().subscribe(
    res=> {console.log(res)},
    err=> console.log(err),
    ()=>{console.log("hola")}
  )
}
}

