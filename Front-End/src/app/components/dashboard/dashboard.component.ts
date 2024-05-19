import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';
import { Route } from '../../models/Route';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent  implements OnInit, AfterViewInit{
  totalRoutes: number = 10;
  totalDestinations: number = 272;
  activeUsers: number = 11;


  options: google.maps.MapOptions = {
    zoom: 15,
    center: {lat: -18.924067, lng: -48.282142}
  };

  map!: google.maps.Map;

  mainRoute: Route[] | undefined;
  routeInfos: {} | any;

  constructor(private routeService: RoutesService) {}

  ngOnInit(): void {
    this.routeService.getMainRoute().subscribe(data => {
      this.mainRoute = data;
      if (this.mainRoute) {
        this.routeService.renderMap(this.mainRoute);
      }

      this.routeService.getInfosRoute(this.mainRoute).subscribe((data: any) => {
        this.routeInfos = data;
        console.log(this.routeInfos);
        console.log(this.routeInfos.starting_point);
      });

    });
  }

  ngAfterViewInit(): void {
    this.routeService.initializeMap('map');
  }



}
