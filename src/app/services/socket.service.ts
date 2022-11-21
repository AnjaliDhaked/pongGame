import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, map } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket!: Socket;

  constructor() {

  }

  init() {
    this.socket = io("https://ping-pong-iic.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] });
    this.socket.on("connect", this.onConnect.bind(this));
    this.socket.on('connect_error', this.onConnectError.bind(this));
    this.socket.on("disconnect", this.onDisconnect.bind(this));
  }

  onConnect() {
    console.log("Socket connected", this.socket.id);

  }

  onConnectError(err: any) {
    console.log('%cSocket Connect Error: ', 'color: red', { err });
  }

  onDisconnect(reason: any) {
    console.log("%cSocket disconnected", "%color:red", reason);

  }

}
