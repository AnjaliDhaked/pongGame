import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'pong';
  // socket!: Socket;..

  constructor(private socketService: SocketService,     
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }
  ngOnInit(): void{
    setTimeout(async () => {
      this.socketService.init();
    }, 1000);
  }
  
}
