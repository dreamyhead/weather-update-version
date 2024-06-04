import { Component } from '@angular/core';
import { StyleService } from '../ui/shared/services/style.service';
import { Subscription } from 'rxjs';
import { RestService } from '../ui/shared/services/rest.service';
import { CurrentWeather } from '../ui/shared/interfaces/CurrentWeather';
import L from 'leaflet';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  darkMode: boolean = false;
  forecastWeather!: CurrentWeather | null;
  darkModeSubscription!: Subscription;
  private map: L.Map | undefined;

  constructor(
    private restService: RestService,
    private styleService: StyleService
  ) {}

  ngOnInit() {
    this.restService.getCurrentWeather('Москва').subscribe((data) => {
      this.forecastWeather = data;
      this.initMap();
    })

    this.darkModeSubscription = this.styleService.darkModeSubject.subscribe((mode: boolean) => {
      this.darkMode = mode;
    });
  }

  inputCity(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.forecastWeather = null;
    this.restService.getCurrentWeather('Лондон').subscribe((data) => {
      this.forecastWeather = data;
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.forecastWeather?.coord?.lat!, this.forecastWeather?.coord?.lon!],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=4f592b2566721ec99b69bb95df24da9a`, {
      maxZoom: 18,
      attribution: 'Map data © OpenWeatherMap'
    }).addTo(this.map);
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
