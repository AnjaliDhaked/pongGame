import { Component, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  playerSelected: boolean = false;
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';
  socket!: Socket;
  roomId: any;
  constructor(private router: Router) {
    this.socket = io("http://localhost:3000/");
    console.log(this.router, window.location.href);

    this.value = `${window.location.href}player`;
  }

  ngOnInit(): void {
    this.createRoomId();
  }

  createRoomId() {
    this.socket.on('connect', () => { });
    this.socket.emit('create-group', '11111');
    this.socket.on('group-created', (roomId) => {
      console.log(roomId);
      this.roomId = roomId.id;
    });

    this.socket.emit('join-group', this.roomId);
  }
}
