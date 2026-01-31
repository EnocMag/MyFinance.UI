import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from "../../models/transaction-model";


@Component({
  selector: 'app-transaction-reports',
  imports: [],
  templateUrl: './transaction-reports.html',
  styleUrl: './transaction-reports.css',
})
export class TransactionReports {
  constructor(private transactionService: TransactionService) {}
  public transactions: Transaction[] = [];

  ngOnInit() {
    this.transactionService.getAllTransactions().subscribe((response) => {
      this.transactions = response.data;
    })
  }
}
