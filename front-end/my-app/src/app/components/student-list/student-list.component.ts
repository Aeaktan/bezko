import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})


export class StudentListComponent implements OnInit {
  students: any[] = []; // Array to store student data
  newStudent: any = {}; // Object to store new student data
  showAddStudentForm: boolean = false; // Flag to control the visibility of the add student form

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents(); // Fetches the list of students when the component initializes
    this.studentService.studentsUpdated.subscribe(() => {
      this.getStudents(); // Updates the list of students when changes occur
    });
  }
  toggleEditField(student: any, subject: string) {
    student.editMode = student.editMode || {}; // Toggles the edit mode for a specific subject field of a student
    student.editMode[subject] = !student.editMode[subject];
  }
  
  isEditMode(student: any, subject: string): boolean {
    return student.editMode && student.editMode[subject]; // Checks if the edit mode is enabled for a specific subject field of a student
  }
  
  getStudents() {
    this.studentService.getAllStudents()
      .subscribe(
        students => {
          this.students = students[0]; // Retrieves the list of students from the service and assigns it to the component's students array
        },
        error => console.error(error) // Handles errors that occur while retrieving the list of students
      );
  }
}
