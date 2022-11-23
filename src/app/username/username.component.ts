import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  userName: any;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.userName = prompt("Enter the player's name");
    this.router.navigate(['/qr']);
  }
}
