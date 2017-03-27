import { Component, OnInit } from '@angular/core';
import { Driver } from "app/experiment/models/driver";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { Http } from "@angular/http";

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {

  public drivers : Driver[];

  constructor(private http: Http) { }

  public getDrivers() : Observable<Driver[]> {
    return this.http.get(`http://ergast.com/api/f1/2017/drivers.json`).map(response => response.json().MRData.DriverTable.Drivers);
  }

  ngOnInit() {
    this.getDrivers().subscribe(x => {this.drivers = x});
  }

}
