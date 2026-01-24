import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, input, output } from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  imports: [NgClass],
  templateUrl: './custom-dropdown.html',
})
export class CustomDropdown<T extends { [key: string]: any }> {
constructor(private elementRef: ElementRef) {}
  // Inputs signal sintax
  /** @description **(REQUIRED)** Lista de elementos (objetos) a mostrar en el dropdown. 
   * @example [ {id: 1, name: 'Main Branch'}, {id: 2, name: 'Airport Branch'} ]
   */
  items = input.required<T[]>(); 

  // Inputs Opcionales con valor por defecto
  /** @description El campo de los objetos (T) que se usará para rastrear elementos en el '@for y para las comparaciones de selección.
   * @default 'id' 
   * @example 'licensePlates' o 'code'
   */
  trackByField = input('id');
  /** @description **Función de formato** que define cómo se muestra el texto de cada opción en la lista y en el botón principal.
   * @param {T} item - El objeto actual a formatear.
   * @returns {string} El texto que se mostrará.
   * @example (branch) => \`Branch ID: ${branch.id} - ${branch.name}\`
   */
  optionFormatter = input((item: T) => String(item));
  /** @description Texto que se muestra en el botón cuando no hay ningún elemento seleccionado. 
   * @default 'Select an option'
   */
  placeholder = input('Select an option');
  /** @description El elemento actualmente seleccionado. Se utiliza para marcar la opción activa. 
   * @default null
   */
  selectedItem = input<T | null>(null); 
  
  // Output (sigue usando el decorador o la función output())
  /** @description Emite el elemento completo (objeto T) que ha sido seleccionado por el usuario.
   * @event 
   */
  selectionChange = output<T>(); // Usando la función output() si prefieres la sintaxis de signals aquí también

  isDropdownOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Si el dropdown está cerrado, no hay nada que hacer.
    if (!this.isDropdownOpen) {
      return;
    }

    // Comprueba si el elemento clickeado (event.target) es parte de ESTE componente.
    // Si la condición es FALSA, significa que el clic ocurrió FUERA del dropdown.
    const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);

    if (!clickedInside) {
      this.isDropdownOpen = false; // Cierra el dropdown
      console.log('Dropdown cerrado por clic fuera del componente.');
    }
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectItem(item: T): void {
    this.selectionChange.emit(item);
    this.isDropdownOpen = false; // Cierra el menú al seleccionar
  }

  getOptionText(item: T): string {
    return this.optionFormatter()(item); // Llamamos al input() para obtener la función, y luego la ejecutamos
  }

  getDisplayValue(): string {
      const currentItem = this.selectedItem();

      if (currentItem) {
          // Si hay un elemento, lo formateamos usando la función proporcionada
          return this.optionFormatter()(currentItem);
      }
      // Si no hay, mostramos el placeholder
      return this.placeholder();
  }
}
