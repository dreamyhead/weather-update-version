import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../interfaces/CurrentWeather';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=4f592b2566721ec99b69bb95df24da9a`)
  };
}