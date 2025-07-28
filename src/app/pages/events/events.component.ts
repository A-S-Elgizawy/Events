import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../model/model';
import { EventService } from '../../events/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule,FormsModule,FilterPipe,RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  public searchTerm: string = '';
  searchKey:string='';


    constructor(public router:Router){}
  ngOnInit(): void {
    this.getAllEvents()
  this.router.events.subscribe((event)=>{
    if(event  instanceof NavigationEnd){
      window.scrollTo(0,0)
    }
  })

  }

  eventService=inject(EventService)
  EventList:IEvent[]=[]
  FilterEvents:IEvent[]=[]
    getAllEvents(){
    this.eventService.GetAllEvents().subscribe((res:any)=>{
      this.EventList = res.data.map((event: any) => {
  if (event.startDate) {
    // Handles "dd-MM-yyyy" format
    let dateObj: Date;
    if (/^\d{2}-\d{2}-\d{4}$/.test(event.startDate)) {
      const [day, month, year] = event.startDate.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      // Handles ISO or other formats
      dateObj = new Date(event.startDate);
    }
    event.startmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
    event.startmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  }
  if(event.endDate){
    // Handles "dd-MM-yyyy" format
    let dateObj: Date;
    if (/^\d{2}-\d{2}-\d{4}$/.test(event.endDate)) {
      const [day, month, year] = event.endDate.split('-').map(Number);
      dateObj = new Date(year, month - 1, day);
    } else {
      // Handles ISO or other formats
      dateObj = new Date(event.endDate);
    }
    event.endmonthNumber = isNaN(dateObj.getTime()) ? '' : (dateObj.getMonth() + 1);
    event.endmonthName = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleString('default', { month: 'long' });
  }
   else {
    event.monthNumber = '';
    event.monthName = '';
  }
  return event;
});
this.FilterEvents=this.EventList
    })
  }

    search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value
    this.eventService.search.next(this.searchTerm)
    }





    toggleAddToCart(event:any){
    if(this.IsAddedToCart(event)){
       this.eventService.RemoveFromCart(event)
    }else{
      this.eventService.AddToCart(event)
    }
    this.eventService.Eventaddsubject.next(true)
   }

   IsAddedToCart(event:any) : boolean{
    return this.eventService.IsAddedToCart(event)
   }
}
