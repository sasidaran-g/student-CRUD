import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  BASE_URL = 'http://localhost:4000';
  constructor(private http: HttpClient) {}
  getStudents() {
    const geturl = this.BASE_URL + '/getStudentData';
    return this.http.get<any[]>(geturl);
  }
  insertStd(data: any) {
    const geturl = this.BASE_URL + '/insertStudent';
    return this.http.post<any[]>(geturl, data);
  }
  editStd(studentId: any): Observable<any> {
    console.log(studentId);
    return this.http.get(`${this.BASE_URL}/getEditStudent/${studentId}`);
  }
  updateStd(data: any, id: any): Observable<any> {
    console.log('updateStd-->', data);
    console.log('updateStd-->', id);
    return this.http.put(`${this.BASE_URL}/updateStudent/${id}`, data);
  }
  deleteStd(id: any): Observable<any> {
    console.log('id to delete:', id);
    const deleteId = id;
    const url = `${this.BASE_URL}/deleteStudent/${deleteId}`;
    console.log('Delete URL:', url);
    return this.http.delete(url);
  }
}
