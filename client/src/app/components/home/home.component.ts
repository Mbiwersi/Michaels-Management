import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property/property.service';
import { Property } from 'src/app/models/property';
import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  income:number = 0;
  payment:number = 0;
  profit:number = 0;
  map: google.maps.Map | null = null
  markers: google.maps.Marker[] = [];

  constructor(private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    this.getProperties()
  }

  // Calcuate Summary totals here
  getProperties(): void {
    this.propertyService.getProperties().subscribe((props) =>{
      let properties = <Property[]>JSON.parse(JSON.stringify(props));
      if(properties.length == 0){
        $('#no-prop-warning-alert').show()
      }
      else{
        $('#no-prop-warning-alert').hide()
      }
      properties.forEach(p =>{
        this.income += p.monthly_rent;
        this.payment += p.monthly_cost;
        this.profit += p.monthly_rent - p.monthly_cost;
      })

      // console.log(this.markers)

      let loader = new Loader({
        // apiKey: 'FAKE'
        apiKey: 'AIzaSyCTqhGk8JaIg-FouzFEByv1UHpTf1k3f1I'
      })
      // Load the map with the Coords

      loader.load().then(() => {
        let bounds = new google.maps.LatLngBounds();
        this.map = new google.maps.Map(<HTMLElement>document.getElementById("map"), {
          mapTypeId: properties.length == 1? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP
        })

        this.map.setCenter(new google.maps.LatLng(39.8097343, -98.5556199));
        this.map.setZoom(4);

        // Add markers to the map
        properties.forEach(p => {
          // console.log(p)
          let marker = new google.maps.Marker({
            position: {lat: p.lat, lng: p.long},
            map: this.map,
            title: p._id.toString()
          })
          marker.addListener('click', () => {
            this.router.navigate(['/MichaelsManagement/api/v1/properties/', marker.get('title')]);
          })
          this.markers.push(marker);
          bounds.extend(new google.maps.LatLng(p.lat, p.long))
        })
        if(properties.length > 1){
          this.map.fitBounds(bounds);
        }
        if(properties.length == 1){
          this.map.setCenter(new google.maps.LatLng(properties[0].lat, properties[0].long))
          this.map.setMapTypeId(google.maps.MapTypeId.HYBRID)
          this.map.setZoom(15)
        }
      })
    })
  }
}  
  
