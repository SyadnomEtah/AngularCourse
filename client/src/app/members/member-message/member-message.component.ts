import {Component, inject, input, OnInit, output, ViewChild} from '@angular/core';
import {MessageService} from '../../_services/message.service';
import {Message} from '../../_models/message';
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
export class MemberMessageComponent {
  @ViewChild('messageForm') messageForm?: NgForm;
  private messageService = inject(MessageService);
  username = input.required<string>();
  messages = input.required<Message[]>();
  messageContent = '';
  updatedMessages = output<Message>();

  sendMessage() {
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next: result => {
        this.updatedMessages.emit(result);
        this.messageForm?.reset();
      }
    })
  }
}
