import { Component } from '@angular/core';
import { RouteApiService } from '../../../services/route-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteData } from '../../../models/RouteData';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrl: './view-map.component.css'
})
export class ViewMapComponent {

  constructor(
    private routeApiService: RouteApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){ }

  routeMap: RouteData | undefined;
  id: number | undefined;

  async ngOnInit(){
    this.getId();

    if (this.id) {
      const routeData = await this.routeApiService.getRoutesById(this.id);

      this.routeMap = routeData.points;
    }
  }

  getId(){
    this.activatedRoute.params.subscribe(paramsId => {
      const id = paramsId['id'];

      if(id){
        this.id = id;

      }else{
        this.router.navigate(['/routes']);
      }
    });
  }

}

