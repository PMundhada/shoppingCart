import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetcategoryService {

  constructor(private http: HttpClient ) {
    
   };

   getcategory () {
    return this.http.get<any>('')
   }


}
