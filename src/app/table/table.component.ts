import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  readData: any[] = [];
  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.getStdDetials();
  }

  onEdit(editid: any) {
    console.log(editid);
  }

  onDelete(id: any) {
    this.service.deleteStd(id).subscribe((res) => {
      console.log('Delete response==>', res);
      this.getStdDetials();
    });
  }

  public getStdDetials(): void {
    this.service.getStudents().subscribe(
      (response: any) => {
        console.log(response.data);
        this.readData = response.data;
      },
      (error) => {
        console.log('error==>', error);
      }
    );
  }
}
