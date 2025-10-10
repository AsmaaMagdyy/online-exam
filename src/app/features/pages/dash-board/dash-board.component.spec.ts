import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashBoardComponent } from "./dash-board.component"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { SubjectsService } from "../../../core/services/subjects/subjects.service";
import { LoggingService } from "../../../core/services/logging.service";
import { Isubject } from "../../../core/interfaces/isubjects";
import { of, Subscription } from "rxjs";
import { RouterTestingModule } from '@angular/router/testing';
import { By } from "@angular/platform-browser";

fdescribe('DashBoard Component', () => {

  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;
  let httpTestingController: HttpTestingController;
  const mockSubjects: Isubject[] = [{ _id: '1', name: 'Math', icon: 'math.svg', createdAt: 'date1' }];

  const subjectsService = {
    getAllSubjects: jasmine.createSpy('getAllSubjects').and.returnValue(of(mockSubjects))
  }

  const loggingService = {
    logData: jasmine.createSpy('logData')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashBoardComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: SubjectsService, useValue: subjectsService }, { provide: LoggingService, useValue: loggingService }]

    }).compileComponents();

    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  })
  afterEach(() => {
    httpTestingController.verify();
  })

  it('component should be created', () => {
    expect(component).toBeTruthy();
    expect(subjectsService.getAllSubjects).toHaveBeenCalledWith(6);
    expect(component.subjectsList()).toEqual(mockSubjects);
  })

  describe('varibles initialize correctly', () => {
    it('subjectsList should be initialize', () => {
      expect(component.subjectsList()).toEqual([{ _id: '1', name: 'Math', icon: 'math.svg', createdAt: 'date1' }]);
      expect(component.subjectsList().length).toBe(1);
    })


    it('should have a defined Subscription object after ngOnInit', () => {

      expect(component.getAllSubjectsSub).toBeDefined();
      expect(component.getAllSubjectsSub instanceof Subscription).toBeTrue();

    });
  })
  it('should call logging service after subjects are loaded', () => {
    expect(loggingService.logData).toHaveBeenCalledWith(mockSubjects);
  });
  describe('viewAllSubjects function', () => {
    it('should call getAllSubjects with no limit when viewAllSubjects is called', () => {

      component.viewAllSubjects();
      expect(subjectsService.getAllSubjects).toHaveBeenCalledWith(undefined);


    });
    it('the numbers of div elements created correctly', () => {
      const subjectsContainer = fixture.debugElement.queryAll(By.css(`[data-idTesting="subjectId"]`));

      expect(subjectsContainer.length).toEqual(1);

    })
  })
  it('should unsubscribe on ngOnDestroy', () => {

    const unsubscribeSpy = spyOn(component.getAllSubjectsSub, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });

})