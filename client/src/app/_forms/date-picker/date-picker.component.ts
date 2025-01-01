import {Component, input, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerDirective, BsDatepickerInputDirective} from 'ngx-bootstrap/datepicker';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    BsDatepickerInputDirective,
    BsDatepickerDirective
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent implements ControlValueAccessor {
  label = input<string>('');
  maxDate = input<Date>();
  bsConfig?: Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
    this.bsConfig ={
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  get control() : FormControl {
    return this.ngControl.control as FormControl;
  }

}
