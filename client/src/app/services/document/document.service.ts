import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  // Get the documents of a Property
  getDocs(pid: number, filter: string) {
    return this.http.get(`final/api/v1/properties/${pid}/documents?filter=${filter}`)
  }

  createDocument(pid: number, type:string, notes:string){
    const headers = { 'content-type': 'application/json'} 
    const b = {
      "notes" : notes
    }
    const body = JSON.stringify(b);
    return this.http.post(`final/api/v1/properties/${pid}/documents?type=${type}`, body, {'headers':headers})
  }
}
