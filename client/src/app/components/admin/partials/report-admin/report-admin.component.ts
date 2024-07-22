import { Component, OnInit, ViewChild } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';

import { catchError, of } from 'rxjs';

import { SqlDataTableComponent } from '@app/components/templates/sql-data-table/sql-data-table.component';
import { Animal } from '@app/interfaces/animal.interface';
import { VetReport } from '@app/interfaces/report.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { User } from '@app/interfaces/user.interface';
import { AnimalService } from '@app/services/animal.service';
import { AuthService } from '@app/services/auth.service';
import { ReportService } from '@app/services/report.service';
import { toDate } from '@app/utils/utils';
import { Validators } from '@angular/forms';
import { SqlFormComponent } from '@app/components/templates/sql-form/sql-form.component';

@Component({
  selector: 'arz-report-admin',
  standalone: true,
  imports: [SqlDataTableComponent, SqlFormComponent, MatExpansionModule],
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.scss'],
})
export class ReportAdminComponent implements OnInit {
  animals: Animal[] = [];
  reports: VetReport[] = [];
  reportsConfig: SqlViewDataConfig<Animal> = this.createAnimalConfig();
  reportListConfig: SqlViewDataConfig<VetReport> = this.createReportConfig();
  reportFormConfig: SqlViewDataConfig<VetReport> = this.createReportFormConfig();
  currentUser: User | null = null;
  showReportList: boolean = false;
  selectedAnimal: Animal | null = null;
  editingReportId: number | null = null;
  initialFormValues: Partial<VetReport> = {};

  @ViewChild(SqlFormComponent) sqlFormComponent!: SqlFormComponent<VetReport>;

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
        if (this.selectedAnimal) {
          this.updateReportListConfig(this.selectedAnimal.animalId); // Update report list after loading reports
        }
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

  createReportFormConfig(): SqlViewDataConfig<VetReport> {
    return {
      label: 'Ajouter un rapport',
      data: of([]),
      primaryKey: 'reportId',
      formFields: [
        {
          label: 'Etat résumé',
          controlName: 'reportState',
          type: 'text',
          validators: [Validators.required, Validators.maxLength(255)],
          maxLength: 255,
          placeholder: "Etat de l'animal",
        },
        {
          label: 'Détails',
          controlName: 'reportDetails',
          type: 'textarea',
          validators: [Validators.required, Validators.maxLength(1000)],
          maxLength: 1000,
          minRows: 3,
          maxRows: 10,
          placeholder: 'Détails du rapport',
        },
        {
          label: 'Nourriture recommandée',
          controlName: 'reportFoodType',
          type: 'text',
          validators: [Validators.required, Validators.maxLength(32)],
          maxLength: 32,
          placeholder: 'Nourriture recommandée',
        },
        {
          label: 'Quantité recommandée',
          controlName: 'reportFoodAmount',
          type: 'text',
          validators: [Validators.required, Validators.maxLength(32)],
          maxLength: 32,
          placeholder: 'Quantité recommandée',
        },
      ],
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
    const newReport: Partial<VetReport> = {
      animalKey: animalId,
      veterinaryKey: this.currentUser?.userId ?? '',
    };
    const name = this.getAnimalName(animalId);
    this.editingReportId = null;
    this.sqlFormComponent.formTitle = `Ajouter un rapport pour ${name}`;
    this.sqlFormComponent.editForm = true;
    this.initialFormValues = newReport;
    this.sqlFormComponent.initializeForm(newReport as VetReport);
  }

  editReport(reportId: number): void {
    const report = this.reports.find((r) => r.reportId === reportId);
    console.log('Editing report', report);
    if (report) {
      const reportDate = toDate(report.reportDate).toLocaleDateString();
      this.sqlFormComponent.formTitle = `Modifier le rapport du ${reportDate} pour ${report.animalName}`;
      this.editingReportId = reportId;
      this.sqlFormComponent.editForm = true;
      this.initialFormValues = report;
      this.sqlFormComponent.initializeForm(report);
    }
  }

  saveReport(report: VetReport): void {
    const mergedReport = { ...this.initialFormValues, ...report };

    const operation =
      this.editingReportId === null
        ? this.reportService.createData(mergedReport)
        : this.reportService.updateData(this.editingReportId, this.getChangedFields(mergedReport));

    operation
      .pipe(
        catchError((error) => {
          console.error("Erreur lors de l'enregistrement du rapport: ", error);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          alert('Rapport enregistré avec succès');
          this.loadAnimals(); // Reload animals after saving
          this.loadReports(); // Reload reports after saving
        },
        complete: () => {
          this.editingReportId = null;
          this.sqlFormComponent.onCancelEdit();
          if (this.selectedAnimal) {
            this.updateReportListConfig(this.selectedAnimal.animalId); // Update report list after saving
          }
        },
      });
  }

  deleteReport(reportId: number): void {
    const report = this.reports.find((report) => report.reportId === reportId);
    if (!report) {
      console.error('Erreur lors de la suppression du rapport: rapport introuvable');
      return;
    }
    const reportDate = toDate(report.reportDate).toLocaleDateString();
    const message =
      `Voulez-vous vraiment supprimer le rapport du ${reportDate} pour ${report.animalName} ?` +
      `\n\nCette action est irréversible !\n\n` +
      `Cliquez sur "OK" pour confirmer ou "Annuler" pour annuler l'opération\n\n`;

    if (confirm(message)) {
      console.log(`Suppression du rapport ${reportId}`);
      this.reportService
        .deleteData(reportId)
        .pipe(
          catchError((error) => {
            console.error('Erreur lors de la suppression du rapport : ', error);
            return of(null);
          })
        )
        .subscribe({
          next: () => {
            alert('Avis supprimé avec succès');
            this.loadReports(); // Reload reviews after deletion
            this.loadAnimals(); // Reload animals after deletion
            if (this.selectedAnimal) {
              this.updateReportListConfig(this.selectedAnimal.animalId); // Update report list after deletion
            }
          },
          complete: () => {
            this.sqlFormComponent.onCancelEdit();
          },
        });
    }
  }

  getChangedFields(report: VetReport): Partial<VetReport> {
    const changedFields: any = {};
    (Object.keys(report) as (keyof VetReport)[]).forEach((key) => {
      if (report[key] !== this.initialFormValues[key]) {
        changedFields[key] = report[key];
      }
    });
    return changedFields;
  }

  getAnimalName(animalId: string): string {
    const animal = this.animals.find((a) => a.animalId === animalId);
    return animal ? animal.animalName : 'Inconnu';
  }
}
