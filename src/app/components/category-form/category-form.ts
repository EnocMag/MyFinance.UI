import { Component } from '@angular/core';
import { CategoryService } from '../../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryRequest } from '../../models/category-model';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  constructor(private categoryService: CategoryService) { }
  
  categoryForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });
  get name() {
    return this.categoryForm.controls.name;
  }
  get type() {
    return this.categoryForm.controls.type;
  }
  
  setType(value: 'Income' | 'Expense') {
    this.type?.setValue(value);
    this.type?.markAsTouched();
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    const categoryData: CategoryRequest = {
      name: this.name.value,
      type: this.type.value as 'Income' | 'Expense'
    }

    this.categoryService.createCategory(categoryData).subscribe({
      next: (response) => {
        this.categoryForm.reset();
        console.log('Category created successfully:', response);
      }
    });
  }
}