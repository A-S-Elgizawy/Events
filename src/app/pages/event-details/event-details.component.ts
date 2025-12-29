import { AfterViewChecked, AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../events/event.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule,DatePipe,RouterLink],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit ,AfterViewInit{


  eventService=inject(EventService)
  activatedRoute=inject(ActivatedRoute)
  EventData$:Observable<any> = new Observable<any>
  Event$:Observable<any[]> = new Observable<any[]>
  event:any={}
constructor(public router:Router){

}

  getEventId(){
    const EventId = this.activatedRoute.snapshot.paramMap.get('id')
    EventId && this.eventService.GetEventsById(Number(EventId)).subscribe((res: any) => {
    this.event = res

  // if (event.startDate) {
  //   let dateObj: Date;
  //   if (/^\d{2}-\d{2}-\d{4}$/.test(event.startDate)) {
  //     const [day, month, year] = event.startDate.split('-').map(Number);
  //     dateObj = new Date(year, month - 1, day);
  //   } else {
  //     dateObj = new Date(event.startDate);
  //   }
  //   event.startmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
  //   event.startmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  // }
  // if (event.endDate) {
  //   let dateObj: Date;
  //   if (/^\d{2}-\d{2}-\d{4}$/.test(event.endDate)) {
  //     const [day, month, year] = event.endDate.split('-').map(Number);
  //     dateObj = new Date(year, month - 1, day);
  //   } else {
  //     dateObj = new Date(event.endDate);
  //   }
  //   event.endmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
  //   event.endmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  // } else {
  //   event.monthNumber = '';
  //   event.monthName = '';
  // }
});
    
  }

  ngAfterViewInit(): void {
    // this.js()
  }


  // Ticket counters
  ticketAdult: number = 0;
  ticketChild: number = 0;

  // Prices
  priceAdult: number = 100;
  priceChild: number = 50;


  ngOnInit(): void {
  // const Event =  this.activatedRoute.snapshot.paramMap.get('id')
  // Event && this.eventService.GetEventsById(Number(Event)).subscribe((res:any)=>{
  //   this.EventData$ = res.data
  // })
    // this.js()
    this.router.events.subscribe((event)=>{
    if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
    }
  })
    this.getEventId()


    // ======================
    const savedAdult = localStorage.getItem('ticketAdult');
    const savedChild = localStorage.getItem('ticketChild');
    if (savedAdult) this.ticketAdult = Number(localStorage.getItem('ticketAdult'));
    if (savedChild) this.ticketChild = +savedChild;

    const EventId = this.activatedRoute.snapshot.paramMap.get('id');
    if (EventId) {
      this.eventService.GetEventsById(Number(EventId)).subscribe((res: any) => {
        this.event = res;
      });
    }
  }

  js(){
const quantityAdult = document.querySelector(".quantity")  as HTMLElement
const minus = document.querySelectorAll('.minus');
const number = document.querySelectorAll('.number');
const plus = document.querySelectorAll('.plus');
const QuaAdult = document.querySelector('.quantityAdult');
const QuaChild = document.querySelector('.quantityChild');
const TotalQuantity = document.querySelector('.quantitynumber');
const TotalMon = document.querySelector('.Totalnumber');

number[0].innerHTML = localStorage.getItem("ticketAdult") || '00'
console.log(minus);
console.log(plus);
console.log(number);
console.log(quantityAdult);


    let quantitynumberone = 0
    let quantitynumbertwo = 0
    quantitynumberone = Number(localStorage.getItem("ticketAdult")) || 0
    function minusfun(){
      minus.forEach((element,index) => {
        element?.addEventListener("click", () => {
          if(index == 0){
            if (quantitynumberone > 0) {
            quantitynumberone--;
            localStorage.setItem("ticketAdult",JSON.stringify(quantitynumberone))
              number[index].innerHTML = localStorage.getItem("ticketAdult") ?? "0"
              QuanAdulFun()
              totalQua()
          }
          }else{
            if (quantitynumbertwo > 0) {
            quantitynumbertwo--;
              number[index].innerHTML = quantitynumbertwo.toString()
              QuanChildFun()
              totalQua()
          }
          }
        });
      });

    }
    minusfun()

    function plusfun(){
        plus.forEach((element,index) => {
        element?.addEventListener("click", () => {
          if(index == 0){
            quantitynumberone++;
            localStorage.setItem("ticketAdult",JSON.stringify(quantitynumberone))
            number[index].innerHTML = localStorage.getItem("ticketAdult") || "00"
            QuanAdulFun()
            totalQua()
          }else{
            quantitynumbertwo++;
            number[index].innerHTML = quantitynumbertwo.toString()
            QuanChildFun()
            totalQua()
          }
        });
      });
    }
    plusfun()

    let totalAdul = 0
    function QuanAdulFun(){
       totalAdul= 100 * quantitynumberone
      if (QuaAdult) {
        QuaAdult.innerHTML = `$${totalAdul}.00`;
      }
      TotalMony()
    }

    let totalChil = 0
    function QuanChildFun(){
       totalChil= 50 * quantitynumbertwo
      if (QuaChild) {
        QuaChild.innerHTML = `$${totalChil}.00`;
      }
      TotalMony()
    }

    function totalQua(){
      let totalQ = Number(quantitynumberone) + Number(quantitynumbertwo)
      if(TotalQuantity){
        TotalQuantity.innerHTML= totalQ.toString()
      }
    }

    function TotalMony(){
      let totalmony = Number(totalAdul) + Number(totalChil)
      if(TotalMon){
        TotalMon.innerHTML = `$${totalmony}.00`
      }
    }
    
  }

   

    increaseAdult() {
      this.ticketAdult++;
      localStorage.setItem('ticketAdult', this.ticketAdult.toString());
  }
   
      decreaseAdult() {
    if (this.ticketAdult > 0) {
      this.ticketAdult--;
      localStorage.setItem('ticketAdult', this.ticketAdult.toString());
    }
  }

  increaseChild() {
    this.ticketChild++;
    localStorage.setItem('ticketChild', this.ticketChild.toString());
  }

  decreaseChild() {
    if (this.ticketChild > 0) {
      this.ticketChild--;
      localStorage.setItem('ticketChild', this.ticketChild.toString()); 
    }
  }

  

  get totalAdultPrice() {
    return this.ticketAdult * this.priceAdult;
  }

  get totalChildPrice() {
    return this.ticketChild * this.priceChild;
  }

  get totalTickets() {
    return this.ticketAdult + this.ticketChild;
  }

  get totalPrice() {
    return this.totalAdultPrice + this.totalChildPrice;
  }

}
