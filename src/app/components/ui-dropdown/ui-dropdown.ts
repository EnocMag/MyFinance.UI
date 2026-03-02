import { Component, ChangeDetectionStrategy, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ui-dropdown',
  imports: [],
  templateUrl: './ui-dropdown.html',
  styleUrl: './ui-dropdown.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiDropdown),
      multi: true,
    },
  ],
})
export class UiDropdown implements ControlValueAccessor {

  //  Inputs
  items = input<any[]>([]);
  valueField = input<string | null | undefined>(undefined);
  trackByField = input<string>('id');
  labelField = input<string>('name');

  //  State
  isDropdownOpen = false;
  selectedItem = signal<any | null>(null);
  disabled = false;

  //  ControlValueAccessor callbacks
  private onChange = (value: any) => {};
  private onTouched = () => {};

  // ---------------- CVA METHODS ----------------

  writeValue(value: any): void {
    this.selectedItem.set(value);
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

  // ---------------- UI LOGIC ----------------

  toggleDropdown() {
    if (this.disabled) return;
    this.isDropdownOpen = !this.isDropdownOpen;
    this.onTouched();
  }

  selectItem(item: any) {
    this.selectedItem.set(item);
    const valueField = this.valueField();
    const valueToEmit = valueField ? item[valueField] : item;
    this.onChange(valueToEmit);
    this.isDropdownOpen = false;
  }

  getDisplayValue(): string {
    const labelField = this.labelField();
    return this.selectedItem()
      ? this.selectedItem()[labelField]
      : 'Select an option';
  }
}
