import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const data = require("./data.json");

// import { ApiServiceTns } from './api.service.tns';
import { Account } from '../models/account.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AccountsServiceTns {
    constructor (
        // private apiService: ApiServiceTns
    ) {}

    getAll(): Observable<Account[]> {
        return data.api.records.map((account) => {
            return new Account().deserialize(account);
        });
    }

    // getAll(): Observable<Account[]> {
    //     return this.apiService.get()
    //         .pipe(map((data) => {
    //             return data.api.records.map((account) => {
    //                 return new Account().deserialize(account);
    //             });
    //         }));
    // }
}