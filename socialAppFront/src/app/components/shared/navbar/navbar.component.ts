import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,public _auth: AuthService) {}

  ngOnInit(): void {
    this.me();
  }
  me() {
    this._auth.me().subscribe(
      (res) => {
        console.log(res);
        this._auth.isLoggedIn = true;
        this._auth.userData = res.data;
      },
      (err) => {
        console.log(err.error.message);
        this._auth.isLoggedIn = false
        this._auth.userData = null
      },
      () => console.log('done')
    );
  }
  logout(){
    this._auth.logout().subscribe(
      (res) => {
        console.log(res);
        this._auth.isLoggedIn =false;
        this._auth.userData = null;
        localStorage.removeItem('g23')
      },
      (err) => {
        console.log(err.error.message);

      },
      ()=>{
        this.router.navigate([''], {
          queryParams: { loggedOut: 'true' },
        });
      }
      )
}
}
