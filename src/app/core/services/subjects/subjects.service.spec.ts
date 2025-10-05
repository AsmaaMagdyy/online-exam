import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SubjectsService } from "./subjects.service";
import { ISingleSubjectRes, Isubject, ISubjectRes, Metadata } from "../../interfaces/isubjects";
import { environment } from "../../environment/environment";
import { map } from "rxjs";

fdescribe('subjects service', () => {

  let subjectsService: SubjectsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], providers: [SubjectsService]
    })
    subjectsService = TestBed.inject(SubjectsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  afterEach(() => {
    httpTestingController.verify();
  })

  it('service should be created', () => {
    expect(subjectsService).toBeTruthy();
  })

  describe('getAllSubjects function', () => {

    const mockSubjects: Isubject[] = [{ _id: '1', name: 'Math', icon: 'math.svg', createdAt: 'date1' }];
    const mockResponse: ISubjectRes = {
      subjects: mockSubjects,
    } as ISubjectRes;

    let subjectsList: Isubject[] = []

    it('should retutn all subjects', () => {

      subjectsService.getAllSubjects().subscribe((response) => {
        subjectsList = response;
      })

      const req = httpTestingController.expectOne(`${environment.baseUrl}/subjects`);
      req.flush(mockResponse);


      expect(subjectsList).toEqual(mockSubjects)
    })
  })

  describe('getSingleSubject function', () => {
    const mockSubject: Isubject = { _id: '670038f7728c92b7fdf43501', name: 'Physics', icon: 'phys.svg', createdAt: 'date2' };
    const mockSingleResponse: ISingleSubjectRes = {
      category: mockSubject
    } as ISingleSubjectRes;

    let subject: Isubject = {} as Isubject;

    it('should return one subject', () => {
      let subjectId = '670038f7728c92b7fdf43501'


      subjectsService.getSingleSubject(subjectId).subscribe((response) => {
        subject = response;
      })

      const req = httpTestingController.expectOne(`${environment.baseUrl}/subjects/${subjectId}`);
      req.flush(mockSingleResponse);


      expect(subject).toEqual(mockSubject)
    })
  })

})