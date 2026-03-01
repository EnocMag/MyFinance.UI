import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from "../../models/transaction-model";
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-transaction-reports',
  imports: [CommonModule, ConfirmationDialog],
  templateUrl: './transaction-reports.html',
  styleUrl: './transaction-reports.css',
})
export class TransactionReports implements OnInit {
  constructor(private transactionService: TransactionService) {}
  public transactions$ : Observable<Transaction[]> | undefined = undefined;

  ngOnInit(): void {
    this.transactions$ = this.transactionService.getAllTransactions().pipe(map(res =>{
      return res.data
    }));
  }
  isDialogOpen: boolean = false;

  editTransaction(transaction: Transaction): void {
    // TODO: Implementar lógica para editar transacción
    console.log('Edit transaction:', transaction);
  }

  deleteTransaction(transactionId: number): void {
    // TODO: Implementar lógica para eliminar transacción
    this.isDialogOpen = true;
    console.log('Delete transaction with ID:', transactionId);
  }

  handleConfirm(): void {
    this.isDialogOpen = false;
    console.log('Transaction deleted');
    // Aquí puedes agregar la lógica para eliminar la transacción
  }
  handleCancel(): void {
    this.isDialogOpen = false;
    console.log('Deletion cancelled');
    // Aquí puedes agregar la lógica para cancelar la eliminación
  }
}
