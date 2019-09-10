import { Deserializable } from './deserializable.model';
import { Contact } from './contact.model';

export class Account implements Deserializable {
    public Id: string;
    public Name: string;
    public AnnualRevenue: number;
    public Website: string;
    public AccountNumber: string;
    public Rating: string;
    public UpsellOpportunity__c: string;
    public Contacts: Contact[];

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
