import { Category } from "./category-model";

export interface Transaction {
    id: number;
    date: Date;
    amount: number;
    type: 'Income' | 'Expense';
    description?: string;
    categoryId: number;
    category?: Category;
    categoryNameSnapshot?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface createTransactionModel {
    date?: string;
    amount: number;
    type: 'Income' | 'Expense';
    description?: string;
    categoryId: number;
}