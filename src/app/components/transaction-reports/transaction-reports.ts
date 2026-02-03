import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { Transaction } from "../../models/transaction-model";
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-reports',
  imports: [CommonModule],
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
}
