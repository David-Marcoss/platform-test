import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalRoutes: number = 10;
  totalDestinations: number = 272;
  activeUsers: number = 11;

  options: google.maps.MapOptions = {
    zoom: 15,
    center: {lat: -18.924067, lng: -48.282142}
  };

  map!: google.maps.Map;

  constructor() {}

}
