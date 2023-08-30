export interface Adapter<T> {
    count: () => Promise<number>
    fetch: (limit: number, offset: number) => Promise<T[]>
}