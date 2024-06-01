import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesModule } from './features/features.module';
import { HttpClientModule } from '@angular/common/http';
import { TranslationService } from './features/ui/shared/services/translation.service';

export function initializeApp(translationService: TranslationService) {
  return () => translationService.loadTranslations('ru').toPromise();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FeaturesModule,
  ],
  providers: [
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
