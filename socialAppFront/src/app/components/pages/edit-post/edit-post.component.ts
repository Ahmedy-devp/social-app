import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
editForm = new FormGroup({
  title: new FormControl(''),
  body: new FormControl('')

})
  constructor(public _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.me().subscribe(
      (res) => {
        console.log(res);
        this._auth.isLoggedIn = true;
        this._auth.userData = res.data;
        this.editForm.patchValue(res.data)})
  }
  file:any
  changeMyImg(event:any){
    this.file=event.target.files[0]||''
    }
  editPost(id:any) {
    let data:any = this.editForm.value.title;
    let data1:any = this.editForm.value.body;
    const myData = new FormData();
    myData.append('title', data)
    myData.append('body', data1)
    myData.append('img', this.file)
    this._auth.editPost(id,myData).subscribe(
      (res) => {
        // this._auth.isLoggedIn=true
        // this._auth.userData=res.data
        this.file=''
      },
      (err) => console.log(err),
      () => console.log('done')
    );
  }
}
