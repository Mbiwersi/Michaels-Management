import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import * as $ from "jquery";
import { PropertyService } from 'src/app/services/property/property.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = []
  selectedFile:File | null=null

  constructor(private authService:AuthenticationService, private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.getProperties();
    $('#create-property-form').hide()
    this.sortProperties(this.properties)
  }

  // load all the properties of the user
  getProperties(): void {
    this.propertyService.getProperties().subscribe((props) => {
      this.properties = <Property[]>JSON.parse(JSON.stringify(props));
      if(this.properties.length == 0){
        $('#no-prop-warning-alert').show()
      }
      else{
        $('#no-prop-warning-alert').hide()
      }
    })
  }

  // create properties
  createProperty(address:String, rent:String, cost:String,
     baths:String, beds:String, owned_since:String, purchase_price:String): void {
       if(!address || !rent || !cost || !baths || !beds || !owned_since || !purchase_price){
        this.failedAlert(["Missing required Fields"])
       }
       else{
        this.propertyService.getLatLong(address).subscribe((data:any) => {
          let lat = data.results[0].geometry.location.lat;
          let long = data.results[0].geometry.location.lng;
          this.propertyService.createProperty(address, rent, cost, baths, beds, owned_since, purchase_price, lat, long).subscribe((prop) =>{
            let p = <Property>JSON.parse(JSON.stringify(prop))
            if(p){
              this.getProperties()
              this.successAlert(["Created Property"])
            }
            else{
              alert("ERROR Creating property");
            }
          }, () => {
            this.failedAlert(["ERROR Creating property"])
          })
        })
       }
  }

  delete(property:Property): void {
    this.propertyService.delete(property._id).subscribe(() => {
      this.getProperties();
      this.successAlert(["Propertiy Deleted"])
    })
  }

  sortProperties(props: Property[]) {
    let filter: any = $('#filter').val()
    let direction: number = <number>$('#direction').val();
    if(filter == 'Address'){
      this.properties.sort((a, b) => {
        if(a.address < b.address){
          return -1 * direction;
        }
        if(a.address > b.address){
          return 1 * direction;
        }
        return 0;
      })
    }
    else if(filter == 'Rent'){
      this.properties.sort((a, b) => {
        if(a.monthly_rent > b.monthly_rent){
          return 1 * direction;
        }
        if(a.monthly_rent < b.monthly_rent){
          return -1 * direction;
        }
        return 0;
      })
    }
    else if(filter == "Purchased"){
      this.properties.sort((a,b) => {
        if(a.owned_since > b.owned_since){
          return 1 * direction;
        }
        if(a.owned_since < b.owned_since){
          return -1 * direction;
        }
        return 0;
      })
    }
  }

  // click and get the details of the property
  // getDetails(property:Property): void {
  //   this.router.navigate(['/final/api/v1/properties/', property._id]);
  // }

  showForm(){
    $('#create-property-form').show('slow');
    $('#add').hide();
  }

  hideForm(){
    $('#create-property-form').hide('slow');
    $('#add').show();
  }

  showEditForm() {
    $('#edit-property-form').show('slow');
  }

  // showAlert(type:String, messages:String[]){
  //   messages.forEach(m => {
  //     $(`#${type}-alert`).append(`<p id='${type}-message'>${m}</p>`)
  //   })
  //   $(`#${type}}-alert`).fadeTo(2000, 500).slideUp(500, function() {
  //     $(`#${type}-alert`).slideUp(500);
  //     messages.forEach(m => {
  //       $(`#${type}-message`).remove();
  //     })
  //   })
  // }

  successAlert(messages:String[]){
    messages.forEach(m => {
      $('#success-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#success-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#success-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

  failedAlert(messages:String[]) {
    messages.forEach(m => {
      $('#failed-alert').append(`<p id='fail-message'>${m}</p>`)
    })
    $('#failed-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#failed-alert').slideUp(500);
      messages.forEach(m => {
        $('#fail-message').remove();
      })
    })
  }

}
