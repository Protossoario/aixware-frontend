import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class GeocodeService extends GoogleMapsAPIWrapper {
  geocoder$ = new Subject<any>();

  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
    __loader.load().then(() => {
      let newGeocoder = new google.maps.Geocoder;
      this.geocoder$.next(newGeocoder);
    });
  }

  getAddress(latitude: number, longitude: number): Observable<any> {
    let address$ = new Subject;
    this.geocoder$.subscribe((geocoder: google.maps.Geocoder) => {
      let latLng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ 'location': latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          address$.next(results[0].formatted_address);
        } else {
          console.error('Error - ', results, ' & Status - ', status);
          address$.error(status);
        }
      });
    })
    return address$;
  }

}
