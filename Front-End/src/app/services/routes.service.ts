import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Route } from '../models/Route';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { RouteInfos } from '../models/RouteInfos';


@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(
    private axios: AxiosService,
    private http: HttpClient
  ) { }
  apiKey: String = "AIzaSyCIr5YaPilFb3H9ptOVJAiVZcJP_RPz8uY&libraries"
  mainRoute: Route[] = [];

  map!: google.maps.Map;

  options: google.maps.MapOptions = {
    zoom: 15,
    center: { lat: -18.924067, lng: -48.282142 }
  };

  getMainRoute(): Observable<Route[]> {
    const path = 'assets/positions.json';

    return this.http.get<{ data: any[] }>(path).pipe(
      map(response => response.data.map((position, index) => ({
        id: index + 1,
        latitude: position.latitude,
        longitude: position.longitude,
        date_time: position.date_time
      })))
    );
  }

  initializeMap(mapElementId: string): void {
    const mapElement = document.getElementById(mapElementId) as HTMLElement;
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, this.options);
    } else {
      console.error(`Element with id ${mapElementId} not found.`);
    }
  }

  renderMap(routes: Route[]): void {


    if (this.map && routes) {

      const routeCoordinates = routes.map(route => ({
        lat: parseFloat(route.latitude),
        lng: parseFloat(route.longitude)
      }));

      routeCoordinates.forEach((coordinate, index) => {
        const marker = new google.maps.Marker({
          position: coordinate,
          map: this.map,
          title: `Position ${index + 1}`
        });
      });

      const routePath = new google.maps.Polyline({
        path: routeCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      routePath.setMap(this.map);

      // Ajustar o centro e o zoom do mapa para a rota
      const bounds = new google.maps.LatLngBounds();
      routeCoordinates.forEach(coord => bounds.extend(coord));
      this.map.fitBounds(bounds);
    }
  }

  calculateTotalDistance(routes: Route[]): number {
    const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

    const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
      const R = 6371; // Raio da Terra em quilômetros
      const dLat = toRadians(lat2 - lat1);
      const dLng = toRadians(lng2 - lng1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    let totalDistance = 0;
    for (let i = 0; i < routes.length - 1; i++) {
      const { latitude: lat1, longitude: lng1 } = routes[i];
      const { latitude: lat2, longitude: lng2 } = routes[i + 1];
      totalDistance += haversineDistance(parseFloat(lat1), parseFloat(lng1), parseFloat(lat2), parseFloat(lng2));
    }
    return totalDistance;
  }

  getLocationData(lat: number, lng: number): Observable<any> {

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.status === 'OK') {
          const results = response.results[0];
          const locationData = {
            city: this.extractAddressComponent(results, 'locality'),
            neighborhood: this.extractAddressComponent(results, 'sublocality'),
            street: this.extractAddressComponent(results, 'route'),
            country: this.extractAddressComponent(results, 'country'),
            address: results.formatted_address
          };

          return locationData;
        } else {
          throw new Error('Geocoding API error');
        }
      })
    );
  }

  private extractAddressComponent(results: any, type: string): string {
    const component = results.address_components.find((c: any) => c.types.includes(type));
    return component ? component.long_name : '';
  }
  /*

  Erro de bloqueio de CORS

  getRouteDuration(originLat: number, originLng: number, destLat: number, destLng: number): Observable<number> {
    const origin = `${originLat},${originLng}`;
    const destination = `${destLat},${destLng}`;

    const url = 'https://maps.googleapis.com/maps/api/directions/json';
    const params = new HttpParams()
      .set('origin', origin)
      .set('destination', destination)
      .set('key', this.apiKey.toString());

    return this.http.get(url, { params }).pipe(
      map((response: any) => {
        if (response.status === 'OK' && response.routes.length > 0) {
          return response.routes[0].legs.reduce((totalDuration: number, leg: any) => {
            return totalDuration + leg.duration.value;
          }, 0);
        } else {
          throw new Error('Directions API error');
        }
      })
    );
  }

  */

  getInfosRoute(route: Route[]): any{
    const totalDistance = this.calculateTotalDistance(route);

    const startLat = parseFloat(route[0].latitude);
    const startLng = parseFloat(route[0].longitude);
    const endLat = parseFloat(route[route.length - 1].latitude);
    const endLng = parseFloat(route[route.length - 1].longitude);


    const startPoint$ = this.getLocationData(startLat, startLng);
    const endPoint$ = this.getLocationData(endLat, endLng);



    return forkJoin([startPoint$, endPoint$, ]).pipe(
      map(([startingPoint, endPoint]) => ({
        starting_point: startingPoint,
        end_point: endPoint,
        total_distance: totalDistance,
        total_route_points: route.length,
        total_time: null // Add the missing property 'total_time'
      }))
    );

  }

}
