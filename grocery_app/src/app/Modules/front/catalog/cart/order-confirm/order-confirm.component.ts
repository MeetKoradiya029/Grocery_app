import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit{

  constructor(private router:Router){

  }

  ngOnInit(){
      setTimeout(()=>{
        this.router.navigate([''])
      },6000)
  }
}
