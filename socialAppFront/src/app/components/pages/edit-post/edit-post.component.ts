import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  editForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });

  constructor(public _auth: AuthService, private _route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {
    this._auth.singlePost(this._route.snapshot.params?.['id']).subscribe((result) => {
      this.editForm = new FormGroup({
        title: new FormControl(result.data?.['title']),
        body: new FormControl(result.data?.['body']),
      })
    })
  }
  file: any;
  changeMyImg(event: any) {
    this.file = event.target.files[0];

  }
  editPost() {
    let data: any = this.editForm.value;
    const myData = new FormData();
    myData.append('title', data.title);
    myData.append('body', data.body);
    myData.append('img', this.file,this.file.name);
    console.log(this.file);
    this._auth.editPost(this._route.snapshot.params?.['id'], myData).subscribe(
      (res) => {
        console.log(res);
        this.file = '';
      },
      (err) => console.log(err),
      () =>{this.router.navigateByUrl('/posts')}
    );
  }
}
