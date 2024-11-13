import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent implements OnInit {

  ngOnInit(): void { }

}
