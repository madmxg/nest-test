import { Module } from '@nestjs/common'

import { CacheContainerService } from './cache-container.service'

@Module({
	exports: [CacheContainerService],
	providers: [CacheContainerService],
})
export class CacheContainerModule {}
