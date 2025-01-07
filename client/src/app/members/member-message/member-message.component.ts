import {AfterViewChecked, Component, inject, input, ViewChild} from '@angular/core';
import {MessageService} from '../../_services/message.service';
import {TimeagoModule} from 'ngx-timeago';
import {FormsModule, NgForm} from '@angular/forms';

@Component({
  selector: 'app-member-message',
  standalone: true,
  imports: [
    TimeagoModule,
    FormsModule
  ],
  templateUrl: './member-message.component.html',
  styleUrl: './member-message.component.css'
})
export class MemberMessageComponent implements  AfterViewChecked{
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChild('scrollMe') scrollContainer?: any;
  messageService = inject(MessageService);
  username = input.required<string>();
  messageContent = '';
  loading = false;

  sendMessage() {
    this.loading = true;
    this.messageService.sendMessage(this.username(), this.messageContent).then(() => {
      this.messageForm?.reset();
      this.scrollToBottom();
    }).finally(() => this.loading = false);
  }
  ngAfterViewChecked(): void {
      this.scrollToBottom();
  }

  private scrollToBottom(){
    if(this.scrollContainer){
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
