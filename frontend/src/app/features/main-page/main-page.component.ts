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
  menuOpen: boolean = false;
  private map: L.Map | undefined;
  private weatherLayer: L.TileLayer | undefined;
  layerMode: string = 'temp_new';
  layerModes: any[] = [
    { key: 'clouds_new', value: 'Облака' },
    { key: 'temp_new', value: 'Температура' },
    { key: 'precipitation_new', value: 'Осадки' },
    { key: 'pressure_new', value: 'Давление' },
    { key: 'wind_new', value: 'Ветер' }
  ]

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

    this.updateWeatherLayer();
  }

  private updateWeatherLayer(): void {
    if (this.map) {
      if (this.weatherLayer) {
        this.map.removeLayer(this.weatherLayer);
      }

      const url = `https://tile.openweathermap.org/map/${this.layerMode}/{z}/{x}/{y}.png?appid=4f592b2566721ec99b69bb95df24da9a`;
      this.weatherLayer = L.tileLayer(url, {
        maxZoom: 18,
        attribution: 'Map data © OpenWeatherMap'
      }).addTo(this.map);
    }
  }

  changeMode(layerMode: string) {
    this.layerMode = layerMode;
    this.updateWeatherLayer();
  }

  getBackground(): string {
    let currentBackground: string;
    const icon = this.forecastWeather?.weather[0].icon;
  
    switch (icon) {
      case '01d':
      case '01n':
        currentBackground = 'linear-gradient(to right top, rgb(45 156 255), rgb(215 242 255))';
        break;
      case '02d':
      case '02n':
        currentBackground = 'linear-gradient(to right top, rgb(201 201 201), rgb(89 169 209))';
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        currentBackground = 'linear-gradient(to right top, rgb(144, 151, 153), rgb(211 211 211))';
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
      case '50d':
      case '50n':
      case '11d':
      case '13d':
        currentBackground = 'linear-gradient(to top right, #63696b, #b0b6b9)';
        break;
      default:
        currentBackground = 'linear-gradient(to top right, #ffffff, #dddddd)';
        break;
    }
  
    return currentBackground;
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
