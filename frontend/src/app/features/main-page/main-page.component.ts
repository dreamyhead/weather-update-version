import { Component, HostListener, ViewChild } from '@angular/core';
import { StyleService } from '../ui/shared/services/style.service';
import { Subscription } from 'rxjs';
import { RestService } from '../ui/shared/services/rest.service';
import { CurrentWeather } from '../ui/shared/interfaces/CurrentWeather';
import L from 'leaflet';
import { SearchInputComponent } from '../ui/components/search-input/search-input.component';
import { ForecastWeather } from '../ui/shared/interfaces/ForecastWeather';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  darkMode: boolean = false;
  forecastWeather!: ForecastWeather | null;
  currentWeather!: CurrentWeather | null;
  enableEnglishSubscription!: Subscription;
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
  ];
  currentMarker?: L.Marker;
  enableEnglish: boolean = false;

  @ViewChild(SearchInputComponent)
  searchInputComponent!: SearchInputComponent;

  currentSlide = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  startX: number | null = null;
  isDragging = false;
  constructor(
    private restService: RestService,
    private styleService: StyleService
  ) {
  }

  ngOnInit() {
    this.enableEnglishSubscription = this.styleService.enableEnglishSubject.subscribe((enableEnglish) => {
      this.enableEnglish = enableEnglish;
      console.log(this.enableEnglish);
      
    });

    this.restService.getCurrentWeather('Москва', 'ru').subscribe((data) => {
      this.currentWeather = data;
      this.initMap();
    })

    this.restService.getForecastWeather('Москва').subscribe((data) => {
      console.log(data);
      this.forecastWeather = data;
    })

    this.darkModeSubscription = this.styleService.darkModeSubject.subscribe((mode: boolean) => {
      this.darkMode = mode;
    });
  }

  inputCity(city: string) {
    this.currentWeather = null;
    console.log(this.enableEnglish);
    
    this.restService.getCurrentWeather(city, this.enableEnglish ? 'en' : 'ru').subscribe((data) => {
      this.currentWeather = data;
      this.updateCenterMap(this.currentWeather?.coord?.lat!, this.currentWeather?.coord?.lon!);
    })

    this.restService.getForecastWeather(city, this.enableEnglish ? 'en' : 'ru').subscribe((data) => {
      console.log(data);
      this.forecastWeather = data;
    })
  }

  submitSearch() {
    if (this.searchInputComponent) {
      this.searchInputComponent.submit();
    }
  }

  updateCenterMap(lat: any, lon: any) {
    this.map?.setView([lat, lon]);

    const weatherIcon = L.icon({
      iconUrl: '/assets/icons/point.png',
      iconSize: [32, 32],
    });

    if (this.currentMarker) {
      this.map?.removeLayer(this.currentMarker);
    }
    this.currentMarker = L.marker([lat, lon], { icon: weatherIcon }).addTo(this.map!);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.currentWeather?.coord?.lat!, this.currentWeather?.coord?.lon!],
      zoom: 13
    });

    const weatherIcon = L.icon({
      iconUrl: '/assets/icons/point.png',
      iconSize: [32, 32],
    });

    this.currentMarker = L.marker([this.currentWeather?.coord?.lat!, this.currentWeather?.coord?.lon!], { icon: weatherIcon }).addTo(this.map!);

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

  onValueChange(value: string) {
    this.inputCity(value);
  }

  ngOnDestroy() {
    this.enableEnglishSubscription.unsubscribe();
    this.darkModeSubscription.unsubscribe();
  }

  /*ToDo: Переписать */
  getBackground(): string {
    let currentBackground: string;
    const icon = this.currentWeather?.weather[0].icon;
  
    switch (icon) {
      case '01d':
      case '01n':
        currentBackground = 'linear-gradient(to right top, rgb(45 156 255), rgb(215 242 255))';
        break;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
        currentBackground = 'linear-gradient(to right top, rgb(201 201 201), rgb(89 169 209))';
        break;
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

  // @HostListener('touchstart', ['$event'])
  // onTouchStart(event: TouchEvent) {
  //   this.startX = event.touches[0].clientX;
  // }

  // @HostListener('touchmove', ['$event'])
  // onTouchMove(event: TouchEvent) {
  //   if (!this.startX) return;

  //   const currentX = event.touches[0].clientX;
  //   const diffX = this.startX - currentX;

  //   if (diffX > this.swipeThreshold) {
  //     this.nextSlide();
  //     this.startX = null;
  //   } else if (diffX < -this.swipeThreshold) {
  //     this.prevSlide();
  //     this.startX = null;
  //   }
  // }

  // @HostListener('touchend')
  // onTouchEnd() {
  //   this.startX = null;
  // }

  // @HostListener('mousedown', ['$event'])
  // onMouseDown(event: MouseEvent) {
  //   this.startX = event.clientX;
  // }

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (this.startX !== null) {
  //     this.handleSwipe(event.clientX);
  //   }
  // }

  // @HostListener('mouseup')
  // onMouseUp() {
  //   this.startX = null;
  // }

  // handleSwipe(currentX: number) {
  //   if (this.startX === null) return;

  //   const diffX = this.startX - currentX;

  //   if (diffX > this.swipeThreshold) {
  //     this.nextSlide();
  //     this.startX = null;
  //   } else if (diffX < -this.swipeThreshold) {
  //     this.prevSlide();
  //     this.startX = null;
  //   }
  // }

  startDrag(clientX: number) {
    this.startX = clientX;
    this.isDragging = true;
  }

  drag(clientX: number) {
    if (this.startX !== null) {
      const currentX = clientX;
      const diffX = currentX - this.startX;
      this.currentTranslate = this.prevTranslate + diffX;
    }
  }

  endDrag() {
    this.isDragging = false;
    const moveBy = this.currentTranslate - this.prevTranslate;
    if (Math.abs(moveBy) > 50) {
      if (moveBy < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
    this.currentTranslate = this.currentSlide * -window.innerWidth;
    this.prevTranslate = this.currentTranslate;
  }

  nextSlide() {
    if (this.currentSlide < this.forecastWeather!.list!.length - 1) {
      this.currentSlide++;
    }
    this.currentTranslate = this.currentSlide * -window.innerWidth;
    this.prevTranslate = this.currentTranslate;
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
    this.currentTranslate = this.currentSlide * -window.innerWidth;
    this.prevTranslate = this.currentTranslate;
  }

  onMouseDown(event: MouseEvent) {
    this.startDrag(event.clientX);
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.drag(event.clientX);
    }
  }

  onMouseUp(event: MouseEvent) {
    this.endDrag();
  }

  onMouseLeave(event: MouseEvent) {
    if (this.isDragging) {
      this.endDrag();
    }
  }

  onTouchStart(event: TouchEvent) {
    this.startDrag(event.touches[0].clientX);
  }

  onTouchMove(event: TouchEvent) {
    this.drag(event.touches[0].clientX);
  }

  onTouchEnd(event: TouchEvent) {
    this.endDrag();
  }
}
