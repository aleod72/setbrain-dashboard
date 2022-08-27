import { Controller, Get } from '@nestjs/common';

import { Message } from '@setbrain-dashboard/api-interfaces';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}
}
