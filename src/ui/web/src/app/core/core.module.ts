import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { httpInterceptorProviders } from './interceptors';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent,
    ],
    providers: [AuthGuard],
    imports: [
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                httpInterceptorProviders
            ]
        }
    }
}
