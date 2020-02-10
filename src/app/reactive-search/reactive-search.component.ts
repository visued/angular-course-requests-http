import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  map,
  tap,
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap
} from "rxjs/operators";

@Component({
  selector: "app-reactive-search",
  templateUrl: "./reactive-search.component.html",
  styleUrls: ["./reactive-search.component.scss"]
})
export class ReactiveSearchComponent implements OnInit {
  queryField = new FormControl();
  SEARCH_URL = "https://api.cdnjs.com/libraries";
  results$: Observable<any>;
  total: number;
  readonly FIELDS = "name,description,version,homepage";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS
          }
        })
      ),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    let value = this.queryField.value;
    const fields = "name,description,version,homepage";

    if (value && (value = value.trim()) !== "") {
      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(map((res: any) => res.results));
    }
  }
}
