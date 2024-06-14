import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './ui/components/app-bar/app-bar.component';
import { SearchInputComponent } from './ui/components/search-input/search-input.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CardComponent } from './ui/components/card/card.component';
import { TranslatePipe } from './ui/shared/pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './ui/shared/pipes/truncate.pipe';
import { WeatherStateComponent } from './ui/components/weather-state/weather-state.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './ui/components/menu/menu.component';
import { SelectComponent } from './ui/components/select/select.component';

@NgModule({
  declarations: [
    AppBarComponent,
    CardComponent,
    SearchInputComponent,
    WeatherStateComponent,
    MainPageComponent,
    TranslatePipe,
    TruncatePipe,
    MenuComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    AppBarComponent,
    CardComponent,
    SearchInputComponent,
    WeatherStateComponent,
    MainPageComponent,
    TranslatePipe,
    TruncatePipe,
    MenuComponent,
    SelectComponent,
  ]
})
export class FeaturesModule { }
