export type ButtonVariant = 'raised' | 'flat' | 'stroked' | 'icon' | 'none';
export type ButtonColor = 'success' | 'accent' | 'warning' | 'danger' | 'link';

export interface ButtonModel {
    label: string;
    variant: ButtonVariant;
    color: ButtonColor;
    disabled?: boolean;
    icon?: string;
}