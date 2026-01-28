import { Injectable } from "@angular/core";
import { env } from "../../environments/environment";
import { AuthModel } from "../models/Auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${env.myFinanceApiUrl}/Auth`;
    constructor() {}

    async login(username: string, password: string) : Promise<boolean> {

        const tokenResponse = await fetch(`${this.apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!tokenResponse.ok) {
            console.error('Login failed:', tokenResponse.statusText);
            return false;
        }
        const tokenData: AuthModel = await tokenResponse.json();
        localStorage.setItem('access-token', tokenData.token);
        return true;
    }
    isLoggedIn(): boolean {
        const token = localStorage.getItem('access-token') !== null;
        if (!token) {
            return false;
        }
        const payload = JSON.parse(atob(localStorage.getItem('access-token')!.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    }
    getToken(): string | null {
        return localStorage.getItem('access-token');
    }
    logout(): void {
        localStorage.removeItem('access-token');
    }
}