export interface IResultsetView<T> {
    found:number;
    page:number;
    viewcount:number;
    sortfield:string;
    view:T[];
}