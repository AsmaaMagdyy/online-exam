import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef, effect, input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ChartModule } from 'primeng/chart';

import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../../core/services/logging.service';
import { questionState } from '../../../store/questions/questions.state';



@Component({
  selector: 'app-score',
  imports: [Dialog, ButtonModule,ChartModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent implements OnInit,OnDestroy {
  visible: boolean = true;
  resultsDialogVisible: boolean = false;
  _store = inject(Store);
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  rightChoices: number = 0;
  rightChoicesPercent: number = 0;
  wrongChoices: number = 0;
  questionsSub!:Subscription; 
  _loggingService=inject(LoggingService);
  @Output() close = new EventEmitter<void>();
  @Output() showResult = new EventEmitter<void>();





  constructor(private cd: ChangeDetectorRef) { }



  ngOnInit() {
    this.questionsSub = this._store.select('questions').subscribe({
      next: (res: questionState) => {
        this.rightChoices = res.questions.length - res.userChoices.length;
        this.wrongChoices = res.userChoices.length;
        this.rightChoicesPercent = Math.round((this.rightChoices * 100)/res.questions.length);
       this._loggingService.logData(res.userChoices.length);
       this._loggingService.logData( res.questions.length);

      }
    })
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {



      this.data = {

        datasets: [
          {
            data: [this.rightChoices, this.wrongChoices],
            backgroundColor: ['rgb(2,54,156)', 'rgb(204,16,16)'],
            borderWidth: 2,
            offset: 0
          }
        ]

      };
      this.options = {
        cutout: '90%',
        plugins: {
          legend: {
            labels: {

            }
          }
        }
      };
      this.cd.markForCheck()


    }
  }
ngOnDestroy(): void {
    this.questionsSub?.unsubscribe()
  
}



 

}
