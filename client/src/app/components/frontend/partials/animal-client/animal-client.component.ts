import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Animal } from '@app/interfaces/animal.interface';
import { AnimalService } from '@app/services/animal.service';
import { Title } from '@angular/platform-browser';
import { DataService } from '@app/services/data.service';
import { ReportService } from '@app/services/report.service';

@Component({
  selector: 'arz-animal-client',
  standalone: true,
  imports: [],
  templateUrl: './animal-client.component.html',
  styleUrls: ['./animal-client.component.scss'],
})
export class AnimalClientComponent implements OnInit {
  animal: Animal;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private titleService: Title,
    private dataService: DataService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.animalService.getAnimalById(params['animalId']).subscribe((animal) => {
        this.animal = animal;
        this.getReports();
        this.dataService.loadImages('Animal', [this.animal], 'animalId');
        console.log(this.animal);
        this.updateTitle(); // Mettre à jour le titre de la page
      });
    });
  }

  private updateTitle(): void {
    if (this.animal) {
      const title = `${this.animal.animalName} - ${this.animal.animalSpecie} | Zoo Arcadia`;
      this.titleService.setTitle(title);
    }
  }

  getReports(): void {
    this.reportService.getAnimalReports(this.animal.animalId).subscribe({
      next: (reports) => {
        if (reports.length > 0) {
          // Utiliser reduce pour trouver le rapport le plus récent
          const lastReport = reports.reduce((latest, report) => {
            return new Date(report.reportDate) > new Date(latest.reportDate) ? report : latest;
          }, reports[0]);

          console.log('Le dernier rapport en date:', lastReport);
          // Mettre à jour this.animal.reports avec le rapport le plus récent
          this.animal.reports = [lastReport];
        } else {
          console.log('Aucun rapport trouvé pour cet animal.');
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des rapports pour l'animal:", error);
      },
    });
  }
}
