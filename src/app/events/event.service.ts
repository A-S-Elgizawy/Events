import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  Eventitems:any[]=[]
  public Eventaddsubject = new Subject<boolean>();
  
  constructor(private http:HttpClient) { }
  
  public search = new BehaviorSubject<string>('')
     private ApiUrl= 'http://localhost:3000/api/event'

   GetAllEvents():Observable <any>{
     return this.http.get(`${this.ApiUrl}`)
  }
   GetEventsById(id: number | null): Observable<any> {
      return this.http.get(`${this.ApiUrl}/${id}`);
      }

  //  APiUrl: string = '/api/EventBooking/';
  // APiUrl: string = 'https://freeapi.miniprojectideas.com/api/EventBooking/';

  //  GetAllEvents(){
  //    return this.http.get(`${this.APiUrl}GetAllEvents`)
  // }
  //  GetEventsById(id:number){
  //    return this.http.get(`${this.APiUrl}GetEventById?id=`+ id)
  // }
  //  GetEventsByOrganizer(id:number){
  //    return this.http.get<IEvent>(`${this.APiUrl}GetEventsByOrganizer?id=`+ id).pipe(
  //     map((item:any)=>{
  //     return item.data
  //    }))
  // }


  // ==============================================
// saveEvent(obj:any){
//   return this.http.post(`${this.APiUrl}CreateEvent`, obj);
// }

// updateproduct(obj:any){
//   return this.http.post(`${this.APiUrl}UpdateEvent`, obj);
// }

// deleteproduct(id:any){
//   return this.http.get(`${this.APiUrl}/DeleteEventById?id=` + id);
// }



// =======================================================
  IsAddedToCart(event:any):boolean{
    return this.Eventitems.some(item => item.eventId === event.eventId)
  }

  AddToCart(event:any):void{
    this.Eventitems.push(event)
    // alert('item added to the cart')
  }

  RemoveFromCart(event:any):void{
    const index=this.Eventitems.findIndex(item => item.eventId == event.eventId)
    if(index !== -1){
      this.Eventitems.splice(index,1)
      // alert('item remove from the cart')
    }
  }
  // getBookinbyCustomerId(id:number){
  //   return this.http.get(`${this.APiUrl}GetBookingsByCustomer?customerId` + id)
  // }
}
