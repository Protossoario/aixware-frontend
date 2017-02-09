import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class GeocodeService extends GoogleMapsAPIWrapper {

  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  getAddress(latitude: number, longitude: number): Observable<any> {
    let geocoder = new google.maps.Geocoder;
    let latLng = new google.maps.LatLng(latitude, longitude);
    return Observable.create((observer: Observer<string>) => {
      geocoder.geocode({ 'location': latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          observer.next(results[0].formatted_address);
          observer.complete();
        } else {
          console.error('Error - ', results, ' & Status - ', status);
          observer.error(status);
        }
      });
    });
  }

}
