import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Message } from "../models/message.model";
import { UserService } from "../../core/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  message = this.socket.fromEvent<Message, 'chat:receiveMessage'>('chat:receiveMessage');
  systemNotification = this.socket.fromEvent<string, 'chat:systemNotification'>('chat:systemNotification');

  constructor(private readonly socket: Socket, private readonly userService: UserService) {
  }

  connect() {
    return this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  joinChat(roomId: string) {
    this.socket.emit('chat:join', roomId, this.userService.user().id);
  }

  sendMessage(roomId: string, value: string) {
    this.socket.emit('chat:sendMessage', roomId, this.userService.user().id, value);
  }
}
