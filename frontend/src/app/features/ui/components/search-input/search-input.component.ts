import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StyleService } from '../../shared/services/style.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  @Input()
  label?: string;

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() 
  submitClick: EventEmitter<void> = new EventEmitter<void>();

  inputValue: string = '';
  darkMode: boolean = false;
  darkModeSubscription!: Subscription;

  constructor(
    private styleService: StyleService
  ) {
    this.darkModeSubscription = this.styleService.darkModeSubject.subscribe((mode: boolean) => {
      this.darkMode = mode;
    });
  }

  onSubmitClick() {
    this.submit();
  }

  submit() {
    if (this.inputValue === '') {
      return;
    }

    this.valueChange.emit(this.inputValue.trim());
    console.log(this.inputValue);
  }
}
