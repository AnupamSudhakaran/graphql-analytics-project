import { Controller, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {

    constructor(private readonly analyticsService:AnalyticsService){}
    @Post("v1/adjust-to-model")
    async adjustToModel(){
        this.analyticsService.adjustToModel();
    } 
}
