import { Component } from '@angular/core';
import { StyleService } from '../ui/shared/services/style.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {
  darkMode: boolean = false;
  darkModeSubscription!: Subscription;

  constructor(private styleService: StyleService) {}

  ngOnInit() {
    this.darkModeSubscription = this.styleService.darkModeSubject.subscribe((mode: boolean) => {
      this.darkMode = mode;
    });
  }

  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }
}
