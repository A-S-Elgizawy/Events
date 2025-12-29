import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../events/event.service';
// import { IApiRespons, IEvent } from '../../model/model';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import Swiper from 'swiper';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
Swiper.use([Navigation,Keyboard,Mousewheel]);
@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit{

  eventService=inject(EventService)

  constructor(public router:Router){}
  ngAfterViewInit(): void {
    // this.swiper()
  }
  ngOnInit(): void {
    this.swiper()
    this.getAllEvents()
    this.changeimage()


  }
  EventList:any[]=[]

  getAllEvents(){
    this.eventService.GetAllEvents().subscribe((res:any)=>{
      this.EventList = res
      setTimeout(() => {
      this.swiper();
    }, 0);
     });
  }

  swiper(){
          var upcomingbox = new Swiper(".swiper", {
          spaceBetween:24,
          loop:true,
          grabCursor:true,
          keyboard: {
             enabled: true
         },
          //  mousewheel: {
          //    releaseOnEdges: true, 
          //    sensitivity: 1, 
          //    },
          navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          },
      
          breakpoints: {
              640: {
              slidesPerView: 1,
              spaceBetween: 20,
              },
              768: {
              slidesPerView: 2,
              spaceBetween: 15,
              },
              1000: {
              slidesPerView: 2,
              spaceBetween: 20,
              },
          },
      });
  }
  changeimage(){
    window.addEventListener('scroll', function() {
      const imageone =document.querySelector('.con1') as HTMLElement;
      const imagetwo =document.querySelector('.con2') as HTMLElement;
      const scrollTop = window.scrollY;
      if(scrollTop > 700){
        imageone.classList.remove('activeone');
        imagetwo.classList.add('activetwo');
      }else{
        imageone.classList.add('activeone');
        imagetwo.classList.remove('activetwo');
      }
    })
  }




}
