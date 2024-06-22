import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from '../interfaces/CurrentWeather';
import { ForecastWeather } from '../interfaces/ForecastWeather';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string, language?: string): Observable<CurrentWeather> {
    return this.http.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=${language}&appid=4f592b2566721ec99b69bb95df24da9a`)
  };

  getForecastWeather(city: string, language?: string): Observable<ForecastWeather> {
    return this.http.get<ForecastWeather>(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=${language}&appid=4f592b2566721ec99b69bb95df24da9a`)
  };
}