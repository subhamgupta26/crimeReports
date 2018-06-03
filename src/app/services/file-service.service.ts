import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class FileServiceService {

  constructor(private http: Http) { }

    public getJSON(): Observable<any> {
         return this.http.get("./assets/incidentsData.json")
                         .map((res:any) => res.json())

     }

}
