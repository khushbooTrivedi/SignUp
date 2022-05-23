import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private accontService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.accontService.logout().subscribe({
      next: (data) => {
        this.router.navigate(['/account/login']);
      },
      error: (e) => {
        ///TO DO
      },
    });
  }
}
