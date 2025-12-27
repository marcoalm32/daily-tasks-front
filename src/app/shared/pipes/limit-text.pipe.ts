import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'limitText',
})
export class LimitTextPipe implements PipeTransform {

    transform(value: any, limit: number): string {
        if (!value) {
            return '';
        }
        return value.length > limit 
            ? value.substring(0, limit) + '...' 
            : value;
    }
}