import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './pages/about/about.component';
import { EventsComponent } from './pages/events/events.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BillingComponent } from './pages/billing/billing.component';
import { MybookingComponent } from './pages/mybooking/mybooking.component';

export const routes: Routes = [


    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent,
    },
    {
        path:'event-details/:id',
        component:EventDetailsComponent,
    },
    { 
        path: 'event-details',
         component: EventDetailsComponent 
    },
    { 
        path: 'create-event',
         component: CreateEventComponent 
    },
    { 
        path: 'contact',
         component: ContactComponent 
    },
    { 
        path: 'services',
         component: ServicesComponent 
    },
    { 
        path: 'about',
         component: AboutComponent 
    },
    { 
        path: 'events',
         component: EventsComponent 
    },
    { 
        path: 'billing/:eventId',
         component: BillingComponent 
    },
    { 
        path: 'checkout/:eventId',
         component: CheckoutComponent 
    },
    { 
        path: 'mybooking',
         component: MybookingComponent 
    },
];
