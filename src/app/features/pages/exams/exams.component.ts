import { Component, inject, input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ExamsService } from '../../../core/services/exams/exams.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../../core/services/logging.service';
import { ActivatedRoute } from '@angular/router';
import { Iexam } from '../../../core/interfaces/iexam';
import { SubjectsService } from '../../../core/services/subjects/subjects.service';
import { BlueButtonComponent } from "../../../shared/components/blue-button/blue-button.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-exams',
  imports: [ButtonModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent implements OnInit, OnDestroy {
  examName :WritableSignal<string> = signal('');
  _examsService = inject(ExamsService);
  _SubjectsService = inject(SubjectsService);
  _loggingService = inject(LoggingService);
  _activatedRoute = inject(ActivatedRoute);
  getAllExamsOnSubjectSub!: Subscription;
  getSingleSubjectSub!: Subscription;
  queryParamMapSub!: Subscription;
  subjectId:WritableSignal<string | null>  = signal('');
  examsList: WritableSignal<Iexam[]> = signal([]);


  ngOnInit(): void {
    this.subjectId.set(this.getSubjectIdFromQueryParam());
    this.getQuizNameFromSingleSubject(this.subjectId());
    this.getAllExamsOnSubject(this.subjectId());
  }


  getSubjectIdFromQueryParam(): string | null {

    this._activatedRoute.queryParamMap.subscribe(params => {
      this.subjectId.set(params.get('subject'));
    });
    this._loggingService.logData(this.subjectId());
    return this.subjectId();
  }


  getAllExamsOnSubject(subjectId: string | null): void {
    this.getAllExamsOnSubjectSub = this._examsService.getAllExamsOnSubject(subjectId).subscribe({
      next: (res) => {
        this._loggingService.logData(res);
        this.examsList.set(res);

      }
    })
  }
  getQuizNameFromSingleSubject(subjectId: string | null): void {
    this.getSingleSubjectSub = this._SubjectsService.getSingleSubject(subjectId).subscribe({
      next: (res) => {
        this._loggingService.logData(res.name);
        this.examName.set(res.name);

      }
    })
  }
  ngOnDestroy(): void {
    this.getAllExamsOnSubjectSub?.unsubscribe();
    this.queryParamMapSub?.unsubscribe();
    this.getSingleSubjectSub?.unsubscribe();
  }

}
