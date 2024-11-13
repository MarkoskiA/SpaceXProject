import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceXData, SpaceXDataDetails } from '../models/models';
import { SpaceXApiType } from '../models/enums';

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {

  public httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'});
  public url: string = 'https://localhost:7255/space-x/';

  constructor(private http: HttpClient) { }

  public getSpaceXLaunches(value: SpaceXApiType): Observable<SpaceXData[] | SpaceXData> {
    return this.http.get<SpaceXData[] | SpaceXData>(this.url+value);
  }

  public getSpaceXLaunchDetails(id: string): Observable<SpaceXDataDetails>{
    return this.http.get<SpaceXDataDetails>(this.url+id)
  }
}
