import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  constructor(private http: HttpClient) { }

  createRent(pid:number, month:number) {
    this.getMonthYear(new Date(month))
    const headers = {'content-type': 'application/json'}
    const b = {
      "month" : month,
      "paid" : true,
      "notes": this.getMonthYear(new Date(month))
    }

    const body = JSON.stringify(b);
    return this.http.post(`final/api/v1/properties/${pid}/rent`, body, {'headers':headers})
  }

  getMonthYear(date: Date): any {
    let result = ''
    let year = date.getFullYear();
    let month = date.getUTCMonth();
    // console.log(`month: ${month}`)
    // console.log(`year: ${year}`)
    switch(month) {
      case 0:
        result += 'January';
        break;
      case 1:
        result += 'Febuary';
        break;
      case 2:
        result += 'March';
        break;
      case 3:
        result += 'April';
        break;
      case 4:
        result += 'May';
        break;
      case 5:
        result += 'June';
        break;
      case 6:
        result += 'July';
        break;
      case 7:
        result += 'August';
        break;
      case 8:
        result += 'September';
        break;
      case 9:
        result += 'October';
        break;
      case 10:
        result += 'November';
        break;
      case 11:
        result += 'December';
        break;
    }

    result += ' '+ year + ' Rent';
    return result;
  }

  getRent(pid:number, month:number){
    return this.http.get(`final/api/v1/properties/${pid}/rent?month=${month}`)
  }
}
