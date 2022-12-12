import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Formularios } from 'src/app/shared/functions/formularios';
import { Toaster } from 'src/app/shared/functions/toaster';
import { GlobalService } from 'src/app/shared/services/global.service';
import { Pessoas } from '../../pessoas/pessoas';

@Component({
  selector: 'app-cadastrar-se',
  templateUrl: './cadastrar-se.component.html',
  styleUrls: ['./cadastrar-se.component.css']
})
export class CadastrarSeComponent implements OnInit {
  form!: FormGroup;
  spinner = true;

  constructor(
    public dialogRef: MatDialogRef<CadastrarSeComponent>,
    @Inject(MAT_DIALOG_DATA) public codigo: any,
    private service: GlobalService,
  ) {
    this.spinner = false;
    this.form = Formularios.geraFormulario(new Pessoas());
  }

  ngOnInit(): void {}

  salvar(): void {
    this.spinner = true;
    if (this.form.valid) {
      this.service
        .cadastrarUsuario(this.form.value)
        .pipe(take(1))
        .subscribe({
          next: (data: any) => {
            this.dialogRef.close();
            Toaster.Success(Toaster.msg.RegistroSalvo);
          },
          error: (error) => {
            this.spinner = false;
            Toaster.Error(error.error);
          },
          complete: () => {
            this.spinner = false;
          },
        });
    } else {
      this.spinner = false;
      this.form.markAllAsTouched();
      Toaster.Warning(Toaster.msg.FormularioInvalido);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
