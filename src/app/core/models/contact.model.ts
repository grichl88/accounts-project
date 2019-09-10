import {Deserializable} from './deserializable.model';

export class Contact implements Deserializable {
    public Id: string;
    public Name: string;
    public Title: string;
    public Phone: string;
    public Department: string;
    public Email: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
