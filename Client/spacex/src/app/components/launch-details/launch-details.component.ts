import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceXDataDetails } from 'src/app/models/models';
import { SpaceXDataService } from 'src/app/services/spacex-data.service';

@Component({
  selector: 'app-launch-details',
  templateUrl: './launch-details.component.html',
  styleUrls: ['./launch-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchDetailsComponent implements OnInit {
  public data: SpaceXDataDetails | undefined;
  public loading = true;

  constructor(private readonly service: SpaceXDataService, private readonly route: ActivatedRoute, private readonly cd: ChangeDetectorRef){
  }
  ngOnInit(): void {
    this.service.getSpaceXLaunchDetails(this.route.snapshot.params['id']).subscribe((data)=>{
      this.data = data;
      this.loading = false;
      this.cd.markForCheck();
    })
  }

}
