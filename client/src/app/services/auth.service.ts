import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

import { User } from '@app/interfaces/user.interface';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiURL: string = environment.apiURL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    const userCookie = this.cookieService.get('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      userCookie ? JSON.parse(userCookie) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !this.isTokenExpired();
  }

  public hasRole(expectedRoles: string[]): boolean {
    return expectedRoles.includes(this.getUserRole()!);
  }

  login(userEmail: string, userPassword: string) {
    return this.http.post<User>(`${this.apiURL}/login`, { userEmail, userPassword }).pipe(
      map((user) => {
        if (user && user.userToken) {
          const { userPassword, ...userInfo } = user;
          const serializedUserInfo = JSON.stringify(userInfo);
          const cookieExp = new Date();
          cookieExp.setMinutes(cookieExp.getMinutes() + 20);
          this.cookieService.set('currentUser', serializedUserInfo, {
            expires: cookieExp,
            path: '/',
            domain: '',
            secure: environment.production,
            sameSite: 'Strict',
          });

          this.currentUserSubject.next(userInfo);

          return userInfo;
        } else {
          throw new Error('Token not found');
        }
      }),
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  public isTokenExpired(): boolean {
    const json = this.cookieService.get('currentUser');
    if (!json) return true;

    const user: User = JSON.parse(json);
    const decoded: any = jwtDecode(user.userToken!);
    const now = new Date().getTime() / 1000;
    return decoded.exp < now;
  }

  public getUserRole(): string | null {
    return this.currentUserValue ? this.currentUserValue.userRole : null;
  }

  logout() {
    this.cookieService.delete('currentUser', '/');
    this.currentUserSubject.next(null);
    this.router.navigate(['/dashboard/login']);
  }

  private log(response: any) {
    if (!environment.production) {
      console.table(response);
    }
  }

  private handleError(error: Error, errorValue: [] | any) {
    if (!environment.production) {
      console.error(error);
    }
    return of(errorValue);
  }
}
