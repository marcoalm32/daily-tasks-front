import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { MESSAGES } from '../../messages/messages';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule, 
    CommonModule,
    NgxMaskDirective,
  ]
})
export class FieldComponent implements ControlValueAccessor {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control: FormControl | null = null;
  @Input() mask: string | null = null;

  value: any = '';
  disabled = false;
  messages = MESSAGES;

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  constructor(@Self() @Optional() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.onChange(newValue);
    if (this.control) {
      this.control.setValue(newValue);
    }
  }

  onBlur() {
    this.onTouched();
    if (this.control) {
      this.control.markAsTouched();
    }
  }

  writeValue(value: any): void {
    this.value = value ?? '';
    if (this.control) {
      this.control.setValue(this.value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.control) {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  }

  shouldShowError(): boolean {
    const control = this.control ?? this.ngControl?.control;
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  getErrorMessage(): string {
    const control = this.control ?? this.ngControl?.control;
    const errors = control?.errors;
    if (!errors) return '';

    if (errors['required']) return this.messages.errors.required_field;
    if (errors['email']) return this.messages.errors.invalid_email;
    if (errors['minlength']) return this.messages.errors.min_length(errors['minlength'].requiredLength);
    if (errors['maxlength']) return this.messages.errors.max_length(errors['maxlength'].requiredLength);
    if (errors['passwordStrength']) return this.messages.errors.invalid_password;

    const firstKey = Object.keys(errors)[0];
    return firstKey ? firstKey : this.messages.errors.invalid_field;
  }

}
