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

  drawSun() {
    const canvas = document.getElementById('weatherCanvas') as HTMLCanvasElement;
    const ctx = canvas!.getContext('2d')!;
    const gradient = ctx.createRadialGradient(100, 100, 50 * 0.5, 100, 100, 50);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, 'orange');

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Рисование лучей солнышка
    for (let i = 0; i < 12; i++) {
      let angle = (i * 2 * Math.PI) / 12;
      let x1 = 100 + (50 + 10) * Math.cos(angle);
      let y1 = 100 + (50 + 10) * Math.sin(angle);
      let x2 = 100 + (50 + 30) * Math.cos(angle);
      let y2 = 100 + (50 + 30) * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = 'rgba(255, 165, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
