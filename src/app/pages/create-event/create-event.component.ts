import { Component } from '@angular/core';
import { EventService } from '../../events/event.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  issidepanalvisible:boolean=false;

  opensidepanal(){
    this.issidepanalvisible=true;
  }
  closesidepanal(){
    this.issidepanalvisible=false;
  }

  eventObj:any={
  "eventId": 0,
  "eventName": "",
  "description": "",
  "location": "",
  "startDate": "",
  "startTime": "",
  "endDate": "",
  "endTime": "",
  "imageUrl": "",
  "capacity": "",
  "price": 0,
  "organizerId": 0,
  "isIdentityMandatory": false,
  "isCoupleEntryMandatory": false
  };


 
  categoryList: any [] = []; // add
  EventList: any [] = []; // add

  constructor(private productSrv: EventService) { }  // add



  ngOnInit(): void {  
    // this.GetAllEvents();
   }




  // GetAllEvents(){ 
  //   this.productSrv.GetAllEvents().subscribe((res:any)=>{ 
  //     this.EventList=res.data;
  //   })
  // };

  // onupdate() {
  //     if (this.eventObj.startDate && this.eventObj.startDate.length === 10) {
  //   this.eventObj.startDate += "T00:00:00";
  // }
  // if (this.eventObj.endDate && this.eventObj.endDate.length === 10) {
  //   this.eventObj.endDate += "T00:00:00";
  // }
  //   // debugger
  //   console.log('Payload being sent:', this.eventObj); // Debugging
  //   this.productSrv.updateproduct(this.eventObj).subscribe((res: any) => {
  //     if (res.result) {
  //       alert('Product updated');
  //       this.GetAllEvents(); // Refresh the product list
  //     } else {
  //       alert(res.message);
  //     }
  //   });
  // }

  // onupdate(){
  //   this.productSrv.updateproduct(this.eventObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert("product updated");
  //       this.GetAllEvents();
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }
  //  onupdate() {
  //   // Format dates as required by the API
  //   if (this.eventObj.startDate && this.eventObj.startDate.length === 10) {
  //     this.eventObj.startDate += 'T00:00:00';
  //   }
  //   if (this.eventObj.endDate && this.eventObj.endDate.length === 10) {
  //     this.eventObj.endDate += 'T00:00:00';
  //   }

  //   // If eventId is 0, create; else, update
  //   if (this.eventObj.eventId === 0) {
  //     this.productSrv.updateproduct(this.eventObj).subscribe(
  //       (res: any) => {
  //         alert('Event created!');
  //         this.closesidepanal();
  //       },
  //       (err) => {
  //         alert('Error: ' + (err.error?.message || err.message));
  //       }
  //     );
  //   } else {
  //     this.productSrv.updateproduct(this.eventObj).subscribe(
  //       (res: any) => {
  //         if (res.result) {
  //                       alert('Event updated!');
  //           this.closesidepanal();
  //         } else {
  //           alert(res.message);
  //         }
  //       },
  //       (err) => {
  //         alert('Error: ' + (err.error?.message || err.message));
  //       }
  //     );
  //   }
  // }

  // onSave(){
  //   this.productSrv.saveEvent(this.eventObj).subscribe((res:any)=>{
  //     if(res.result){
  //       alert("product created");
  //       this.GetAllEvents();
  //       // this.GetAllEventstempo();
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }


  // onIdit(item:any){
  //   this.eventObj=item;
  //   this.opensidepanal()
  // }

  // ondelete(item: any){
  //   const isdelete = confirm("are you sure");
  //   if(isdelete){
  //     this.productSrv.deleteproduct(item.eventId).subscribe((res:any)=>{
  //       if(res.result){
  //         alert("product deleted");
  //         this.GetAllEvents();
  //       }else{
  //         alert(res.message)
  //       }
  //     })
  //   }
  // }


}
