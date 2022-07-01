import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import { Loader} from '@googlemaps/js-api-loader';
import { PropertyService } from 'src/app/services/property/property.service';
import {} from 'src/app/components/properties/properties.component'


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property:Property = {_id: -1, userid: -1, address: "", monthly_rent: -1, monthly_cost: -1, num_bed: -1, num_bath: -1,
                        image: "", owned_since: "", purchase_price: -1, rentPayments: [], lat: 0, long: 0}
  date: Number = Date.now();
  due: boolean = false;
  lat: number | null = null
  long: number | null = null

  constructor(private router: Router, private propertyService: PropertyService, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getProperty(<string>this.activatedroute.snapshot.paramMap.get("pid"));
  }

  // method to get the property
  getProperty(id: string): void {
    this.propertyService.getProperty(id).subscribe((prop) => {
      this.property = <Property>prop;
      this.rentDue()

      // Load the map with the Coords
      let loader = new Loader({
        // apiKey: 'FAKE'
        apiKey: 'AIzaSyCTqhGk8JaIg-FouzFEByv1UHpTf1k3f1I'
      })
  
      loader.load().then(() => {
        let gmap = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
          center: {lat: this.property.lat, lng: this.property.long},
          zoom: 15
        })

        let marker = new google.maps.Marker({
          position: {lat: this.property.lat, lng: this.property.long},
          map: gmap,
          title: this.property.address
        })
      })
    })
  }

  editProperty(pid:number, address:String, city:String, state:String, rent:String, cost:String,
    baths:String, beds:String, owned_since:String, purchase_price:String): void{
    if(!address || !rent || !cost || !baths || !beds || !owned_since || !purchase_price || Number(purchase_price) <= 0){
      let messages: string[] = []
      if(Number(purchase_price) <= 0){
        messages[messages.length] = "Purchase Price can't be zero or less"
      }
      messages[messages.length] = "Missing required Fields";
      this.failedAlert(messages)
    }
    else{
      let addr = address + ',' + city + ',' + state;
      // console.log(addr.replace(" ", "+"))
      this.propertyService.getLatLong(addr).subscribe((data) => {
        // console.log(data)
        let lat = data.results[0].geometry.location.lat;
        let long = data.results[0].geometry.location.lng;
        this.propertyService.updateProperty(this.property._id, addr,lat, long, Number(rent), Number(cost), Number(baths), Number(beds), owned_since, Number(purchase_price) ).subscribe((prop) => {
          // console.log('property')
          this.property = <Property>prop;
          let messages = ["Edit Success"]
          this.successAlert(messages)
        })
      })
    }
  }

  delete(property:Property): void {
    this.propertyService.delete(property._id).subscribe(() => {
      this.successAlert(["Deleted"])
      setTimeout(() => {
        this.router.navigateByUrl('/MichaelsManagement/properties')
      }, 1000)
    })
  }

  rentDue(): boolean{
    let d = true;
    this.property.rentPayments.forEach(r => {
      // console.log(`r.month: ${r.month}, this.date: ${this.date}`)
      if(r.month <= this.date && r.paid){
        d = false;
      }
    })
    this.due = d
    return d;
  }

  showEditForm() {
    $('#edit-property-form').show('slow')
    $('#edit-btn').hide('slow')
  }

  hideEditForm() {
    $('#edit-property-form').hide('slow');
    $('#edit-btn').show('slow')
  }

  failedAlert(messages:String[]) {
    messages.forEach(m => {
      $('#failed-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#failed-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#failed-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

  successAlert(messages:String[]){
    messages.forEach(m => {
      $('#success-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#success-alert').fadeTo(1000, 500).slideUp(500, function() {
      $('#success-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

}
