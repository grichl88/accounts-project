import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Account } from '../models/account.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    constructor (
        private apiService: ApiService
    ) {}

    getAll(): Observable<Account[]> {
        return this.apiService.get('')
            .pipe(map((data) => {
                return data.map((account) => {
                    return new Account().deserialize(account);
                });
            }));
    }

    get(id): Observable<Account> {
        return this.apiService.get('' + id)
            .pipe(map(data => data));
    }

    destroy(id) {
        return this.apiService.delete('' + id);
    }

    save(account: Account): Observable<Account[]> {

        if(account.Id) {
            return this.apiService.put('' + account.Id, account )
                .pipe(map((data) => {
                    return data;
                }));
        } else {
            return this.apiService.post('', { account })
                .pipe(map((data) => data));
        }
    }

}