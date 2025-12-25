export class QueryParamsDto {
    page: number = 1;
    limit: number = 9;
    search: string = '';

    constructor(page: number, limit: number, search: string) {
        this.page = page;
        this.limit = limit;
        this.search = search;
    }
}