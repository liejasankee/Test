import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {


  constructor() {
    var pusher = new Pusher('8551c9e8d9ff1af9b206', {
      cluster: 'ap2'

    });
    this.channel = pusher.subscribe('chat');
  }
  channel;

  public init() {
    return this.channel;
  }
}
