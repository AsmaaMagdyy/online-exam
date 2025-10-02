import { Component, EventEmitter, inject, input, OnDestroy, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from "primeng/button";
import { Store } from '@ngrx/store';
import { Iquestions } from '../../../core/interfaces/iquestions';
import { interval, map, Subscription, takeWhile, tap } from 'rxjs';
import {setUserChoices } from '../../../store/questions/questions.actions';
import { Iexam } from '../../../core/interfaces/iexam';
import { IuserChoices } from '../../../core/interfaces/iuser-choices';
import { FormsModule } from '@angular/forms';
import { LoggingService } from '../../../core/services/logging.service';
import { ToastrService } from 'ngx-toastr';
import { questionState } from '../../../store/questions/questions.state';
import { selectAllQuestions } from '../../../store/questions/questions.selector';

@Component({
  selector: 'app-questions',
  imports: [Dialog, Button, FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent implements OnInit ,OnDestroy {
  visible: boolean = true;
  _store = inject(Store);
  questionsList!: Iquestions[]
  currentQuestion!: Iquestions;
  questionsArrLength!: number;
  counter: number = 0;
 

  examInfo = input.required<Iexam>();
  @Output() done = new EventEmitter<void>();
  

  userChoicesArr: IuserChoices[] = [];
  selectedAnswers: { [key: number]: string } = {}; // key = question index
  _loggingService = inject(LoggingService);
  _toastrService = inject(ToastrService);
  remainingSeconds: number = 0;

  timerSub!: Subscription;
  questionsSub!:Subscription;
  remainingTime!: string;


  getAllQuestionsOnExam() {
   this.questionsSub = this._store.select(selectAllQuestions).subscribe({
      next: (res: Iquestions[]) => {
        this.questionsList = res;
        this.currentQuestion = this.questionsList[this.counter];
        this.questionsArrLength = this.questionsList.length;
      }
    })
  }
  ngOnInit(): void {
    this.getAllQuestionsOnExam();
    const duration = this.examInfo().duration;
    const totalSeconds = duration * 60;

    this.startCountdown(totalSeconds);
  }

  userChoice(key: string): void {
    this.selectedAnswers[this.counter] = key; // Save selected answer for current question
    this._loggingService.logData(this.selectedAnswers);

    const obj: IuserChoices = {
      answers: this.currentQuestion.answers,
      type: this.currentQuestion.type,
      _id: this.currentQuestion._id,
      question: this.currentQuestion.question,
      correct: this.currentQuestion.correct,
      userChoice: key
    };

    // update if answer already exists in array
    let index = this.userChoicesArr.findIndex(q => q._id === this.currentQuestion._id);
    if (index !== -1) {
      if (key == this.userChoicesArr[index].correct) {
        this.userChoicesArr.splice(index, 1);

      } else {
        this.userChoicesArr[index] = obj;

      }
    } else {
      if (key != this.currentQuestion.correct) {
        this.userChoicesArr.push(obj);
      }

    }

    this._loggingService.logData(this.userChoicesArr);
    this.storeUserChoicesToStore();


  }


  storeUserChoicesToStore() {
    let arr = structuredClone(this.userChoicesArr);
    this._store.dispatch(setUserChoices({ userChoices: arr }));
  }

  nextQuestion() {
    this.counter++;
    if (this.counter < this.questionsArrLength) {
      this.currentQuestion = this.questionsList[this.counter];

    } else if (this.counter == this.questionsArrLength) {
      this._loggingService.logData('finish');
      this.showScore();


    }
  }
  prevQuestion() {
    if (this.counter > 0) {
      this.counter--;
      this.currentQuestion = this.questionsList[this.counter];


    } else if (this.counter == 0) {
      this._loggingService.logData('this is first Q');

    }
  }

  startCountdown(totalSeconds: number): void {
 this.timerSub = interval(1000).pipe(
    map(elapsed => totalSeconds - elapsed),
    takeWhile(secondsLeft => secondsLeft >= 0),
    tap(secondsLeft => {
      this.remainingSeconds = secondsLeft;
      if (secondsLeft === 30) {
        this.handleTimeUp();
      }
    }),
    map(secondsLeft => this.formatTime(secondsLeft))
  ).subscribe(formatted => {
    this.remainingTime = formatted;
  });
    
  }

  formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  handleTimeUp(): void {
    // TODO: Submit test, lock UI, etc.
    this._toastrService.warning('Time is running out', this.examInfo().title, {
      positionClass: 'toast-top-center'
    })
    setTimeout(() => {
      this.visible = false;
    }, 30000);

  }


  showScore() {
    this.done.emit();
  }

  ngOnDestroy(): void {
    this.questionsSub?.unsubscribe()
    this.timerSub?.unsubscribe()
  }


}
