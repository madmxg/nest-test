import { Controller, Get } from '@nestjs/common'

import { ItemsService } from './items.service'

@Controller('api')
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}

	@Get('items')
	public readItems() {
		return this.itemsService.readItems()
	}

	@Get('withdraw')
	public withdraw() {
		return this.itemsService.withdraw()
	}
}
