import { Module } from '@nestjs/common'

import { ItemsService } from './items.service'
import { ItemsController } from './items.controller'
import { DatabaseModule } from '../../common/modules/database/database.module'
import { CacheContainerModule } from '../../common/modules/cache-container/cache-container.module'
import { SkinportClientModule } from '../../common/clients/skinport-client/skinport-client.module'

@Module({
	imports: [SkinportClientModule, CacheContainerModule, DatabaseModule],
	providers: [ItemsService],
	controllers: [ItemsController],
})
export class ItemsModule {}
