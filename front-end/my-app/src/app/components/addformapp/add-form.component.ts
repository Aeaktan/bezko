import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'add-form-component',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})

export class AddFormComponent implements OnInit {
  students: any[] = []; // Array to store students
  newStudent: any = {}; // Object to hold the details of a new student
  showAddStudentForm: boolean = false; // Flag to control the visibility of the add student form

  constructor(private studentService: StudentService) {} // Constructor for the AddFormComponent class. Injects the StudentService dependency to be used for adding students

  ngOnInit() {} // Initialization logic for the component

  addStudent() {
    this.studentService.addStudent(this.newStudent).subscribe(
      (response: any) => {
        this.students.push(response.student); // Add the new student to the array
        this.newStudent = {}; // Clear the new student object
        console.log(response.message);
        this.closeAddStudentForm(); // Close the add student form
        this.studentService.refreshStudents(); // Refresh the list of students
      },
      (error: any) => { // Handle error if adding student fails
        console.error(error);
      }
    );
  }

  openAddStudentForm() { // Function to open the add student form
    this.showAddStudentForm = true;
  }

  closeAddStudentForm() { // Function to close the add student form
    this.showAddStudentForm = false;
  }
}
