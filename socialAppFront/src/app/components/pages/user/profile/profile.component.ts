import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(public _auth: AuthService) {}
  userPost:any[]=[]
  commentForm = new FormGroup({
    commentBody: new FormControl(''),
  });
  ngOnInit(): void {
    this.me();
    this.getUserPost()
  }
  me() {
    this._auth.me().subscribe(
      (res) => {
        console.log(res);
        this._auth.isLoggedIn = true;
        this._auth.userData = res.data.userData;
      },
      (err) => console.log(err.error.message),
      () => console.log('done')
    );
  }

file:any
changeMyImg(event:any){
  this.file=event.target.files[0]
  const myData = new FormData();
  myData.append('img', this.file,this.file.name)
  this._auth.editImg(myData).subscribe(
    (res) => {console.log(res)
      this.userUpdate()
      this._auth.userData.profileImage=res.data.profileImage;},
      (err) => console.log(err),
      () => console.log('done')
    );
  }
  userUpdate(){
    this._auth.userUpdate().subscribe(
      res=> {console.log(res)},
      err=> console.log(err),
      ()=>{console.log("hola")}
    )
  }
  getUserPost() {
    this._auth.showUserPost().subscribe(
      (res) => {
        console.log(res);
        this.userPost = res.data;
        this.userPost.reverse()
        console.log();
      },
      (err) => console.log(err),
      () => console.log('all posts')
    );
  }
  delPost(id: any) {
    this._auth.delPost(id).subscribe(
      (res) => {
        console.log();
this.getUserPost()
      },
      (err) => console.log(err),
      () => console.log('post deleted')
    );
  }
  addComment(id: any) {
    this._auth.addComment(this.commentForm.value, id).subscribe(
      (res) => {
this.getUserPost()
      },
      (err) => console.log(err),
      () => console.log('comment added')
    );
  }
  delComment(id: any, commId: any) {
    this._auth.delComment(id, commId).subscribe(
      (res) => {
        console.log();
this.getUserPost()
      },
      (err) => console.log(err),
      () => console.log('post deleted')
    );
  }
  addLike(id: any) {
    this._auth.addLike(id).subscribe(
      (res) => {

        this.getUserPost()
      },
      (err) => console.log(err),
      () =>''
    );
  }
}


