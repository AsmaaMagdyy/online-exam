import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SubjectsService } from '../../../core/services/subjects/subjects.service';
import { LoggingService } from '../../../core/services/logging.service';
import { Isubject } from './../../../core/interfaces/isubjects';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  imports: [RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.scss'
  
})
export class DashBoardComponent implements OnInit, OnDestroy {

  _subjectsService = inject(SubjectsService);
  _loggingService = inject(LoggingService);
  subjectsList: WritableSignal<Isubject[]> = signal([]);
  getAllSubjectsSub!: Subscription;


  ngOnInit(): void {
    this.getAllSubjects(6);
  }

  getAllSubjects(limit?: number): void {
    this.getAllSubjectsSub = this._subjectsService.getAllSubjects(limit).subscribe({
      next: (res) => {
        this.subjectsList.set(res);
        this._loggingService.logData(this.subjectsList());
      }
    })
  }

  viewAllSubjects(): void {
    this.getAllSubjects();
  }

  ngOnDestroy(): void {
    this.getAllSubjectsSub?.unsubscribe();
  }
}
