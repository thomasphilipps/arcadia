import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'arz-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
  ],
})
export class DashboardMainComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
    map((result) => result.matches),
    shareReplay()
  );

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  hasRole(expectedRoles: string[]): boolean {
    return this.authService.hasRole(expectedRoles);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['dashboard/login']);
  }
}
