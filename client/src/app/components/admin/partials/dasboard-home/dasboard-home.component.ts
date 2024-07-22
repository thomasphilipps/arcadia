import { Component, inject } from '@angular/core';
import { StatisticsComponent } from '@app/components/templates/statistics/statistics.component';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'arz-dasboard-home',
  standalone: true,
  imports: [StatisticsComponent],
  templateUrl: './dasboard-home.component.html',
  styleUrl: './dasboard-home.component.scss',
})
export class DasboardHomeComponent {
  private authService = inject(AuthService);

  userInfo = this.authService.currentUserValue;

  hasRole(expectedRoles: string[]): boolean {
    return this.authService.hasRole(expectedRoles);
  }
}
