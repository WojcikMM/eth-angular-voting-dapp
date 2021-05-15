import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'voting-dapp-page-title-bar',
  templateUrl: './page-title-bar.component.html',
  styleUrls: ['./page-title-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleBarComponent {
  @Input()
  title?: string;

  @Input()
  actionButtonText?: string;

  @Output()
  actionButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();
}
