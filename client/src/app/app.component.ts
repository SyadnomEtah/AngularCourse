import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Angular Course';
  users: any;

  ngOnInit(): void {
      this.http.get('https://localhost:5001/api/Users').subscribe({
        next: data => this.users = data,
        error: error => console.log(error),
        complete: () => console.log('Request has completed'),
      });
  }
}
