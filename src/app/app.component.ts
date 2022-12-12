import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStorageService } from './shared/guards/auth-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  autenticado = false;

  constructor(
    private router: Router,
    private authStorageService: AuthStorageService
  ) {
    this.verificaToken();
  }

  private verificaToken(): void {
    if (this.authStorageService.isLoggedIn()) {
      if (this.authStorageService.isTokenExpired()) {
        this.authStorageService.logout();
      } else {
        this.autenticado = true;
        // document.documentElement.style.setProperty('--color-primary', 'green');
        // document.documentElement.style.setProperty('--font-color', 'red');
      }
    } else {
      this.autenticado = false;
      this.router.navigate(['login']);
      // if (!window.location.href.includes(environment.UrlRedefinirSenha)) {
      //   this.router.navigate(['login']);
      // }
    }
  }
}
