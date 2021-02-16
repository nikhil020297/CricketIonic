import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum Country {
  name = 'name',
  icon = 'icon'
}


const API_KEY : string = "$2b$10$/v37glTt6d/UHY6PfrLp4.X2Fnezxy1E3bGWc5gjX4chRjTE4bUXi";

let countryList: Array<Country> = new Array();

var header = new HttpHeaders({
  'Content-Type': 'application/json',
  'secret-key': API_KEY
});

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }



  getCountryList()  {
    console.log(header);

    return new Promise<Array<Country>>((resolve, reject) => {
      this.http.get("https://api.jsonbin.io/b/5f5a07e17243cd7e82398c5b/latest", { headers: header }).toPromise().then(
        res => {
          let countryArray: Array<any> = res['country_list'];

          countryArray.forEach(element => {
            countryList.push(element);
          });
          console.log(countryList);
          resolve(countryList);
        },
        error => {
          console.log(error);
          reject(error);
        }
      )
    })
  }

  getTeamStats() {
    return new Promise<any>((resolve, reject) => {
      this.http.get("https://api.jsonbin.io/b/5f5a0a917243cd7e82398d7a/latest", { headers: header }).toPromise().then(
        res => {
          console.log(res);
          resolve(res);
        },
        error => {
          console.log(error);
          reject(error);
        }
      )
    })
  }

  getPlayerStats() {
    return new Promise<any>((resolve, reject) => {
      this.http.get("https://api.jsonbin.io/b/5f5a0d8fad23b57ef90f837c/latest", { headers: header }).toPromise().then(
        res => {
          console.log(res);
          resolve(res);
        },
        error => {
          console.log(error);
          reject(error);
        }
      )
    })
  }
}
