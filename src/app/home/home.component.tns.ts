import { Component, OnInit } from '@angular/core';
import { AccountsServiceTns } from '../core/services/accounts.service.tns';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.tns.html',
    styleUrls: ['./home.component.scss'],
    providers: [AccountsServiceTns]
})
export class HomeComponentTns implements OnInit {
    title = 'Your Accounts';
    accounts: Object;
    loading = true;
    panels = [];
    constructor( private data: AccountsServiceTns) { }

    ngOnInit() {
        this.accounts = this.data.getAll();
        this.loading = false;
    }
}
