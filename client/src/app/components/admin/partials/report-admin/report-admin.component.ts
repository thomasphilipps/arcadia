import { Component, OnInit } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import { of } from 'rxjs';

import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { Animal } from '@app/interfaces/animal.interface';
import { VetReport } from '@app/interfaces/report.interace';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { User } from '@app/interfaces/user.interface';
import { AnimalService } from '@app/services/animal.service';
import { AuthService } from '@app/services/auth.service';
import { ReportService } from '@app/services/report.service';
import { toDate } from '@app/utils/utils';

@Component({
  selector: 'arz-report-admin',
  standalone: true,
  imports: [SqlDataTableComponent, MatExpansionModule],
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.scss'],
})
export class ReportAdminComponent implements OnInit {
  animals: Animal[] = [];
  reports: VetReport[] = [];
  reportsConfig: SqlViewDataConfig<Animal> = this.createAnimalConfig();
  reportListConfig: SqlViewDataConfig<VetReport> = this.createReportConfig();
  currentUser: User | null = null;
  showReportList: boolean = false;
  selectedAnimal: Animal | null = null;

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
        this.updateAnimalConfig();
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
        this.updateAnimalConfig();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données: ', error);
      },
    });
  }

  updateAnimalConfig(): void {
    const viewdata = this.animals.map((animal) => {
      const reports = this.getAnimalReports(animal.animalId);
      const lastReport = reports ? reports[0] : null;
      return {
        ...animal,
        lastReportDate: lastReport?.reportDate,
        veterinaryName: lastReport?.reportedBy,
      };
    });

    this.reportsConfig = {
      ...this.reportsConfig,
      data: of(viewdata),
    };
  }

  createAnimalConfig(): SqlViewDataConfig<Animal> {
    return {
      label: 'Animaux',
      data: of([]),
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

  createReportConfig(): SqlViewDataConfig<VetReport> {
    return {
      label: '',
      data: of([]),
      primaryKey: 'reportId',
      displayColumns: [
        { key: 'reportDate', label: 'Date' },
        { key: 'reportedBy', label: 'Vétérinaire' },
        { key: 'reportState', label: 'Etat' },
        { key: 'reportDetails', label: 'Détails' },
      ],
      actions: {
        view: true,
        edit: (report) => this.currentUser?.userId === report.veterinaryKey,
        delete: (report) => this.currentUser?.userId === report.veterinaryKey,
      },
      sortable: false,
      noFilter: true,
    };
  }

  updateReportListConfig(animalId: string): void {
    const reports = this.getAnimalReports(animalId) || [];
    const animal = this.animals.find((a) => a.animalId === animalId);
    this.selectedAnimal = animal || null;

    this.reportListConfig = {
      ...this.reportListConfig,
      label: `Rapports pour l'animal: ${animal?.animalName}`,
      data: of(reports),
    };
  }

  getAnimalReports(animalId: string): VetReport[] | null {
    const reports = this.reports.filter((report) => report.animalKey === animalId);
    if (reports.length === 0) {
      return null;
    }

    reports.sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime());
    return reports;
  }

  viewReports(animalId: string): void {
    this.showReportList = true;
    this.updateReportListConfig(animalId);
  }

  viewAnimalReport(reportId: number): void {
    const report = this.reports.find((r) => r.reportId === reportId);
    let message = '';
    if (report) {
      const reportDate = toDate(report.reportDate).toLocaleDateString();
      const birthDate = toDate(report.animalBirth).toLocaleDateString();
      message = `
      Rapport du ${reportDate} pour ${report.animalName}

      ${report.animalSpecie} ${report.animalGender} né(e) le ${birthDate}
      
      Vétérinaire: ${report.reportedBy}

      Etat: ${report.reportState}
      Détails: ${report.reportDetails}

      Nourriture recommandée: ${report.reportFoodAmount} ${report.reportFoodType}`;
    } else {
      message = `Erreur lors de la récupération du rapport`;
    }
    alert(message);
  }

  addReport(animalId: string): void {
    console.log("Ajouter un rapport pour l'animal: ", animalId);
  }
}
