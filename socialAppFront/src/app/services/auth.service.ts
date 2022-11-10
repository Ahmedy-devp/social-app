import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  private commonUrl="http://localhost:3000/api"
  public isLoggedIn=false
  public userData:any=null
  public result:any[]=[]



  register(data:User):Observable<any>{
    return this._http.post(`${this.commonUrl}/user/register`,data)
  }

  login(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}/user/login`,data)
  }
  me():Observable<any>{
    return this._http.get(`${this.commonUrl}/user/me`)
  }
  logout():Observable<any>{
    return this._http.get(`${this.commonUrl}/user/logout`)
  }
  edit(data:any):Observable<any>{
    return this._http.patch(`${this.commonUrl}/user/editProfile`,data)
  }
  delUser(id:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}/user/delUser/${id}`)
  }
  editImg(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}/user/imgUpload`,data)
  }
  post(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}/article/addArticle`,data)
  }
  showPost():Observable<any>{
    return this._http.get(`${this.commonUrl}/article/showAll`)
  }
  showUsers():Observable<any>{
    return this._http.get(`${this.commonUrl}/user/allUsers`)
  }
  delPost(id:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}/article/delPost/${id}`)
  }
  addComment(data:any,id:any):Observable<any>{
    return this._http.patch(`${this.commonUrl}/article/addComment/${id}`,data)
  }
  delComment(id:any,commId:any):Observable<any>{
    return this._http.delete(`${this.commonUrl}/article/delComment/${id}/${commId}`)
  }
  userUpdate():Observable<any>{
    return this._http.post(`${this.commonUrl}/article/userUpdate`,null)
  }
  showUserPost():Observable<any>{
    return this._http.get(`${this.commonUrl}/article/userArticles`)
  }
  addLike(id:any):Observable<any>{
    return this._http.patch(`${this.commonUrl}/article/addLikes/${id}`,null)
  }
  editPost(id:any,data:any):Observable<any>{

    return this._http.patch(`${this.commonUrl}/article/editArticle/${id}`,data)
  }
  singlePost(id:any):Observable<any>{
    return this._http.get(`${this.commonUrl}/article/single/${id}`)
  }
}
