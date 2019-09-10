import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable ,  throwError } from 'rxjs';
import {knownFolders} from "tns-core-modules/file-system";

import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiServiceTns {
    constructor(private http: HttpClient) { }

    get(): Observable<any> {
        let appFolder: any = knownFolders.currentApp();
        return appFolder.getFile("config/config.json");
    }
}