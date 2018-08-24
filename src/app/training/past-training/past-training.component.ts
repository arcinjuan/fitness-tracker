import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Subscription } from 'rxjs';

import { Excercise } from '../excercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,  AfterViewInit, OnDestroy{
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Excercise>();
  private exChangedSubscription: Subscription;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExcercisesChanged.subscribe((excercises: Excercise[]) => {
      this.dataSource.data = excercises;
    });
  	this.trainingService.fetchCompletedOrCancelledExcercises();
  }

  ngAfterViewInit() {
  	this.dataSource.sort = this.sort;
  	this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue:string) {
  	this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }
}
