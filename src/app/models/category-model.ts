export interface Category {
    id: number;
    name: string | null;
    type: 'Income' | 'Expense';
}

export interface CategoryRequest {
    name: string | null;
    type: 'Income' | 'Expense';
}