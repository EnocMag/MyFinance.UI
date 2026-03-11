import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { CategoryService } from '../../services/category-service';
import { Transaction } from "../../models/transaction-model";
import { Category } from "../../models/category-model";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-transaction-reports',
  imports: [CommonModule, ConfirmationDialog, FormsModule],
  templateUrl: './transaction-reports.html',
  styleUrl: './transaction-reports.css',
})
export class TransactionReports implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}
  
  public transactions$ : Observable<Transaction[]> | undefined = undefined;
  public categories$: Observable<Category[]> | undefined = undefined;
  public startDate: string = '';
  public endDate: string = '';
  public selectedCategory: string = '';
  
  private allTransactions: Transaction[] = [];
  private allCategories: Category[] = [];
  private transactionIdToDelete: number | null = null;

  ngOnInit(): void {
    // Cargar categorías
    this.categories$ = this.categoryService.getAllCategories().pipe(map(res => {
      this.allCategories = res.data;
      return res.data;
    }));
    
    // Cargar transacciones
    this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res => {
      this.allTransactions = res.data;
      return res.data;
    }));
  }

  filterByDate(): void {
    this.applyFilters();
  }

  public applyFilters(): void {
    let filtered = [...this.allTransactions];

    // Filtro por fecha
    if (this.startDate || this.endDate) {
      const start = this.startDate ? new Date(this.startDate) : new Date('1900-01-01');
      const end = this.endDate ? new Date(this.endDate) : new Date('2100-12-31');

      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= start && transactionDate <= end;
      });
    }

    // Filtro por categoría
    if (this.selectedCategory) {
      filtered = filtered.filter(transaction => 
        transaction.categoryNameSnapshot === this.selectedCategory
      );
    }

    this.transactions$ = new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.selectedCategory = '';
    this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res => res.data));
  }

  isDialogOpen = signal<boolean>(false);

  editTransaction(transaction: Transaction): void {
    // TODO: Implement edit transaction logic
    console.log('Edit transaction:', transaction);
  }

  deleteTransaction(transactionId: number): void {
    this.transactionIdToDelete = transactionId;
    this.isDialogOpen.set(true);
  }

  handleConfirm(): void {
    if (this.transactionIdToDelete !== null) {
      this.transactionService.deleteTransaction(this.transactionIdToDelete.toString()).subscribe(
        () => {
          this.isDialogOpen.set(false);
          this.transactionIdToDelete = null;
          // Refrescar la lista de transacciones
          this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res => {
            this.allTransactions = res.data;
            return res.data;
          }));
        },
        (error) => {
          console.error('Error deleting transaction:', error);
          this.isDialogOpen.set(false);
          this.transactionIdToDelete = null;
        }
      );
    }
  }
  
  handleCancel(): void {
    this.isDialogOpen.set(false);
    this.transactionIdToDelete = null;
  }
}
