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
    page = 1;
    title = 'Your Accounts';
    accounts: Account[];
    totalItems = 0;
    pageSize = 5;
    pagedItems: Account[];
    previousPage: any;
    currentPage: number = 1;
    loading: boolean = true;
    activeIds: string[] = [];
    edit: boolean = false;
    openedAll: boolean = false;
    toggledText: string = 'Open All';
    constructor( private accountService: AccountsService, private contactService: ContactsService, private modalService: ModalService ) { }

    ngOnInit() {
        this.accountService.getAll().subscribe((accounts: Account[]) => {
            accounts.map((account: Account) => {
                this.contactService.getAll(account.Id).subscribe((contacts: Contact[]) => {
                    return account.Contacts = contacts;
                });
            });
            this.totalItems = accounts.length;
            this.accounts = accounts;
            this.pagedItems = this.accounts.slice(this.currentPage - 1, this.pageSize);
            this.loading = false;
        });
    }
    loadPage(page: number) {
        if (page === 1) {
            this.currentPage = page;
            this.pagedItems = this.accounts.slice(this.currentPage - 1, this.pageSize);
        } else {
            this.pagedItems = this.accounts.slice(page * this.pageSize - 5, this.pageSize * page);
        }
    }
    editAccount() {
        this.edit = true;
    }
    closeEdit() {
        this.accountService.getAll().subscribe(data => {
            this.accounts = data;
        });
        this.edit = false;
    }
    submit(account) {
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

    toggleAll() {
      const idsToToggle = [];
      this.openedAll = !this.openedAll;

      this.toggledText = this.openedAll ? 'Close All': 'Open All';
      this.accounts.forEach((account, index) => {
        const isFound = false;
        if (this.activeIds.length > 0) {
          this.activeIds.findIndex((panelId) => {
            if (`panel-${index}` === panelId) {
              isFound = true;
            }
          });
        }
        if (!isFound) {
          idsToToggle.push(`panel-${index}`);
        }
      });
      this.activeIds = idsToToggle;
    }
}
