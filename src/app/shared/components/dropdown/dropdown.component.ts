import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MESSAGES } from '../../messages/messages';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true
    }
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent implements ControlValueAccessor {

  @Input() options: any = [];
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() idProperty: string = 'id';
  @Input() displayProperty: string = 'name';
  @Input() floatLabel: 'always' | 'auto' | 'never' = 'auto';
  @Input() width: string = '100%';
  @Input() multiple: boolean = true;
  @Input() selectedValue: string = 'id';

  value: any = this.multiple ? [] : null;
  disabled = false;
  messages = MESSAGES;

  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  writeValue(obj: any): void {
    if (this.multiple && Array.isArray(obj) && obj.length && typeof obj[0] === 'object') {
      this.value = obj.map((v: any) => v[this.selectedValue]);
    } else {
      this.value = obj;
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
  }

  getFirstSelectedLabel(): string {
    if (!this.value || !this.value.length) return '';
    const opt = this.options.find((option: any) => option[this.idProperty] === this.value[0]);
    const result = opt ? opt[this.displayProperty] : '';
    return result;
  }

  onSelect(value: any): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  constructor() {
    this.placeholder = this.messages.inputs.placeholder.select_option;
  }

  get selectedLabel(): string {
    const opt = this.options.find((option: any) => option[this.idProperty] === this.value);
    return opt ? opt[this.displayProperty] : '';
  }
}
