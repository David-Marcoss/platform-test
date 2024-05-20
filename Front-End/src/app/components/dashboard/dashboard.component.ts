import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/routes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  routeMap: any;

  constructor(private routeService: RoutesService) {}

  ngOnInit(): void {
    this.routeService.getMainRoute().subscribe(data => {
      this.routeMap = data;
    })
  }

}
