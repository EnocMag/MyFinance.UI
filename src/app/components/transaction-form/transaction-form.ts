import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { TransactionService } from '../../services/transaction-service';
import { Category } from '../../models/category-model';
import { createTransactionModel } from '../../models/transaction-model';
import { UiDropdown } from '../ui-dropdown/ui-dropdown';
import { ToastService } from '../../services/toast-service';
import { FlatpickrDirective } from '../../directives/flatpickr-directive';


@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule, UiDropdown, FlatpickrDirective ],
  templateUrl: './transaction-form.html',
  styles: ``,
})
export class TransactionForm implements OnInit {
  constructor (
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private toastService: ToastService
  ) {}
  categories = signal<Category[]>([]);

  selectedCategory: Category | null = null;

  formatCategoryOption = (category: Category): string => {
    return `${category.name}`;
  };

  onCategorySelected(category: Category): void {
    this.selectedCategory = category;
  }

  ngOnInit() {
    this.category.disable();

    this.type.valueChanges.subscribe(type => {
      if (!type) return;
      
      this.category.reset();
      this.category.enable();

      this.categoryService.getCategoriesByType(type).subscribe(response => {
        this.categories.set(response.data);
      })
    });
  }

  transactionForm = new FormGroup({
    date: new FormControl(null, [
      Validators.required,
    ]),
    amount: new FormControl(null, {
      validators: [Validators.required, Validators.min(1)]
    }),
    type: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl(null),
    category: new FormControl({value: null, disabled: true }, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  get date() {
    return this.transactionForm.controls.date;
  }
  get amount() {
    return this.transactionForm.controls.amount;
  }
  get type() {
    return this.transactionForm.controls.type;
  }
  get description() {
    return this.transactionForm.controls.description;
  }
  get category() {
    return this.transactionForm.controls.category;
  }

  setType(value: 'Income' | 'Expense') {
    this.type?.setValue(value);
    this.type?.markAsTouched();
  }

  onSubmit() {

    if (this.transactionForm.invalid) return;

    const transaction: createTransactionModel = {
      date: this.date.value ?? undefined,
      amount: this.amount.value!,
      type: this.type.value as 'Income' | 'Expense',
      description: this.description.value ?? undefined,
      categoryId: this.category.value!,
    }

    this.transactionService.createTransaction(transaction).subscribe({
      next: (response) => {
        this.transactionForm.reset();
        this.toastService.success('Transaction created successfully');
        console.log('Transaction created successfully:', response);
      }
    });
  }
}
