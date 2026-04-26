import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JalaliDatePipe } from '../../pipes/jalali-date-pipe';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { interval } from 'rxjs/internal/observable/interval';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive, JalaliDatePipe, AsyncPipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
currentTime$ = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );
}
