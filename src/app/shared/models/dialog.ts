import { ButtonModel } from "./button.model";

export class Dialog {
    
    public _title: string;
    public _message: string;
    public width: string;
    public height: string;
    public actionBtn: ButtonModel;
    public cancelBtn: ButtonModel;
    public top: string;
    public icon: string;


    constructor(title: string, message: string) {
        this._title = title;
        this._message = message;
        this.width = '400px';
        this.height = '200px';
        this.actionBtn = { label: 'OK', variant: 'raised', color: 'success' };
        this.cancelBtn = { label: 'Cancel', variant: 'flat', color: 'danger' };
        this.top = '100px';
        this.icon = 'close';
    }
}