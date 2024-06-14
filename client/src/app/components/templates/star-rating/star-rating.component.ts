import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'arz-star-rating',
  standalone: true,
  imports: [],
  template: `
    @for(star of stars; track $index) {
    <span
      [class]="star ? 'has-text-warning' : 'has-text-grey'"
      style="cursor: pointer"
      (click)="onStarClick($index + 1)"
      >&#9733;</span
    >
    }
  `,
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent implements OnChanges {
  @Input() score: number = 0;
  @Output() scoreChange = new EventEmitter<number>();
  stars: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['score']) {
      this.updateStars();
    }
  }

  updateStars(): void {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i <= this.score);
    }
  }

  onStarClick(newScore: number): void {
    this.score = newScore;
    this.updateStars();
    this.scoreChange.emit(this.score);
  }
}
