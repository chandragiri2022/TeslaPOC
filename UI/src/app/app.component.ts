import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'username' },
    { field: 'password' },
    { field: 'role' }
  ];

  //Id = 1, FirstName = "Test",  = "User",  = "test", Password = "test",Role="admin" },

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$: any;//!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient) { }

  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    // this.rowData$ = this.http
    //   .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');



    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYmYiOjE2NzE1MTgyMTMsImV4cCI6MTY3MjEyMzAxMywiaWF0IjoxNjcxNTE4MjEzfQ.gySAugfEEtipQTjqYgLG0zo99SMrMX8xCd_aLznaGkw"
    });

    this.http.get("http://localhost:4000/Users/GetDate", { headers: reqheaders }).subscribe(
      (resp: any) => {
        this.rowData$ = resp;// = console.log(resp);
      }
    );
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
