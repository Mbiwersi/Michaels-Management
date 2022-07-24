# <img src="https://raw.githubusercontent.com/Mbiwersi/Michaels-Management/master/client/src/favicon.ico" width="100" height="100"> Michaels-Management
## Description

Real Estate property management application that allows for users to input properties, keep track of rent payments, upload documents such as leases, mantance reciepts. Uses Google Maps API for Street view of properties and overview of all properties on one singular map.
## Getting Started
### Dependencies

* MongoDB
* Mongoose
* Express
* Angular
* Node.js

### Installing

* Latest version of Node.js (8.4.1 or higher)
* Latest version of Angular and Angular CLI (13.3.3 or higher)
* Latest version of Express (4.16.4 or higher)
* Latest version of MongoDB (4.5.0 or higher)
* Latest version of Mongoose (6.3.0 or higher)
* Clone repository
```
$ git clone [repo link]
```
* install node dependences
```
$ npm install
```
* Set up google maps api keys <a href="https://mapsplatform.google.com/pricing/" target="_blank">here</a>.
* Enable "Geocoding API", "Maps JavaScript API", and "Street View Static API"
  * Replace all "apiKey: [your_key]" and "img src=https://maps.googleapis.com/maps/api/streetview...key=[your_api_key]" " references with your key.

### Executing program locally

* Start up the server
  * Navigate to the ./server folder and run
```
$ npm start
```
* Start up the client
  * Navigate to ./client folder and run
```
$ ng serve --proxy-config proxy.conf.json
```
Application should then run on <a href="http://localhost:4200/" target="_blank">http://localhost:4200/</a>
