import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category-service';
import { TransactionService } from '../../services/transaction-service';
import { Category } from '../../models/category-model';
import { createTransactionModel } from '../../models/transaction-model';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  templateUrl: './transaction-form.html',
  styles: ``,
})
export class TransactionForm implements OnInit {
  constructor (
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {}
  categories: Category[] = [];
  submitted = false;

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe((category) => {
      this.categories = category.data;
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
    categoryId: new FormControl(null, {
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
  get categoryId() {
    return this.transactionForm.controls.categoryId;
  }

  setType(value: 'Income' | 'Expense') {
    this.type?.setValue(value);
    this.type?.markAsTouched();
  }

  onSubmit() {
    this.submitted = true;

    if (this.transactionForm.invalid) return;

    const transaction: createTransactionModel = {
      date: this.date.value ?? undefined,
      amount: this.amount.value!,
      type: this.type.value as 'Income' | 'Expense',
      description: this.description.value ?? undefined,
      categoryId: this.categoryId.value!,
    }

    this.transactionService.createTransaction(transaction).subscribe({
      next: (response) => {
        this.transactionForm.reset();
        this.submitted = false;
        console.log('Transaction created successfully:', response);
      }
    });

  }
}
