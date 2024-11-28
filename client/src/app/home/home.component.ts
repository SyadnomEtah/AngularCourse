import {Component, inject} from '@angular/core';
import {RegisterComponent} from '../register/register.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RegisterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  http = inject(HttpClient);
  registerMode = false;
  users: any;

  ngOnInit() {
    //this.getUsers();
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode($event: boolean) {
    this.registerMode = $event;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/Users').subscribe({
      next: data => this.users = data,
      error: error => console.log(error),
      complete: () => console.log('Request has completed'),
    });
  }
}
