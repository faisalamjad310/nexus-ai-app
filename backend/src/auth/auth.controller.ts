import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'Register an account and start an authenticated session' })
  @ApiBody({ type: SignupDto })
  async signup(
    @Body()
    payload: SignupDto,
    @Session()
    session: Record<string, any>,
  ) {
    const user = await this.authService.signup(payload);
    session.user = user;
    return user;
  }
  @Post('login')
  @ApiOperation({ summary: 'Login and create logged-user session' })
  @ApiBody({ type: LoginDto })
  async login(
    @Body()
    payload: LoginDto,
    @Session()
    session: Record<string, any>,
  ) {
    const user = await this.authService.login(payload);
    session.user = user;
    return user;
  }
  @Post('guest')
  @ApiOperation({ summary: 'Create a limited guest session (no account)' })
  async guest(
    @Session()
    session: Record<string, any>,
  ) {
    const user = this.authService.createGuestSession();
    session.user = user;
    return user;
  }
  @Get('session')
  @ApiOperation({ summary: 'Return whether a session exists and the current user payload' })
  getSession(
    @Session()
    session: Record<string, any>,
  ) {
    return {
      authenticated: Boolean(session.user),
      user: session.user ?? null,
    };
  }
  @Post('logout')
  @ApiOperation({ summary: 'Invalidate the session cookie' })
  async logout(
    @Req()
    req: Request,
  ) {
    await new Promise<void>((resolve) => {
      req.session.destroy(() => resolve());
    });
    return { message: 'You have been signed out.' };
  }
}
