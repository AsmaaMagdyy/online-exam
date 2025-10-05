import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ExamsService } from '../../../core/services/exams/exams.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../../core/services/logging.service';
import { ActivatedRoute } from '@angular/router';
import { Iexam } from '../../../core/interfaces/iexam';
import { SubjectsService } from '../../../core/services/subjects/subjects.service';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { BlueButtonComponent } from "../../../shared/components/blue-button/blue-button.component";
import { QuestionsComponent } from "../questions/questions.component";
import { Store } from '@ngrx/store';
import { loadQuestions } from '../../../store/questions/questions.actions';
import { ScoreComponent } from "../../../shared/components/score/score.component";
import { ShowWrongUserResultsComponent } from "../../../shared/components/show-wrong-user-results/show-wrong-user-results.component";


@Component({
  selector: 'app-exams',
  imports: [ButtonModule, Dialog, BlueButtonComponent, QuestionsComponent, ScoreComponent, ShowWrongUserResultsComponent],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
  
})
export class ExamsComponent implements OnInit, OnDestroy {
  examName: WritableSignal<string> = signal('');
  _examsService = inject(ExamsService);
  _SubjectsService = inject(SubjectsService);
  _loggingService = inject(LoggingService);
  _activatedRoute = inject(ActivatedRoute);
  getAllExamsOnSubjectSub!: Subscription;
  getSingleSubjectSub!: Subscription;
  queryParamMapSub!: Subscription;
  subjectId: WritableSignal<string> = signal('');
  examsList: WritableSignal<Iexam[]> = signal([]);

  visible: boolean = false;
  
  view!: 'exam' | 'score' | 'results';
  _store = inject(Store);
  exam: Iexam = {} as Iexam;





  ngOnInit(): void {
    this.getSubjectIdFromQueryParam();

  }


  getSubjectIdFromQueryParam(): void {

    this.queryParamMapSub = this._activatedRoute.queryParamMap.subscribe(params => {
      this.subjectId.set(params.get('subject') ?? '');
      this.getQuizNameFromSingleSubject();
      this.getAllExamsOnSubject();
    });
    this._loggingService.logData(this.subjectId());

  }


  getAllExamsOnSubject(): void {
    this.getAllExamsOnSubjectSub = this._examsService.getAllExamsOnSubject(this.subjectId()).subscribe({
      next: (res) => {
        this._loggingService.logData(res);
        this.examsList.set(res);

      }
    })
  }
  getQuizNameFromSingleSubject(): void {
    this.getSingleSubjectSub = this._SubjectsService.getSingleSubject(this.subjectId()).subscribe({
      next: (res) => {
        this._loggingService.logData(res.name);
        this.examName.set(res.name);

      }
    })
  }

  showDialog(examId: string, exam: Iexam) {
    this.exam = exam;
    this.visible = true;
    this.storeAllQuestionsOnExamInStore(examId);
  }

 
  storeAllQuestionsOnExamInStore(examId: string) {

    this._store.dispatch(loadQuestions({ examId: examId }));


  }

   showExam():void {
    this.visible = false;
    this.view = 'exam';

  }

  onQuestionsDone(): void {
    this.view = 'score';

  }

  showResults(): void {
    this.view = 'results';

  }
 

  ngOnDestroy(): void {
    this.getAllExamsOnSubjectSub?.unsubscribe();
    this.queryParamMapSub?.unsubscribe();
    this.getSingleSubjectSub?.unsubscribe();
  }

}
