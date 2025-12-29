import { Component, inject, OnInit } from '@angular/core';
// import { IEvent } from '../../model/model';
import { EventService } from '../../events/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-events',
  imports: [CommonModule,FormsModule,FilterPipe,RouterLink,ScrollingModule],
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
  EventList:any[]=[]
  FilterEvents:any[]=[]
    getAllEvents(){
    this.eventService.GetAllEvents().subscribe((res:any)=>{
      this.EventList = res
      console.log(this.EventList);
      
      this.FilterEvents=this.EventList
});
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
