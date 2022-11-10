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
  public liked:any[]=[]
  public now:Date=new Date();
  isLoaded:boolean = false;
  users: any[] = [];
  time:any=this._auth.result
  postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });
  commentForm = new FormGroup({
    commentBody: new FormControl(''),
  });

  constructor(public _auth: AuthService) {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  handleTime(){

  }

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
      (err) => err.error.message,
      () => console.log('done')
    );
  }


  getPost() {
    this._auth.showPost().subscribe(
      (res) => {
        this._auth.result = res.data;
        this._auth.isLoggedIn=true
        console.log(res);
        // for(let i=0; i<this._auth.result.length; i++){
        //  this.liked = this._auth.result[i].likes
        //  console.log(this.liked)

        // }
      },
      (err) =>err.error.message,
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
      (err) => err.error.message,
      () => console.log('post deleted')
    );
  }
  addComment(id: any) {
    this._auth.addComment(this.commentForm.value, id).subscribe(
      (res) => {

        this.getPost();
      },
      (err) => err.error.message,
      () => console.log('comment added')
    );
  }
  delComment(id: any, commId: any) {
    this._auth.delComment(id, commId).subscribe(
      (res) => {

        this.getPost();
      },
      (err) => err.error.message,
      () => console.log('comment deleted')
    );
  }
  addLike(id: any) {
    this._auth.addLike(id).subscribe(
      (res) => {

        this.getPost();
      },
      (err) => console.log(err),
      () =>''
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
