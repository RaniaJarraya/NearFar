import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 /* selectedUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role:'',
    domaine:''

  };*/
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(public http: HttpClient) { }

  //HttpMethods
  getNotif(email){return this.http.get(environment.apiBaseUrl+'/getNotif/'+email);}
  
  postUser(user){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  ModifierName(email,newName){
    return this.http.put(environment.apiBaseUrl+'/ModName/'+email+'/'+newName, this.noAuthHeader);
  }
  ModifierLastName(email,newLastName){
    return this.http.put(environment.apiBaseUrl+'/ModLastName/'+email+'/'+newLastName, this.noAuthHeader);
  }
  ModifierEmail(email,newEmail){
    return this.http.put(environment.apiBaseUrl+'/ModEmail/'+email+'/'+newEmail, this.noAuthHeader);
  }
  ModifierPass(email,newPass){
    return this.http.put(environment.apiBaseUrl+'/ModPass/'+email+'/'+newPass, this.noAuthHeader);
  }
  ModifierDomaine(email,newDomaine){
    return this.http.put(environment.apiBaseUrl+'/ModDomaine/'+email+'/'+newDomaine, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  regInfo(data,email,domaine,name){
    return this.http.post(environment.apiBaseUrl+'/edit/'+email+'/'+domaine+'/'+name, data, this.noAuthHeader);
  }

  expertDetails(_id)
{return this.http.get(environment.apiBaseUrl+'/expertDetails/'+ _id)};

getRate(email){return this.http.get(environment.apiBaseUrl+'/getrate/'+email);}

  getresev(email){
    return this.http.get(environment.apiBaseUrl+'/reservation/'+email);
  }
  rate(C_email,E_email,rate){
    return this.http.post(environment.apiBaseUrl+'/rate/'+C_email+'/'+E_email+'/'+rate, this.noAuthHeader);
  }

  reserve(info,time){
    return this.http.post(environment.apiBaseUrl+'/reserve/'+time,info, this.noAuthHeader);
  }
  consult(email){
    return this.http.get(environment.apiBaseUrl+'/consult/'+email);
  }

  getExpert(email)
  {return this.http.get(environment.apiBaseUrl+'/expert/'+email)};
  
  
  
getExpertByName(Search_Name)
{return this.http.get(environment.apiBaseUrl+'/searchName/'+Search_Name)};

getExpertByDomaine(Search_Domaine)
{return this.http.get(environment.apiBaseUrl+'/searchDomaine/'+Search_Domaine)};

getcolor(expertName,consultday)
{return this.http.get(environment.apiBaseUrl+'/casecolor/'+expertName+'/'+consultday)};

daydetails(email)
{return this.http.get(environment.apiBaseUrl+'/daydetails/'+email)};

delete(email,day)
{return this.http.post(environment.apiBaseUrl+'/delete/'+email+'/'+day, this.noAuthHeader)};

update(id,data1)
{return this.http.post(environment.apiBaseUrl+'/update/'+id,data1 , this.noAuthHeader)};

startProcess(time,email,day)
{return this.http.post(environment.apiBaseUrl+'/putProcess/'+email+'/'+day+'/'+time, this.noAuthHeader)};

deleteProcess(time,email,day)
{return this.http.post(environment.apiBaseUrl+'/deleteProcess/'+email+'/'+day+'/'+time, this.noAuthHeader)};

getProcess(email,day)
{return this.http.get(environment.apiBaseUrl+'/getProcess/'+email+'/'+day)};

  /*getclients(email){
    return this.http.get(environment.apiBaseUrl + '/consultations/'+email).subscribe(res => {
      var doc = res;
      console.log(doc);
      //this.searchedUser[0]= doc["fname"];
      //this.searchedUser[1]= data["lname"];
      //this.searchedUser[2]= data["email"];
      //this.searchedUser[3]= data["role"];
      //this.searchedUser = data;
    });
  }*/
  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1;
    else
      return false;
  }
}