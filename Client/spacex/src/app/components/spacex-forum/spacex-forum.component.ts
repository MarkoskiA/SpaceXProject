
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceXApiType } from 'src/app/models/enums';
import { SpaceXData } from 'src/app/models/models';
import { SpaceXDataService } from 'src/app/services/spacex-data.service';

@Component({
  selector: 'app-spacex-forum',
  templateUrl: './spacex-forum.component.html',
  styleUrls: ['./spacex-forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaceXForumComponent implements OnInit {
  public loading = true;
  public data: SpaceXData[] = [];
  constructor(private readonly service: SpaceXDataService,
    private readonly cd: ChangeDetectorRef,
    private readonly url: ActivatedRoute
  ){}
  ngOnInit(): void {

    this.service.getSpaceXLaunches(this.url.routeConfig?.path as SpaceXApiType).subscribe((data) =>{
      if(!Array.isArray(data)){
        this.data = [data]
      }
      else{
        this.data = data;
      }
      this.loading = false;
      this.cd.markForCheck();
    })
   }

}
