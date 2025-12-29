import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../events/event.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mybooking',
  imports: [CommonModule],
  templateUrl: './mybooking.component.html',
  styleUrl: './mybooking.component.css'
})
export class MybookingComponent implements OnInit{

  SavedEvents:any[]=[]
  Events:any[]=[]
  booking:any[]=[]
constructor(public router:Router){}
    ngOnInit(): void {
    this.Events = this.eventService.Eventitems.slice()
  // Only overwrite localStorage if there are new events
  // if (this.SavedEvents.length > 0) {
  //   localStorage.setItem("Events", JSON.stringify(this.SavedEvents));
  // }

  // Always load from localStorage
  // this.Events = JSON.parse(localStorage.getItem("Events") || "[]"); 

    this.emptycart()
    this.router.events.subscribe((event)=>{
    if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
    }
  })
  }

  emptycart(){
    const emptycart = document.querySelector(".empty");
    if(this.Events.length > 0) {
      console.log("cart products",this.Events.length);
      
      if (emptycart) {
        emptycart.classList.add("active");
      }
    }else{
      if (emptycart) {
        emptycart.classList.remove("active");
      }
    }
  }

  eventService=inject(EventService)

//   getbookingbycustomer(){
//     this.eventService.getBookinbyCustomerId(this.Events[0].userId).subscribe((res:any)=>{
//       this.booking = res.data;
//   })
// }
}


