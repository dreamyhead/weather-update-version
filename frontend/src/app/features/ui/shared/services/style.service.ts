import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  darkModeSubject = new BehaviorSubject<boolean>(false);
  enableEnglishSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  changeTheme(enableMode: boolean) {
    this.darkModeSubject.next(enableMode);
  }

  changeLanguage(enableMode: boolean) {
    this.enableEnglishSubject.next(enableMode);
  }
}
