import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSearch() {
    let value = this.queryField.value;


    if (value && (value = value.trim()) !== "") {
      const fields = 'name,description,version,homepage';

      const params = {
        search: value,
        fields: fields
      }
      this.results$ = this.http
        .get(
          this.SEARCH_URL, { params}
        )
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
