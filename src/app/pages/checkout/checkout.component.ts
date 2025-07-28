import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EventService } from '../../events/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [DatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  constructor(private route: ActivatedRoute ,public router:Router) {}

    eventService=inject(EventService)
     EventId:any={}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    eventId && this.eventService.GetEventsById(Number(eventId)).subscribe((res: any) => {
  const event = res.data;
  if (event.startDate) {
    let dateObj: Date;
    if (/^\d{2}-\d{2}-\d{4}$/.test(event.startDate)) {
      const [day, month, year] = event.startDate.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(event.startDate);
    }
    event.startmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
    event.startmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  }
  if (event.endDate) {
    let dateObj: Date;
    if (/^\d{2}-\d{2}-\d{4}$/.test(event.endDate)) {
      const [day, month, year] = event.endDate.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      dateObj = new Date(event.endDate);
    }
    event.endmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
    event.endmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  } else {
    event.monthNumber = '';
    event.monthName = '';
  }
  this.EventId = event;
});

// ===========
    this.router.events.subscribe((event)=>{
    if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
    }
  })
  }

   TickitAdult: number = Number(localStorage.getItem("ticketAdult")) || 0;
   TickitChild: number = Number(localStorage.getItem("ticketChild")) || 0;

   totaltickitpriceAdult:number = this.TickitAdult * 100
   totaltickitpriceChild:number = this.TickitChild * 50

   subtotalandtotal = this.totaltickitpriceAdult + this.totaltickitpriceChild

   myform: any = (() => {
     const form = localStorage.getItem('myform');
     return form ? JSON.parse(form) : '';
   })()

  registerDate:any = localStorage.getItem('registerDate')
  
  
}
