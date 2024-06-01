

import { Controller, Get, Post, Body, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  

  @Post('/code')
  CodeReceiver(@Request() req, @Response() res ): any{
    console.log(req.body)
  
  }


}
