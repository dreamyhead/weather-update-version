import { Component } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})

export class AppBarComponent {
  language: string = 'RU'
  title: string = 'Погода'
}
