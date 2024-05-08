import { Component, OnInit } from '@angular/core';
import { Specie } from '@app/interfaces/specie.interface';
import { SqlGlobalService } from '@app/services/sql-global.service';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'arz-specie-admin',
  standalone: true,
  imports: [],
  templateUrl: './specie-admin.component.html',
  styleUrl: './specie-admin.component.scss',
})
export class SpecieAdminComponent implements OnInit {
  species: Specie[] = [];
  private subscription!: Subscription;

  constructor(private speciService: SqlGlobalService<Specie>) {}

  ngOnInit(): void {
    this.subscription = this.speciService
      .getAllData()
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la récupération des espèces', error);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.species = data;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
