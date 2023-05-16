import { CacheRecord } from './cache-record.interface'

export interface TtlCache {
	readonly cache: Record<string, CacheRecord>
	put(key: string, value: unknown, ttl?: number): void
	get(key: string): unknown | undefined
	delete(key: string): unknown | undefined
}
