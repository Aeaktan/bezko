import { Component, Input, HostListener, ElementRef } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-update-grades',
  templateUrl: './update-grades.component.html',
  styleUrls: ['./update-grades.component.css']
})
export class UpdateGradesComponent {
  @Input() student: any; // Input property to receive the student object
  @Input() subject: string = ''; // Input property to receive the subject
  isEditMode: boolean = false; // Flag to control edit mode

  constructor(private studentService: StudentService, private elementRef: ElementRef) { }

  handleInput() {  // Restricts the grade value to be within the range of 1 to 6
    if (this.student[this.subject] > 6) {
      this.student[this.subject] = 6;
    }

    if (this.student[this.subject] < 1) {
      this.student[this.subject] = 1;
    }
  }

  onGradeUpdate() { // Updates the grade based on the selected subject
    if (this.subject === 'math') { 
      this.studentService.updateMathGrade(this.student.id, this.student.math)
        .subscribe(
          updatedStudent => {
            console.log('Math grade updated:', updatedStudent);
            this.student.editMode[this.subject] = false;
          },
          error => console.error(error)
        );
    } else if (this.subject === 'history') {
      this.studentService.updateHistoryGrade(this.student.id, this.student.history)
        .subscribe(
          updatedStudent => {
            console.log('History grade updated:', updatedStudent);
            this.student.editMode[this.subject] = false;
          },
          error => console.error(error)
        );
    } else if (this.subject === 'wf') {
      this.studentService.updateWFGrade(this.student.id, this.student.wf)
        .subscribe(
          updatedStudent => {
            console.log('WF grade updated:', updatedStudent);
            this.student.editMode[this.subject] = false;
          },
          error => console.error(error)
        );
    }
  }
  @HostListener('document:keydown.enter') // Triggers the grade update when the Enter key is pressed
  onEnterKey() {
    if (this.isEditMode) {
      this.onGradeUpdate();
    }
  }

  @HostListener('document:click', ['$event']) // Closes the edit mode when a click occurs outside the component
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isEditMode = false;
    }
  }
}
