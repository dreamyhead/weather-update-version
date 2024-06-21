import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from './features/features.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './features/ui/shared/services/translation.service';
import { FormsModule } from '@angular/forms';
import localeRu from '@angular/common/locales/ru'

export function initializeApp(translationService: TranslationService) {
  return () => translationService.loadTranslations('ru').toPromise();
}

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FeaturesModule,
  ],
  providers: [
    { 
      provide: LOCALE_ID, 
      useValue: 'ru-RU' 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslationService],
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
