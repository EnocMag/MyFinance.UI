import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { env } from "../../environments/environment";
import { Category, CategoryRequest } from "../models/category-model";
import { Observable } from "rxjs/internal/Observable";
import { ApiResponse } from "../models/apiResponse.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${env.myFinanceApiUrl}/Category`;
    constructor(private http: HttpClient) { }

    createCategory(category: CategoryRequest): Observable<ApiResponse<Category>> {
        return this.http.post<ApiResponse<Category>>(this.apiUrl, category);
    }
    getAllCategories(): Observable<ApiResponse<Category[]>> {
        return this.http.get<ApiResponse<Category[]>>(this.apiUrl);
    }
    getCategoryById(id: string): Observable<ApiResponse<Category>> {
        return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`);
    }
    getCategoriesByType(type: string): Observable<ApiResponse<Category[]>> {
        return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/type/${type}`,);
    }
    updateCategory(id: string, category: Category): Observable<ApiResponse<Category>> {
        return this.http.put<ApiResponse<Category>>(`${this.apiUrl}/${id}`, category);
    }
    deleteCategory(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
