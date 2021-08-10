import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Country } from './country';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class CountryService {

    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getCountry(): Observable<Country[]>{
        return this.http.get<Country[]>(`${this.apiServerUrl}/api/v2/all`);
    }

    public addCountry(country: Country): Observable<Country>{
      return this.http.post<Country>(`${this.apiServerUrl}/api/v2/add`,country);
    }

    public updateCountry(country: Country): Observable<Country>{
      return this.http.put<Country>(`${this.apiServerUrl}/api/v2/update`,country);
    }

    public deleteCountry(countryId: number): Observable<void>{
      return this.http.delete<void>(`${this.apiServerUrl}/api/v2/delete/${countryId}`);
    }
}


