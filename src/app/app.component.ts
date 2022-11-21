import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'pong';
  socket!: Socket;


  constructor() {

  }
  ngOnInit() {
    this.socket = io('http://localhost:3000');
    this.socket.on("connect", () => {
      console.log("connect", this.socket); // true
    });
  }

}
