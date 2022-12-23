import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http:HttpClient) { }
  // getCategoryByFetching(){
  //   return this.http.get('http://localhost:3000/category')
  // }\
  getCategoryByFetching(){

    return this.http.get<any>("http://localhost:3000/category")

    .pipe(map((res:any)=>{

      return res;

    }))

  }

  postCategory(body:any) {
    return  this.http.post<any>('http://localhost:3000/category',body)
  }

  deleteData(id:number){
    return this.http.delete<any>('http://localhost:3000/category/'+id)
  }

  updateData(data:any, id:number){
    
    console.log(data, id)
    return this.http.put("http://localhost:3000/category/"+id, data)
  }
 


  //products part//
  getProducts(){
    return this.http.get('http://localhost:3000/products')
  }

  postProducts(body:any) {
    return  this.http.post<any>('http://localhost:3000/products',body)
  }

  updateProduct(data:any, id:number){
    return this.http.put("http://localhost:3000/products/"+id, data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>('http://localhost:3000/products/'+id)
  }
}
