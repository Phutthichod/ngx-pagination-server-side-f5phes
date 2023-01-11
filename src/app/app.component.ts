import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

interface IServerResponse {
  items: string[];
  total: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name = 'Angular';
  @Input('data') meals: string[] = ['test', 'test-1', 'test-2'];
  asyncMeals: Observable<string[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncMeals = serverCall(this.meals, page).pipe(
      tap((res) => {
        this.total = res.total;
        this.p = page;
        this.loading = false;
      }),
      map((res) => res.items)
    );
  }
}

function serverCall(
  meals: string[],
  page: number
): Observable<IServerResponse> {
  const perPage = 1;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  let newMeals = [];
  if (page == 1) {
    newMeals = ['test1'];
  } else {
    newMeals = ['test2'];
  }
  //   this.meals = newMeals;

  return of({
    items: newMeals,
    total: 100,
  }).pipe(delay(1000));
}
