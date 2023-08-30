import {Adapter} from "@src/utils/pager/adapter.interface";

export class ArrayAdapter<T> implements Adapter<T> {
    constructor(private readonly data: T[]) {
    }

    count(): Promise<number> {
        return Promise.resolve(this.data.length);
    }

    fetch(limit: number, offset: number): Promise<T[]> {
        return Promise.resolve(this.data.slice(offset, offset + limit));
    }

}