import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../core/services/accounts.service';
import { ContactsService } from '../core/services/contacts.service';
import { Account } from '../core/models/account.model';
import { Contact } from '../core/models/contact.model';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../_modal/modal.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [HttpClient, AccountsService, ContactsService]
})
export class HomeComponent implements OnInit {
    title = 'Your Accounts';
    accounts: Account[];
    loading = true;
    activeIds: string[] = [];
    edit = false;
    constructor( private accountService: AccountsService, private contactService: ContactsService, private modalService: ModalService ) { }

    ngOnInit() {
        this.accountService.getAll().subscribe((accounts: Account[]) => {
            accounts.map((account: Account) => {
                this.contactService.getAll(account.Id).subscribe((contacts: Contact[]) => {
                    return account.Contacts = contacts;
                });
            });
            this.accounts = accounts;
            this.loading = false;
        });
    }
    editAccount(){
        this.edit = true;
    }
    closeEdit(){
        this.accountService.getAll().subscribe(data => {
            this.accounts = data;
        });
        this.edit = false;
    }
    submit(account){
        this.edit = false;
        this.accountService.save(account).subscribe( () => {
            this.accountService.getAll().subscribe((accounts: Account[]) => {
                accounts.map((account: Account) => {
                    this.contactService.getAll(account.Id).subscribe((contacts: Contact[]) => {
                        account.Contacts = contacts;
                    });
                });
                this.accounts = accounts;
            });
        });
    }
    openModal(id: string) {
        this.modalService.open(id);
    }
    closeModal(id: string) {
        this.modalService.close(id);
    }
}
