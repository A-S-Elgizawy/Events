import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const name = 'hossam ghalib elgizawy'
    const fisrtName = name.slice(0,6)
    const secondName = name.slice(6,13)
    console.log(` ${fisrtName}`); // Hello hossa
    console.log(` ${secondName}`); // Hello hossa


    
  }

  name:string = 'hossam ghalib elgizawy';
  firstName:string = this.name.slice(0, 6);
  secondName:string = this.name.slice(6, 13);




}
