import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  isLoaded:boolean = false;
  users: any[] = [];
  postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });
  commentForm = new FormGroup({
    commentBody: new FormControl(''),
  });

  constructor(public _auth: AuthService) {}

  ngOnInit(): void {
    this.getPost();

  }
  file:any
changeMyImg(event:any){
  this.file=event.target.files[0]||''
  }
  addPost() {
    let data:any = this.postForm.value.title;
    let data1:any = this.postForm.value.body;
    const myData = new FormData();
    myData.append('title', data)
    myData.append('body', data1)
    myData.append('img', this.file)
    this._auth.post(myData).subscribe(
      (res) => {
        // this._auth.isLoggedIn=true
        // this._auth.userData=res.data
        this.file=''
        this._auth.result.unshift(res.data);
      },
      (err) => console.log(err),
      () => console.log('done')
    );
  }


  getPost() {
    this._auth.showPost().subscribe(
      (res) => {
        console.log(res);
        this._auth.result = res.data;
        console.log();
      },
      (err) => console.log(err),
      () => {
        this.isLoaded=true
      }
    );
  }
  delPost(id: any) {
    this._auth.delPost(id).subscribe(
      (res) => {
        console.log();
        this.getPost();
      },
      (err) => console.log(err),
      () => console.log('post deleted')
    );
  }
  addComment(id: any) {
    this._auth.addComment(this.commentForm.value, id).subscribe(
      (res) => {
        console.log(res);
        console.log(this._auth.result);
        this.getPost();
      },
      (err) => console.log(err),
      () => console.log('comment added')
    );
  }
  delComment(id: any, commId: any) {
    this._auth.delComment(id, commId).subscribe(
      (res) => {
        console.log();
        this.getPost();
      },
      (err) => console.log(err),
      () => console.log('post deleted')
    );
  }
  addLike(id: any) {
    this._auth.addLike(id).subscribe(
      (res) => {
        console.log();
        this.getPost();
      },
      (err) => console.log(err),
      () => console.log('post deleted')
    );
  }
  // showUsers() {
  //   this._auth.showUsers().subscribe(
  //     (res) => {
  //       console.log(res);
  //       this._auth.isLoggedIn = true;
  //       this.users = res.data;
  //       this.users.forEach(user =>{
  //       })
  //     },
  //     (err) => console.log(err.error.message),
  //     () => console.log('done')
  //   );
  // }
}
