import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  // its important myCanvas matches the variable name in the template
  @ViewChild('myCanvas')
  myCanvas!: ElementRef<HTMLCanvasElement>;
  context: any = CanvasRenderingContext2D;
  ball: any;
  gameUser: any;
  computer: any;
  dottedLine: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.ball = {
      x: this.myCanvas.nativeElement.width / 2,
      y: this.myCanvas.nativeElement.height / 2,
      radius: 10,
      velocityX: 5,
      velocityY: 5,
      speed: 7,
      color: "black"
    }

    this.gameUser = {
      x: 0,
      y: (this.myCanvas.nativeElement.height - 100) / 10,
      width: 10,
      height: 100,
      score: 0,
      color: "GREEN"
    }

    this.computer = {
      x: this.myCanvas.nativeElement.width - 10,
      y: (this.myCanvas.nativeElement.height - 100) / 2,
      width: 30,
      height: 100,
      score: 0,
      color: "brown"
    }

    this.dottedLine = {
      x: (this.myCanvas.nativeElement.width - 2) / 2,
      y: 0,
      height: 10,
      width: 2,
      color: "YELLOW"
    }
    this.startPong();
    setInterval(() => { this.startPong() }, 1000 / 50);

  }
  startPong() {
    this.updatee();
    this.startUI();
  }


  reactangle(x: any, y: any, w: any, h: any, color: any) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, w, h);
  }

  arc(x: any, y: any, r: any, color: any) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, r, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();
  }

  mouseMovement(e: any) {

    this.mouseDirection(e);
  }
  mouseDirection(evt: any) {
    let rect = this.myCanvas.nativeElement.getBoundingClientRect();

    this.gameUser.y = evt.clientY - rect.top - this.gameUser.height / 2;
  }


  ballDirectionReset() {
    this.ball.x = this.myCanvas.nativeElement.width / 2;
    this.ball.y = this.myCanvas.nativeElement.height / 2;
    this.ball.velocityX = -this.ball.velocityX;
    this.ball.speed = 7;
  }


  dottedNet() {
    for (let i = 0; i <= this.myCanvas.nativeElement.height; i += 15) {
      this.reactangle(this.dottedLine.x, this.dottedLine.y + i, this.dottedLine.width, this.dottedLine.height, this.dottedLine.color);
    }
  }


  drawText(text: any, x: any, y: any) {
    this.context.fillStyle = "blue";
    this.context.font = "35px bold";
    this.context.fillText(text, x, y);
  }

  collision(b: any, p: any) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
  }

  updatee() {

    if (this.ball.x - this.ball.radius < 0) {
      this.gameUser.score++;

      this.ballDirectionReset();
    } else if (this.ball.x + this.ball.radius > this.myCanvas.nativeElement.width) {
      this.computer.score++;

      this.ballDirectionReset();
    }
    if (this.gameUser.score == 10) {
      // alert("You Lost The startPong");
      // this.gameUser.score = 0
      // window.location.reload();
    }

    if (this.computer.score == 10) {
      // this.computer.score = 0
      // alert("You Lost The startPong");
      // window.location.reload();
    }

    this.ball.x += this.ball.velocityX;
    this.ball.y += this.ball.velocityY;


    this.computer.y += ((this.ball.y - (this.computer.y + this.computer.height / 2))) * 0.1;

    if (this.ball.y - this.ball.radius < 0 || this.ball.y + this.ball.radius > this.myCanvas.nativeElement.height) {
      this.ball.velocityY = -this.ball.velocityY;

    }

    let player = (this.ball.x + this.ball.radius < this.myCanvas.nativeElement.width / 2) ? this.gameUser : this.computer;

    if (this.collision(this.ball, player)) {
      let collidePoint = (this.ball.y - (player.y + player.height / 2));
      collidePoint = collidePoint / (player.height / 2);
      let angleRad = (Math.PI / 4) * collidePoint;
      let direction = (this.ball.x + this.ball.radius < this.myCanvas.nativeElement.width / 2) ? 1 : -1;
      this.ball.velocityX = direction * this.ball.speed * Math.cos(angleRad);
      this.ball.velocityY = this.ball.speed * Math.sin(angleRad);
      this.ball.speed += 0.1;
    }
  }

  startUI() {
    this.reactangle(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height, "lightBlue");
    this.drawText(this.gameUser.score, this.myCanvas.nativeElement.width / 3, this.myCanvas.nativeElement.height / 5);
    this.drawText(this.computer.score, 3 * this.myCanvas.nativeElement.width / 4, this.myCanvas.nativeElement.height / 5);
    this.dottedNet();
    this.reactangle(this.gameUser.x, this.gameUser.y, this.gameUser.width, this.gameUser.height, this.gameUser.color);
    this.reactangle(this.computer.x, this.computer.y, this.computer.width, this.computer.height, this.computer.color);
    this.arc(this.ball.x, this.ball.y, this.ball.radius, this.ball.color);
  }


}
