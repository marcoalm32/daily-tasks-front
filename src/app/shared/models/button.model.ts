import { ColorType } from "./color-type.model";

export type ButtonVariant = 'raised' | 'flat' | 'stroked' | 'icon' | 'none';

export interface ButtonModel {
    label: string;
    variant: ButtonVariant;
    color: ColorType;
    disabled?: boolean;
    icon?: string;
}