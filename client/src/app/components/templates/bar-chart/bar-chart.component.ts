import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'arz-bar-chart',
  standalone: true,
  template: `
    <div>
      <canvas id="barChart" [style.height.px]="canvasHeight"></canvas>
    </div>
  `,
  styles: [
    `
      canvas {
        width: 100% !important;
      }
    `,
  ],
})
export class BarChartComponent implements OnChanges, OnDestroy {
  @Input() data: any[] = [];
  private chart: Chart | null = null;
  canvasHeight: number = 40;

  constructor() {}

  ngOnChanges(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  createChart(): void {
    this.destroyChart();

    const labels = this.data.map((item) => item._id.animalName);
    const counts = this.data.map((item) => item.count);

    // Définir la hauteur du canvas en fonction du nombre de données
    this.canvasHeight = (this.data.length + 1) * 40;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de clics',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return Number(value).toLocaleString();
              },
              autoSkip: true, // Sauter les étiquettes automatiquement pour éviter le chevauchement
              maxTicksLimit: 10, // Limiter le nombre d'étiquettes affichées
            },
          },
        },
        maintainAspectRatio: false,
      },
    };

    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, config);
    }
  }

  destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
