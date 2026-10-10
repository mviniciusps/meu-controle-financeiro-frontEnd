import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() primaryButtonText = '';
  @Input() secondaryButtonText = '';

  @Output() primaryAction = new EventEmitter<void>();
  @Output() secondaryAction  = new EventEmitter<void>();
}
