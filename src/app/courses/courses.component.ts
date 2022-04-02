import { Component, OnInit } from '@angular/core';
import { Course } from '../common/models/course';
import { CoursesService } from '../common/services/courses.service';

const emptyCourse: Course = {
  id: null,
  title: '',
  description: '',
  percentComplete: 0,
  favorite: false,
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses = [];
  selectedCourse = emptyCourse;
  originalTitle = '';

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }


  selectCourse(course) {
    this.selectedCourse = course;
  }

  fetchCourses() {
    this.coursesService.all()
      .subscribe((result: any) => this.courses = result)

  }

  saveCourse(course) {
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.createCourse(course);
    }
    console.log(course);
  }

  createCourse(course) {
    this.coursesService.create(course)
      .subscribe(result => this.fetchCourses());
  }

  updateCourse(course) {
    this.coursesService.update(course)
      .subscribe(result => this.fetchCourses());
  }

  deleteCourse(courseId) {
    this.coursesService.delete(courseId)
      .subscribe(result => this.fetchCourses());
  }

  reset() {
    this.selectCourse({...emptyCourse})
  }
}
