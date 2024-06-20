import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  stdform!: FormGroup;
  stdId: any;
  courses: string[] = ['Mathematics', 'Science', 'History', 'Literature'];
  hobbies: string[] = ['Reading', 'Sports', 'Music', 'Traveling'];

  constructor(
    private fb: FormBuilder,
    private service: ApiserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form group
    this.stdform = this.fb.group({
      stdname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      stdage: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
      ],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      // Initialize each hobby checkbox with a false value
      Reading: [false],
      Sports: [false],
      Music: [false],
      Traveling: [false],
    });
    this.route.params.subscribe((params) => {
      console.log(params);
      this.stdId = params['id'];
      console.log(this.stdId);
      if (this.stdId) {
        this.getStudentDetails(this.stdId);
      }
    });
  }

  getStudentDetails(id: any) {
    this.service.editStd(id).subscribe(
      (response: any) => {
        const studentData = response.data;
        console.log(studentData);
        let hobbiesArray = studentData[0]['hobbies'].split(', ');
        console.log(hobbiesArray);
        if (studentData.length > 0) {
          const form = this.stdform;
          form.controls['stdname'].setValue(studentData[0]['name']);
          form.controls['stdage'].setValue(studentData[0]['age']);
          form.controls['gender'].setValue(studentData[0]['gender']);
          form.controls['course'].setValue(studentData[0]['course']);
          // Set the hobbies checkboxes to true
          hobbiesArray.forEach((myhobby: any) => {
            if (this.hobbies.includes(myhobby)) {
              form.controls[myhobby].setValue(true);
            }
          });
        }
      },
      (error) => {
        console.log('Error fetching student details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.stdform.valid) {
      const formData = { ...this.stdform.value };
      formData.hobbies = this.hobbies.filter(
        (hobby) => this.stdform.value[hobby]
      );
      // Remove the individual hobby fields from formData
      this.hobbies.forEach((hobby) => delete formData[hobby]);
      console.log('Form Submitted', formData);
      this.service.insertStd(formData).subscribe(
        (response) => {
          console.log('response from server==>', response);
          this.stdform.reset();
        },
        (error) => {
          console.log('error==>>', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onUpdate(): void {
    if (this.stdform.valid) {
      const updateData = { ...this.stdform.value };
      updateData.hobbies = this.hobbies.filter(
        (hobby) => this.stdform.value[hobby]
      );
      this.hobbies.forEach((hobby) => delete updateData[hobby]);
      console.log('update Form==>', updateData);
      this.service.updateStd(updateData, this.stdId).subscribe(
        (response) => {
          console.log('update Res==>', response);
          this.stdform.reset();
        },
        (error) => {
          console.log('update error==>', error);
        }
      );
    } else {
      console.log('Update form is Invalid!');
    }
  }
}
