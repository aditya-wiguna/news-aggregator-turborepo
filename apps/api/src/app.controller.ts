import { Controller, Get, HttpStatus, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health(
    @Res() res
  ) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Service is up and running',
      data: {
        timestamp: new Date().toISOString()
      }
    });
  }
}
