import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import { Rent } from 'src/app/models/rent';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PropertyService } from 'src/app/services/property/property.service';
import { RentService } from 'src/app/services/rent/rent.service';

@Component({
  selector: 'app-rent-tracker',
  templateUrl: './rent-tracker.component.html',
  styleUrls: ['./rent-tracker.component.css']
})
export class RentTrackerComponent implements OnInit {
  properties: Property[] = [];
  selectedDate: number = Date.now();
  paidProps: boolean[] = []
  currentDate: number = Date.now();

  constructor(private router: Router, private authService:AuthenticationService ,private propertyService: PropertyService, private rentService: RentService) { }

  ngOnInit(): void {
    // this.authUser();
    this.setMonthDefault();
    this.getProperties();
  }

  setMonthDefault(): void{
    // console.log("Changing date")
    const monthControl: any = document.querySelector('input[type="month"]');
    const date= new Date()
    const month=("0" + (date.getMonth() + 1)).slice(-2)
    const year=date.getFullYear()
    monthControl.value = `${year}-${month}`;
    this.selectedDate = Date.parse(monthControl.value);
  }

  changeMonth(): void {
    // console.log("Changing date")
    const monthControl: any = document.querySelector('input[type="month"]');
    this.selectedDate = Date.parse(monthControl.value);
    // console.log(this.selectedDate)
    this.getProperties();
  }

  // Get all properties that have been owned before date
  getProperties(): void {
    this.propertyService.getProperties().subscribe((props) => {
      // filter to get all ones by date
      let properties = <Property[]>JSON.parse(JSON.stringify(props));
      let result: Property[] = [];
      let paid: boolean[] = [];
      properties.forEach(p => {
        // console.log(`owned_since: ${Date.parse(p.owned_since)}, selectedDate: ${this.selectedDate}, difference = ${Date.parse(p.owned_since) - this.selectedDate}`)
        if(Date.parse(p.owned_since) <= this.selectedDate){
          let rent:boolean = false;
          p.rentPayments.forEach(r => {
            if(r.month == this.selectedDate && r.paid){
              rent = true
            }
          })
          paid.push(rent)
          result.push(p)
        }
      })
      this.paidProps = paid;
      this.properties = result;
      if(this.properties.length == 0){
        $('#no-rent-warning-alert').show()
      }
      else{
        $('#no-rent-warning-alert').hide()
      }
      // console.log(this.properties)
      // console.log(this.paidProps)
    })
  }

  paid(prop: Property): void{
    this.rentService.createRent(prop._id, this.selectedDate).subscribe(() => {
      this.getProperties()
    })
  }

  // Checks to see if a property as paid in a certain month
  hasPaid(prop:Property, month:number): boolean{
    this.rentService.getRent(prop._id, month).subscribe((prop) => {
      if(prop == {}){
        return false;
      }
      return true
    })
    return false;
  }

}
