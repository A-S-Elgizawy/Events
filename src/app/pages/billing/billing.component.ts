import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { EventService } from '../../events/event.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-billing',
  imports: [DatePipe,ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.css'
})
export class BillingComponent {
  
  public myform:any;


  bookingObj:any={
  "BookingId": 0,
  "UserId": 0,
  "EventId": 0,
  "NoOfTickets": 0,
  "EventBookingMembers": []

   }



   userLogged:any;
constructor(private route: ActivatedRoute,public router:Router) {
  const loggedData = localStorage.getItem(("user"))
  if(loggedData !== null){                                    // <=          
    this.userLogged = JSON.parse(loggedData)
    this.bookingObj.UserId = this.userLogged.userId;          // <= 
  }
}

  eventService=inject(EventService)
  EventId:any={}
ngOnInit() {
  const eventId = this.route.snapshot.paramMap.get('id');
    eventId && this.eventService.GetEventsById(Number(eventId)).subscribe((res: any) => {
    this.bookingObj.EventId = res.data.id || res.data.eventId;  // <= 
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

// =========
    this.router.events.subscribe((event)=>{
    if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
    }
  })
// =========
this.form()
}


   TickitAdult: number = Number(localStorage.getItem("ticketAdult")) || 0;
   TickitChild: number = Number(localStorage.getItem("ticketChild")) || 0;

   totaltickitpriceAdult:number = this.TickitAdult * 100
   totaltickitpriceChild:number = this.TickitChild * 50

   subtotalandtotal = this.totaltickitpriceAdult + this.totaltickitpriceChild


   form(){
     this.myform = new FormGroup({
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      city : new FormControl('',[Validators.required]),
      countery : new FormControl('',[Validators.required]),
      phone : new FormControl('',[Validators.required]),
      street : new FormControl('',[Validators.required]),
      company : new FormControl('',[Validators.required]),
     })
   }




   onSubmit(){
    this.myform.value
  if (this.myform.invalid) {
    alert('Please fill all required fields.');
    return;
  }

  localStorage.setItem("myform", JSON.stringify(this.myform.value));

  const date = new Date();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  const monthName = date.toLocaleString("en", { month: 'long' });

  const registerDate = `${monthName} ${day}-${month + 1}-${year}`;
  localStorage.setItem("registerDate", registerDate);
   }

   //  ===================add to cart=====================
   toggleAddToCart(event:any){
    if(this.IsAddedToCart(event)){
       this.eventService.RemoveFromCart(event)
    }else{
      this.eventService.AddToCart(event)
      // localStorage.setItem("Events",JSON.stringify(event))
    }
    this.eventService.Eventaddsubject.next(true)
   }

   IsAddedToCart(event:any) : boolean{
    return this.eventService.IsAddedToCart(event)
   }
   //  ===================add to cart=====================


   member: any = {
      "Name": "",
      "Age": 0,
      "IdentityCard": "",
      "CardNo": "",
      "ContactNo": ""
    }

   http = inject(HttpClient)


addmember(){
  const newob = JSON.stringify(this.member)
  const obj =JSON.parse(newob)
  this.bookingObj.EventBookingMembers.push(obj)
       
}

   onbooking(){
    debugger
    this.bookingObj.NoOfTickets = this.bookingObj.EventBookingMembers.length;
    this.http.post("/api/EventBooking/BookEvent", this.bookingObj).subscribe((res:any)=>{
      if(res.result){
        alert("Booking created successfully");
      } else {
        alert("Failed to create booking");
      }
   })
    }

}
