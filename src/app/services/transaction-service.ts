import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../environments/environment";
import { createTransactionModel, Transaction } from "../models/transaction-model";
import { Observable } from "rxjs/internal/Observable";
import { ApiResponse } from "../models/apiResponse.model";
import { Report } from "../models/report-model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
    private apiUrl = `${env.myFinanceApiUrl}/Transaction`;
    constructor(private http: HttpClient) { }

    createTransaction(transaction: createTransactionModel): Observable<ApiResponse<Transaction>> {
        return this.http.post<ApiResponse<Transaction>>(this.apiUrl, transaction);
    }
    getAllTransactions(): Observable<ApiResponse<Transaction[]>> {
        return this.http.get<ApiResponse<Transaction[]>>(this.apiUrl);
    }
    getTransactionById(id: string): Observable<ApiResponse<Transaction>> {
        return this.http.get<ApiResponse<Transaction>>(`${this.apiUrl}/${id}`);
    }
    updateTransaction(id: string, transaction: Transaction): Observable<ApiResponse<Transaction>> {
        return this.http.put<ApiResponse<Transaction>>(`${this.apiUrl}/${id}`, transaction);
    }
    deleteTransaction(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    getMonthlyReport(type: 'Income' | 'Expense', year: number): Observable<ApiResponse<Report[]>> {
        return this.http.get<ApiResponse<Report[]>>(`${this.apiUrl}/report?type=${type}&year=${year}`);
    }
}
