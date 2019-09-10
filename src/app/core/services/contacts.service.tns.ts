import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { ApiServiceTns } from './api.service.tns';
import { Contact } from '../models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactsServiceTns {
    constructor (
        private apiService: ApiServiceTns
    ) {}
}