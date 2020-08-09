import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PusherService } from '../../service/pusher.service';

import { v4 } from 'uuid';
interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private http: HttpClient, private pusher: PusherService) { }
  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;

  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };
      console.log(data);
      this.http
        .post(`https://b2b.wownaturalfoods.com/api/chat/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing             messages. It also aids with styling of each message type
            type: 'outgoing',
          };
          this.messages = this.messages.concat(message);
          this.message = '';
        });

    }
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() { }

}
