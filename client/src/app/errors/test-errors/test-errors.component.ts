import {Component, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private httpClient = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error(){
    this.httpClient.get(this.baseUrl + 'ErrorTest/bad-request').subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
    });
  }

  get401Error(){
    this.httpClient.get(this.baseUrl + 'ErrorTest/auth').subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
    });
  }

  get404Error(){
    this.httpClient.get(this.baseUrl + 'ErrorTest/not-found').subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
    });
  }

  get500Error(){
    this.httpClient.get(this.baseUrl + 'ErrorTest/server-error').subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
    });
  }

  get400ValidationError(){
    this.httpClient.post(this.baseUrl + 'Account/register',{}).subscribe({
      next: data => console.log(data),
      error: error => {
        console.log(error);
        this.validationErrors = error;
      }
    });
  }
}
