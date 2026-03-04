import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from "../../models/transaction-model";
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
  constructor(private transactionService: TransactionService) {}
  
  public transactions$ : Observable<Transaction[]> | undefined = undefined;
  public startDate: string = '';
  public endDate: string = '';
  
  private allTransactions: Transaction[] = [];
  private transactionIdToDelete: number | null = null;

  ngOnInit(): void {
    this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res => {
      this.allTransactions = res.data;
      return res.data;
    }));
  }

  filterByDate(): void {
    if (!this.startDate && !this.endDate) {
      this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res => res.data));
      return;
    }

    const start = this.startDate ? new Date(this.startDate) : new Date('1900-01-01');
    const end = this.endDate ? new Date(this.endDate) : new Date('2100-12-31');

    const filtered = this.allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });

    this.transactions$ = new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  clearFilters(): void {
    this.startDate = '';
    this.endDate = '';
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
