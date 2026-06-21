import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { JalaliDatePipe } from '../../pipes/jalali-date-pipe';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { interval } from 'rxjs/internal/observable/interval';
import { AsyncPipe } from '@angular/common';
import { CaptionService } from '../../services/caption.service';
import { AppEnvService } from '../../services/app-env';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive, JalaliDatePipe, AsyncPipe, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})

export class NavBar {
  direction: string;
  expandedDropdowns: Set<number> = new Set();
  isSidebarOpen: boolean = false;

  constructor(
    public caption: CaptionService,
    private appEnv: AppEnvService
  ) {
    this.direction = this.appEnv.direction;
  }

  currentTime$ = interval(1000).pipe(
    startWith(0),
    map(() => new Date())
  );

  toggleDropdown(index: number): void {
    if (this.expandedDropdowns.has(index)) {
      this.expandedDropdowns.delete(index);
    } else {
      this.expandedDropdowns.add(index);
    }
  }

  isDropdownOpen(index: number): boolean {
    return this.expandedDropdowns.has(index);
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
}
