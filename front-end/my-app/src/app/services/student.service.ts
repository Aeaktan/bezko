import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000'; 

  studentsUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}`);
  }

  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, student);
  }

  updateHistoryGrade(id: number, history: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/history/${id}/${history}`, {});
  }

  updateWFGrade(id: number, wf: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/wf/${id}/${wf}`, {});
  }

  updateMathGrade(id: number, math: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/math/${id}/${math}`, {});
  }
  
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${id}`);
  }

  refreshStudents() {
    this.studentsUpdated.emit();
  }

}
