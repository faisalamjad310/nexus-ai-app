import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatHubService } from './chat-hub.service';
@ApiTags('chat-hub')
@Controller('chat-hub')
export class ChatHubController {
  constructor(private readonly chatHubService: ChatHubService) {}
  @Get()
  @ApiOperation({ summary: 'Chat hub: goals, shortcuts, and prompt categories' })
  @ApiOkResponse({ description: 'Static strings and starter prompts for Chat Hub' })
  getChatHubData() {
    return this.chatHubService.getHubData();
  }
}
