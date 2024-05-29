import { Component, OnInit } from '@angular/core';
import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { Animal } from '@app/interfaces/animal.interface';
import { VetReport } from '@app/interfaces/report.interace';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { User } from '@app/interfaces/user.interface';
import { AnimalService } from '@app/services/animal.service';
import { AuthService } from '@app/services/auth.service';
import { ReportService } from '@app/services/report.service';
import { toDate } from '@app/utils/utils';
import { of } from 'rxjs';

@Component({
  selector: 'arz-report-admin',
  standalone: true,
  imports: [SqlDataTableComponent],
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.scss'],
})
export class ReportAdminComponent implements OnInit {
  animals: Animal[] = [];
  reports: VetReport[] = [];
  reportsConfig: SqlViewDataConfig<Animal> = {
    label: '',
    data: of([]),
    primaryKey: '',
    displayColumns: [],
    actions: { newSub: false, view: false },
    sortable: false,
  };

  currentUser: User | null = null;

  constructor(
    private animalService: AnimalService,
    private reportService: ReportService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAnimals();
    this.loadReports();
    this.currentUser = this.authService.currentUserValue;
  }

  loadAnimals(): void {
    this.animalService.loadData();
    this.animalService.getAllData().subscribe({
      next: (animals) => {
        this.animals = animals;
        this.updateViewData();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }

  loadReports(): void {
    this.reportService.loadData();
    this.reportService.getAllData().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.updateViewData();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }

  updateViewData(): void {
    const viewdata = this.animals.map((animal) => {
      const lastReport = this.getLastAnimalReport(animal.animalId);
      return {
        ...animal,
        lastReportDate: lastReport?.reportDate,
        veterinaryName: lastReport?.reportedBy,
      };
    });

    this.reportsConfig = {
      label: 'Animaux',
      data: of(viewdata), // Transform viewdata to an Observable
      primaryKey: 'animalId',
      displayColumns: [
        { key: 'animalName', label: 'Nom' },
        { key: 'animalBiome', label: 'Habitat' },
        { key: 'animalSpecie', label: 'Espèce' },
        { key: 'lastReportDate', label: 'Dernier rapport' },
        { key: 'veterinaryName', label: 'Vétérinaire' },
      ],
      actions: { newSub: true, view: true },
      sortable: true,
    };
  }

  getLastAnimalReport(animalId: string): VetReport | null {
    const reports = this.reports.filter((report) => report.animalKey === animalId);
    if (reports.length === 0) {
      return null;
    }

    reports.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime());
    return reports[0];
  }

  viewLastAnimalReport(animalId: string): void {
    const latestReport = this.getLastAnimalReport(animalId);
    console.log("Dernier rapport pour l'animal: ", latestReport);
    let message = '';
    if (latestReport) {
      const reportDate = toDate(latestReport.reportDate).toLocaleDateString();
      message = `
      Dernier rapport pour ${latestReport.animalName}

      ${latestReport.animalSpecie} ${latestReport.animalGender} né(e) le ${toDate(
        latestReport.animalBirth
      ).toLocaleDateString()}
      
      Date: ${reportDate}
      Vétérinaire: ${latestReport.reportedBy}
      Etat: ${latestReport.reportState}
      Détails: ${latestReport.reportDetails}
      Nourriture recommandée: ${latestReport.reportFoodAmount} ${latestReport.reportFoodType}`;
    } else {
      message = `Aucun rapport trouvé pour cet animal`;
    }
    alert(message);
  }

  addReport(animalId: string): void {
    console.log("Ajouter un rapport pour l'animal: ", animalId);
  }
}
