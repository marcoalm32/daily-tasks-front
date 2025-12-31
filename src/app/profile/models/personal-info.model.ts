import { DefaultModel } from "../../shared/models/default.model";

export interface PersonalInfoModel extends DefaultModel {
    name: string;
    email: string;
    phone: string;
    imageUrl?: string | null;
}