import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/models/property';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  httpClient: any;

  constructor(private http: HttpClient) { }

  // Create Property method
  createProperty(address: String, monthly_rent: String, monthly_cost: String,
     num_bath: String, num_bed: String, owned_since:String, purchase_price:String, lat: number, long: number){
    const headers = { 'content-type': 'application/json'} 
    const b = {
      "address" : address,
      "lat":lat,
      "long":long,
      "monthly_rent" : monthly_rent,
      "monthly_cost" : monthly_cost,
      "num_bath" : num_bath,
      "num_bed" : num_bed,
      "owned_since": owned_since,
      "purchase_price": purchase_price
    }
    const body = JSON.stringify(b);
    // console.log(body);

    return this.http.post('final/api/v1/properties/create', body, {'headers':headers});
  }

  // read (get) Property method
  getProperties() {
    return this.http.get('final/api/v1/properties');
  }

  getProperty(id: string) {
    return this.http.get(`final/api/v1/properties/${id}`)
  }

  updateProperty(pid:number, address:String, lat:number, long: number, rent:number, cost:number,
    baths:number, beds:number, owned_since:String, purchase_price:number) {
      const headers = { 'content-type': 'application/json'} 
      const b = {
        "address" : address,
        "lat" :lat,
        "long":long,
        "monthly_rent" : rent,
        "monthly_cost" : cost,
        "num_bath" : baths,
        "num_bed" : beds,
        "owned_since": owned_since,
        "purchase_price": purchase_price
      }
      const body = JSON.stringify(b);
      // console.log(body);
 
      return this.http.put(`final/api/v1/properties/${pid}/update`, body, {'headers':headers});
  }

  getLatLong(address: String) {
    let addr = address.replace(/ /g, "+")
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCTqhGk8JaIg-FouzFEByv1UHpTf1k3f1I`)
  }

  // delete property method
  delete(id: number){
    return this.http.delete(`final/api/v1/properties/${id}`)
  }
}
