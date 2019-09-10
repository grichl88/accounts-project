import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Contact } from '../models/contact.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactsService {
    constructor (
        private apiService: ApiService
    ) {}

    getAll(id): Observable<Contact[]> {
        return this.apiService.get('' + id + '/contacts')
            .pipe(map((data) => {
                return data.map((contact) => {
                    return new Contact().deserialize(contact);
                });
            }));
    }

    get(id): Observable<Contact> {
        return this.apiService.get('contacts/' + id)
            .pipe(map(data => data));
    }

    destroy(id) {
        return this.apiService.delete('contacts/' + id);
    }

    save(contact: Contact): Observable<Contact[]> {

        // let json = accounts.map((account: any) => {
        //     let records = [];
        //     account.Contacts.forEach((contact) => {
        //         records.push(contact);
        //     });
        //     account.Contacts = {
        //         records: records
        //     };
        //     return account;
        // });
        if(contact.Id) {
            this.apiService.put('', { contact });
        } else {
            this.apiService.post('', { contact });
        }

        return this.apiService.get('')
            .pipe(map((data) => {
                return data.map((contact) => {
                    return new Contact().deserialize(contact);
                });
            }));
    }

}