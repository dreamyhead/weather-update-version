import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { SearchInputComponent } from './ui/components/search-input/search-input.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CardComponent } from './ui/components/card/card.component';
import { TranslatePipe } from './ui/shared/pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppBarComponent,
    CardComponent,
    SearchInputComponent,
    MainPageComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    AppBarComponent,
    CardComponent,
    SearchInputComponent,
    MainPageComponent,
    TranslatePipe
  ]
})
export class FeaturesModule { }
