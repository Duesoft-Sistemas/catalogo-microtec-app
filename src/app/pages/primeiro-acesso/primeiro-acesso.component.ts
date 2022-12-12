import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PrimeiroAcesso } from 'src/app/shared/classes/primeiro-acesso';
import { Formularios } from 'src/app/shared/functions/formularios';
import { Toaster } from 'src/app/shared/functions/toaster';
import { AuthStorageService } from 'src/app/shared/guards/auth-storage.service';
import { GlobalService } from 'src/app/shared/services/global.service';
import { environment } from 'src/environments/environment';
import { UsuarioLogin } from '../login/login.model';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {
  formulario: FormGroup;
  spinner = false;
  modelo: UsuarioLogin = new UsuarioLogin();
  autenticado = false;

  constructor(
    private authStorageService: AuthStorageService,
    private router: Router,
    private service: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PrimeiroAcessoComponent>
  ) {
    if (localStorage.getItem('tokenCatalogo')) {
      this.router.navigate(['inicio']);
    }
    this.formulario = Formularios.geraFormulario(new PrimeiroAcesso(data));
    this.formulario.get('schema').setValue(environment.Schema);
  }

  ngOnInit() {}

  enviarSenha() {
    this.modelo = new UsuarioLogin();
    this.modelo.company = this.formulario.value.company;
    this.modelo.password = this.formulario.value.password;
    this.modelo.schema = this.formulario.value.schema;
    this.modelo.user = this.formulario.value.user;
    this.service
      .login(this.modelo)
      .pipe(take(1))
      .subscribe({
        next: (data: any) => {
          Toaster.Success('Senha criada com sucesso!!!');
          this.dialogRef.close();
        },
        error: (error) => {
          Toaster.Error('Erro ao criar a senha de primeiro acesso');
        },
      });
  }

}
