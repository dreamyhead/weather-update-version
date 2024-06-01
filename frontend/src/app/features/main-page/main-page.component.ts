import { Component } from '@angular/core';
import { StyleService } from '../ui/shared/services/style.service';
import { Subscription } from 'rxjs';
import { RestService } from '../ui/shared/services/rest.service';
import { CurrentWeather } from '../ui/shared/interfaces/CurrentWeather';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  darkMode: boolean = false;
  forecastWeather!: CurrentWeather;
  darkModeSubscription!: Subscription;


  constructor(
    private restService: RestService,
    private styleService: StyleService
  ) {}

  ngOnInit() {
    this.darkModeSubscription = this.styleService.darkModeSubject.subscribe((mode: boolean) => {
      this.darkMode = mode;
    });
  }

  inputCity(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.restService.getCurrentWeather('Москва').subscribe((data) => {
      this.forecastWeather = data;
    })
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
