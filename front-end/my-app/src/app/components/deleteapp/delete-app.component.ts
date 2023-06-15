import { Component,Input, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({ // Component decorator
    selector: 'delete-app-component',
    templateUrl: './delete-app.component.html',
  })

  export class DeleteAppComponent implements OnInit { // Input property to receive the student data
    @Input() student: any;
    students: any[] = [];
  
    constructor(private studentService: StudentService ) { } // Constructor with injected StudentService
  
    ngOnInit() {} // Initialization hook called after the component has been initialized.
  
    deleteStudent() {
      const id = this.student.id;  // Get the ID of the student to be deleted
      this.studentService.deleteStudent(id).subscribe( // Call the deleteStudent() method of the studentService, passing the ID of the student to be deleted. Subscribe to the returned observable to handle the asynchronous response of the deletion 
        () => {
          this.studentService.refreshStudents(); // Refresh the list of students after deletion.
          console.log('Student deleted successfully.');
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }