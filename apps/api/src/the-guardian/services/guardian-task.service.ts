import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TheGuardianService } from './the-guardian.service';

@Injectable()
export class GuardianTaskService {
  private readonly logger = new Logger(GuardianTaskService.name);

  constructor(
    private theGuardianService: TheGuardianService
  ){}

  @Cron(CronExpression.EVERY_HOUR)
  async handleSyncronizeDataFromGuardianNews() {
    this.theGuardianService.fetchAndSaveGuardianData();

    this.logger.log('Guardian news syncronized');
  }
}
