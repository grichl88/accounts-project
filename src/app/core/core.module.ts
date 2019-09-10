import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './interceptors/http.interceptor';
import { ModalModule } from '../_modal/modal.module';

import { ApiService } from './services/api.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
        ApiService,
        ModalModule
    ],
    declarations: []
})
export class CoreModule {}
