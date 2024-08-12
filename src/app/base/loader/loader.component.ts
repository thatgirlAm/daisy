import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [NgxSkeletonLoaderModule, NgFor],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() columns: number = 3;
}
