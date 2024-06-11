import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-state',
  templateUrl: './weather-state.component.html',
  styleUrls: ['./weather-state.component.scss']
})
export class WeatherStateComponent {

  @Input()
  type?: string;
}
