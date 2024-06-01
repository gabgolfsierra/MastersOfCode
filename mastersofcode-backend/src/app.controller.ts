

import { Controller, Get, Post, Body, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  

  @Post('/code')
  CodeReceiver(@Request() req, @Response() res ): any{
    fs.writeFileSync('TESTE.js', req.body.code)
    console.log(req.body)
  
  }


}
