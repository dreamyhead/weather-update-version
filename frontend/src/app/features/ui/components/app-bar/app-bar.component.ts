import { Component } from '@angular/core';
import { StyleService } from '../../shared/services/style.service';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})

export class AppBarComponent {
  title: string = 'Погода'
  darkMode: boolean = false;
  enableEnglish: boolean = false;

  constructor(
    private styleService: StyleService,
    private translationService: TranslationService
  ) {
  }

  ngOnInit() {
    this.styleService.enableEnglishSubject.subscribe((enableEnglish) => {
      this.enableEnglish = enableEnglish;
      this.translationService.changeLanguage(this.enableEnglish ? 'en' : 'ru');
    });

    this.translationService.changeLanguage('ru');
  }

  changeTheme(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.darkMode = !this.darkMode;
    this.styleService.changeTheme(this.darkMode);
  }

  changeLanguage(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.enableEnglish = !this.enableEnglish;
    this.styleService.changeLanguage(this.enableEnglish);
    this.translationService.changeLanguage(this.enableEnglish ? 'en' : 'ru');
  }
}
