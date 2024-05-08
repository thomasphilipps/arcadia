import { Component, OnInit } from '@angular/core';
import { Specie } from '@app/interfaces/specie.interface';
import { SqlViewDataConfig } from '@app/interfaces/sqlViewDataConfig.interface';
import { SpecieService } from '@app/services/specie.service';
import { SqlDataTableComponent } from '../templates/sql-data-table/sql-data-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'arz-specie-admin',
  standalone: true,
  imports: [CommonModule, SqlDataTableComponent],
  templateUrl: './specie-admin.component.html',
  styleUrl: './specie-admin.component.scss',
})
export class SpecieAdminComponent implements OnInit {
  species: Specie[] = [];
  speciesConfig: SqlViewDataConfig<Specie>;

  constructor(private specieService: SpecieService) {
    this.speciesConfig = {
      label: 'Espèces',
      data: this.specieService.getAllData(),
      primaryKey: 'specieId',
      displayColumns: [
        {
          key: 'specieName',
          label: 'Nom',
        },
        {
          key: 'specieTaxon',
          label: 'Taxonomie',
        },
        {
          key: 'specieDescr',
          label: 'Description',
        },
        {
          key: 'specieBiome',
          label: 'Habitat',
        },
      ],
      actions: { view: true, edit: true, delete: true },
    };
  }

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies() {
    this.specieService.loadData();
    this.specieService.getAllData().subscribe((data) => {
      this.species = data;
    });
  }
}
