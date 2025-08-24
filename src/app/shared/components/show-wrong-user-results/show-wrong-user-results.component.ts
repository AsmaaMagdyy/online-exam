import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { IuserChoices } from '../../../core/interfaces/iuser-choices';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../../../core/services/logging.service';
import { selectAllUserChoices } from '../../../store/questions/questions.selector';

@Component({
  selector: 'app-show-wrong-user-results',
  imports: [Dialog, ButtonModule, NgClass, AsyncPipe],
  templateUrl: './show-wrong-user-results.component.html',
  styleUrl: './show-wrong-user-results.component.scss'
})
export class ShowWrongUserResultsComponent implements OnInit {
  visible: boolean = true;
  _store = inject(Store);
  userChoicesAnswers$!:Observable< IuserChoices[]>;
  _loggingService = inject(LoggingService);
  questionsSub!: Subscription;
  @Output() done = new EventEmitter<void>();

  ngOnInit(): void {
    this.userChoicesAnswers$ = this._store.select(selectAllUserChoices);
  }


}
