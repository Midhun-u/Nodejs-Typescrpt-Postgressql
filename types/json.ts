//json interface
export interface Json{
    success : boolean,
    users ? : any[],
    message ? : string,
    totalCount? : number | null,
    error ? : string,
}
