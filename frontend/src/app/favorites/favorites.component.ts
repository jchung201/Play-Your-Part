import * as Auth0 from "auth0-web";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { Opp } from "../listings/opp.model";
import { OppsApiService } from "../listings/opps-api.service";

export interface OppData {
  category: string;
  title: string;
  description: string;
  location: string;
}

export interface searchType {
  value: string;
  viewValue: string;
}

@Component({
  selector: "opps",
  template: `
    <section id="main">
      <div class="inner">
        <header class="major special" style="padding-bottom: 0px;">
          <h1>Listings</h1>
        </header>
        <div class="table-wrapper">
          <mat-form-field id="searchType">
            <select matNativeControl required>
              <option value="musc">Musicians ONLY</option>
              <option value="group">Groups ONLY</option>
              <option value="both">Both</option>
            </select>
          </mat-form-field>
          <mat-form-field id="filter">
            <input
              matInput
              (keyup)="applyFilter($event.target.value)"
              placeholder="Search"
            />
          </mat-form-field>

          <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" matSort>
              <!-- ID Column -->
              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Category
                </th>
                <td mat-cell *matCellDef="let row">
                  {{
                    row.category.charAt(0).toUpperCase() + row.category.slice(1)
                  }}
                </td>
              </ng-container>

              <!-- Progress Column -->
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Title
                </th>
                <td mat-cell *matCellDef="let row">{{ row.title }}%</td>
              </ng-container>

              <!-- Description Column -->
              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Description
                </th>
                <td mat-cell *matCellDef="let row">
                  {{ row.description.substring(0, 40) }}
                </td>
              </ng-container>

              <!-- Location Column -->
              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Location
                </th>
                <td mat-cell *matCellDef="let row">{{ row.location }}</td>
              </ng-container>

              <!-- Date Column -->
              <ng-container matColumnDef="created_at">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Date
                </th>
                <td mat-cell *matCellDef="let row">
                  {{ row.created_at | date: "MMM dd, yyyy" }}
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FavoritesComponent implements OnInit, OnDestroy {
  oppsListSubs: Subscription;
  oppsList: Opp[];
  authenticated = false;
  displayedColumns: string[] = [
    "category",
    "title",
    "description",
    "location",
    "created_at"
  ];
  dataSource: MatTableDataSource<OppData>;
  searchTypes: searchType[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private oppsApi: OppsApiService) {}

  ngOnInit() {
    this.oppsListSubs = this.oppsApi.getOpps().subscribe(res => {
      this.oppsList = res;
      console.log(this.oppsList);
      this.dataSource = new MatTableDataSource(this.oppsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, console.error);
    this.dataSource = new MatTableDataSource(this.oppsList);
    const self = this;

    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.oppsListSubs.unsubscribe();
  }

  delete(oppId: number) {
    this.oppsApi.deleteOpp(oppId).subscribe(() => {
      this.oppsListSubs = this.oppsApi.getOpps().subscribe(res => {
        this.oppsList = res;
      }, console.error);
    }, console.error);
  }

  isAdmin() {
    if (!Auth0.isAuthenticated()) return false;

    const roles = Auth0.getProfile()["https://online-opps.com/roles"];
    if (roles) {
      return roles.includes("admin");
    }
    return false;
  }
}
