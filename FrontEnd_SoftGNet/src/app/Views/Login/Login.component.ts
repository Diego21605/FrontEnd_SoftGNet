import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/Authentication.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../Services/Messages/Messages.service';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './Login.component.html',
    styleUrl: './Login.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginComponent implements OnInit {

    load: boolean = false;
    formLogin: FormGroup<any>;

    constructor(private frmBuilder: FormBuilder,
        private authorizeService: AuthenticationService,
        private router: Router,
        private msg: MessagesService,) {
        this.formLogin = this.frmBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    ngOnInit(): void {
    }

    sendDataLogin() {
        this.load = true;
        this.authorizeService.login(this.formLogin.value).subscribe(() => {
            this.load = false;
            this.router.navigate(['./home']);
        }, error => {
            this.msg.errorHttp(`¡Ocurrió un error al iniciar sesión!`, error);
            this.load = false;
        }, () => this.load = false);
    }
}
