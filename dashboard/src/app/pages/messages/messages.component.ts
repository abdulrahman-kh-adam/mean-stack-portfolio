import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';
import { IMessage } from './messages.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  messagesService = inject(MessagesService);
  router = inject(Router);
  messages!: IMessage[];
  messageId!: string;
  messagesExist = false;
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.messagesService.getMessages().subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.messages = res.data.messages;
          if (this.messages.length) {
            this.messagesExist = true;
          }
        } else {
          this.fail = true;
          this.failMessage = res.message;
        }
      },
      (error) => {
        this.fail = true;
        this.failMessage = 'Server Error';
      }
    );
  }

  registerMessageId(id: string | null) {
    if (id) {
      this.messageId = id;
      this.deleteMessage();
    }
  }

  deleteMessage() {
    this.messagesService.deleteMessage(this.messageId).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.messagesService.getMessages().subscribe((res) => {
            if (res.status === 'success') {
              this.fail = false;
              this.messages = res.data.messages;
            } else {
              this.fail = true;
              this.failMessage = res.message;
            }
          });
        }
      },
      (error) => {
        this.fail = true;
        this.failMessage = 'Server Error';
      }
    );
  }
}
