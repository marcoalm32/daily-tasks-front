import { DefaultModel } from "../../shared/models/default.model";

export interface UserModel extends DefaultModel{
    name: string;
    email: string;
}