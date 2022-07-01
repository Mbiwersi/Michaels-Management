import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, private authService: AuthenticationService) { }
  user: User = {_id: 0,first_name: "", last_name: "", email: "", password: "", admin: false}
  name: string | null = null;

  ngOnInit(): void {
    this.hideAlerts()
    if(this.name == null){
      this.getUser();
    }
  }


  logout(): void{
    this.authService.logout().subscribe();
  }

  getUser(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = <User>JSON.parse(JSON.stringify(user));
      this.name = this.user.first_name
    }, (err) => {
      this.router.navigateByUrl('/MichaelsManagement/login');
    })
  }

  hideAlerts(){
    $('#success-alert').hide()
    $('#failed-alert').hide()
    $('#no-prop-warning-alert').hide()
    $('#no-rent-warning-alert').hide()
  }

}
