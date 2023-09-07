export type DynamoDBPaginatedResult<T> = {
    items: T[]
    lastKey?: string | undefined
}