import * as Auth0 from "auth0-web";
import { Component, OnDestroy, OnInit, ViewChild, Inject } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { Opp } from "../listings/opp.model";
import { OppsApiService } from "../listings/opps-api.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

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
            <select
              matNativeControl
              required
              (change)="changeSearchType($event)"
              #selectedAlbum
              [(ngModel)]="mySelectedItem"
            >
              <option value="both">Both</option>
              <option value="musician">Musicians ONLY</option>
              <option value="group">Groups ONLY</option>
            </select>
          </mat-form-field>
          <mat-form-field id="filter">
            <input
              matInput
              (keyup)="applyFilter($event.target.value)"
              placeholder="Search"
            />
          </mat-form-field>
          <span id="listingTip"><em>*Sign in to create listings</em></span>

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
                  {{ row.description.substring(0, 40)
                  }}{{ row.description.length > 40 ? "..." : "" }}
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
              <tr
                mat-row
                *matRowDef="let row; columns: displayedColumns"
                (click)="showDetail(row)"
                style="cursor:pointer;"
              ></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
          </div>
        </div>
      </div>
    </section>
  `
})
export class OppsComponent implements OnInit, OnDestroy {
  oppsListSubs: Subscription;
  oppsList: Opp[];
  authenticated = false;
  mySelectedItem: string;
  displayedColumns: string[] = [
    "category",
    "title",
    "description",
    "location",
    "created_at"
  ];
  dataSource: MatTableDataSource<OppData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private oppsApi: OppsApiService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    var searchType = "";
    this.route.params.subscribe(params => {
      searchType = params["searchType"];
      this.oppsListSubs = this.oppsApi.getOpps().subscribe(res => {
        this.oppsList = res;
        var holder = [];
        if (searchType === "musician") {
          this.mySelectedItem = "musician";
          for (let i = 0; i < this.oppsList.length; i++) {
            if (this.oppsList[i].searchType === "musician") {
              holder.push(this.oppsList[i]);
            }
          }
        } else if (searchType === "group") {
          this.mySelectedItem = "group";
          for (let i = 0; i < this.oppsList.length; i++) {
            if (this.oppsList[i].searchType === "group") {
              holder.push(this.oppsList[i]);
            }
          }
        } else {
          this.mySelectedItem = "both";
          holder = this.oppsList;
        }
        this.dataSource = new MatTableDataSource(holder);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, console.error);
    });

    const self = this;

    Auth0.subscribe(authenticated => (self.authenticated = authenticated));
  }

  changeSearchType(event: any) {
    var holder = [];
    if (event.target.value === "musician") {
      for (let i = 0; i < this.oppsList.length; i++) {
        if (this.oppsList[i].searchType === "musician") {
          holder.push(this.oppsList[i]);
          this.location.replaceState("/listings/musician");
        }
      }
    } else if (event.target.value === "group") {
      for (let i = 0; i < this.oppsList.length; i++) {
        if (this.oppsList[i].searchType === "group") {
          holder.push(this.oppsList[i]);
          this.location.replaceState("/listings/group");
        }
      }
    } else if (event.target.value === "both") {
      holder = this.oppsList;
      this.location.replaceState("/listings/");
    }
    this.dataSource = new MatTableDataSource(holder);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  showDetail(opp: any) {
    this.dialog.open(DialogDataExampleDialog, {
      data: opp
    });
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
export interface DialogData {
  category: string;
  title: string;
  description: string;
  location: string;
  contact: string;
  created_at: string;
}
@Component({
  selector: "opps",
  template: `
    <div class="mat-dialog-content">
      <ul>
        <li>
          <h3>{{ data.title }}</h3>
        </li>
        <li>
          <strong>Category:</strong>
          {{ data.category }}
        </li>
        <li><strong>Location:</strong> {{ data.location }}</li>
        <li><strong>Contact:</strong> {{ data.contact }}</li>
        <li>
          <strong>Date:</strong> {{ data.created_at | date: "MMM dd, yyyy" }}
        </li>
        <li class="modDesc">
          <strong>Description:</strong>
          {{ data.description }}
        </li>
      </ul>
    </div>
  `
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
