import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { EventService } from './events/event.service';
import { HttpClient } from '@angular/common/http';
import { login, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , AfterViewInit{
  ngAfterViewInit(): void {
   this.up()
   this.togglenavebar()
  }
  title = 'moviesapp';

constructor(private router:Router){
  this.eventservice.Eventaddsubject.subscribe((res:any)=>{
      this.getEvents()
  })

  const loggedData = localStorage.getItem(("user"))
  if(loggedData !== null){                                    // <=          
    this.userLogged = JSON.parse(loggedData)
  }
}

    Events:any[]=[]
    getEvents() {
    this.Events = this.eventservice.Eventitems.slice();
  }

activeColorContainer(){
  const arrow = document.querySelector('.arrow') as HTMLElement;
  const color = document.querySelector('.color') as HTMLElement;
  arrow.addEventListener('click',()=>{
     color.classList.toggle('active')
     setTimeout(() => {
      arrow.classList.toggle('active')
     }, 500);
  })
   const colormutal = document.querySelectorAll('.mutaul') as NodeListOf<HTMLElement>;
   colormutal.forEach((item,index)=>{
    item.addEventListener('click',()=>{
      colormutal.forEach((item)=>{
        item.classList.remove('active')
      })
      item.classList.add('active')
      window.localStorage.setItem('activeColor', [index].toString())
    })
   })
colormutal[parseInt(window.localStorage.getItem('activeColor') || '0')].classList.add('active')

  
setInterval(() => {
  nimateArrow()
}, 6000)

function nimateArrow(){
  const arrow = document.querySelector('.arrow') as HTMLElement;
  // const arrowup = document.querySelector('.up') as HTMLElement;
  arrow.classList.add('toright')
  // arrowup.classList.add('active')

  setTimeout(() => {
    arrow.classList.remove('toright')
    // arrowup.classList.remove('active')
  }, 3400);
}

   color.addEventListener('click',(event)=>{
    let primary= undefined;
     if((event.target as HTMLElement).classList.contains('color1')){
      const root = document.documentElement;
      root.style.setProperty('--primary-color', 'rgb(214, 18, 18)');
      savecolor()
     }
     if((event.target as HTMLElement).classList.contains('color2')){
      const root = document.documentElement;
      root.style.setProperty('--primary-color', 'rgb(0, 183, 255)');
      savecolor()
     }
     if((event.target as HTMLElement).classList.contains('color3')){
      const root = document.documentElement;
      root.style.setProperty('--primary-color', '#063970');
      savecolor()
     }
     if((event.target as HTMLElement).classList.contains('color4')){
      const root = document.documentElement;
      root.style.setProperty('--primary-color', '#e28743');
      savecolor()
     }
   })
  function savecolor(){
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
    localStorage.setItem('primary-color', primaryColor.trim());
   }
   const root = document.documentElement;
   root.style.setProperty('--primary-color',localStorage.getItem('primary-color'));
   }
activeloginRegiter(){
  const login = document.querySelector('.LogIn') as HTMLElement;
  const register = document.querySelector('.Register') as HTMLElement;
  const loginbtn = document.querySelector('.loginbtn') as HTMLElement;
  const registerbtn = document.querySelector('.regiterbtn') as HTMLElement;
  const logReg = document.querySelector('.logReg') as HTMLElement;

}
up(){
const upbtnel=document.querySelector(".up");
window.onscroll=function(){
    if(window.scrollY > 600){
        if (upbtnel) {
            // (upbtnel as HTMLElement).style.display = "flex";
            upbtnel.classList.add('active')
        }
    }else{
      if (upbtnel) {
        // (upbtnel as HTMLElement).style.display = "none";
        upbtnel.classList.remove('active')
    }
    }
if (upbtnel) {
upbtnel.addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})
}
  }
        window.addEventListener("scroll", () => {
        const upbtnel=document.querySelector(".up");
        const scrollTop = window.scrollY; // Current vertical scroll position
        const scrollHeight = document.documentElement.scrollHeight; // Total scrollable height
        const clientHeight = document.documentElement.clientHeight; // Viewport height
        const totalScrollable = scrollHeight - clientHeight; // Total scrollable distance
      
        // Calculate the percentage scrolled
        const scrollPercent = (scrollTop / totalScrollable) * 100;
        
        // Update the progress bar or any element using the percentage
        if (upbtnel) {
          (upbtnel as HTMLElement).style.setProperty("--progress", `${scrollPercent.toFixed(2)}%`);
        }
      });
    } 
togglenavebar(){
   const menu =document.querySelector(".menu")
   const navbar =document.querySelector("header nav ul")
   menu?.addEventListener("click",()=>{
      navbar?.classList.toggle("active")
      console.log("yes"); 
      blurnav()
   })

   function blurnav(){
      const body = document.querySelector("body")
      body?.addEventListener("click",(event)=>{
         if((event.target as HTMLElement).className != "fa-solid fa-bars-staggered menu"){
          navbar?.classList.add("active")
         }
      })
   }

   window.addEventListener("scroll",()=>{
    if(window.scrollY){
      navbar?.classList.add("active")
    }
   })

   const links =document.querySelectorAll(".link")
   links.forEach(link=>{
      link.addEventListener("click",()=>{
        navbar?.classList.add("active")
      })
   })

}

  @ViewChild('Model')Model!:ElementRef
   islogged:boolean=false
   


   ngOnInit():void{
  this.activeColorContainer()
  this.activeloginRegiter()
  this.up()

    this.router.events.subscribe((event)=>{
    if(event instanceof NavigationEnd){
       window.scrollTo(0,0)
    }
  })
  }

  logout(){
    localStorage.removeItem("user")
    this.userLogged = undefined
  }

  openModel(){
    this.Model.nativeElement.style.display = 'block'
  }
  closeModel(){
    this.Model.nativeElement.style.display = 'none'
  }

  userObj: User={
  "userId": 0,
  "name": "",
  "email": "",
  "password": "",
  "contactNo": "",
  "role": ""
  }

  // userObj:User=new User()
  userLogged:any;

  eventservice=inject(EventService)
  http=inject(HttpClient)
  onRegister(){
    this.http.post("/api/EventBooking/CreateUser",this.userObj).subscribe((res:any)=>{
       if(res.result){
        alert("creat successfully")
        this.closeModel()
       }
    })
  }

  loginObj:login={
  "password": "",
  "contactNo": ""
  }
  onLogIn(){
    this.http.post("/api/EventBooking/Login",this.loginObj).subscribe((res:any)=>{
       if(res.result){
        alert("Login successfully")
        this.closeModel()
        localStorage.setItem("user",JSON.stringify(res.data))
        this.userLogged=res.data
       }
    })
  }



}

