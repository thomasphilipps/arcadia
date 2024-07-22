import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AnimalService } from '@services/animal.service';
import { BarChartComponent } from '@templates/bar-chart/bar-chart.component';

interface AnimalClickStatistics {
  _id: {
    animalId: string;
    animalName: string;
    animalSpecie: string;
    animalBiome: string;
  };
  count: number;
}

@Component({
  selector: 'arz-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  imports: [BarChartComponent, MatCardModule, MatFormFieldModule, MatSelectModule],
})
export class StatisticsComponent implements OnInit {
  species: string[] = [];
  habitats: string[] = [];
  filteredData: AnimalClickStatistics[] = [];
  originalData: AnimalClickStatistics[] = [];

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.animalService.getClickStatistics().subscribe((data: AnimalClickStatistics[]) => {
      this.originalData = data;
      this.filteredData = data;
      this.species = [...new Set(data.map((item: AnimalClickStatistics) => item._id.animalSpecie))];
      this.habitats = [...new Set(data.map((item: AnimalClickStatistics) => item._id.animalBiome))];
    });
  }

  onSpeciesChange(species: string): void {
    this.filterBySpecies(species);
  }

  onHabitatChange(habitat: string): void {
    this.filterByHabitat(habitat);
  }

  filterBySpecies(species: string): void {
    if (species) {
      this.filteredData = this.originalData.filter((item) => item._id.animalSpecie === species);
    } else {
      this.filteredData = this.originalData;
    }
  }

  filterByHabitat(habitat: string): void {
    if (habitat) {
      this.filteredData = this.originalData.filter((item) => item._id.animalBiome === habitat);
    } else {
      this.filteredData = this.originalData;
    }
  }
}
