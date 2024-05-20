import { AfterViewInit, Component, Input} from '@angular/core';


import { RoutesService } from '../../services/routes.service';


@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrl: './map-route.component.css'
})

export class MapRouteComponent implements AfterViewInit{

  options: google.maps.MapOptions = {
    zoom: 15,
    center: {lat: -18.924067, lng: -48.282142}
  };

  map!: google.maps.Map;

  routeInfos: {} | any;

  @Input() mainRoute: any;

  constructor(private routeService: RoutesService){}

  ngAfterViewInit(): void {

    this.routeService.initializeMap('map');
    this.routeService.renderMap(this.mainRoute);

    this.routeService.getInfosRoute(this.mainRoute).subscribe((data: any) => {
      this.routeInfos = data;
    });

  }



}
