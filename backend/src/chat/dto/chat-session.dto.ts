import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChatContextDto } from './chat-message.dto';
export class CreateChatSessionDto {
  @ApiPropertyOptional({ example: 'API design review' })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({ example: 'usr_7f3a9c2e or guest_a1b2c3d4' })
  @IsString()
  sessionId: string;
  @ApiProperty({ example: false })
  @IsBoolean()
  isGuest: boolean;
  @ApiPropertyOptional({ type: ChatContextDto })
  @IsOptional()
  @Type(() => ChatContextDto)
  @ValidateNested()
  context?: ChatContextDto;
  @ApiPropertyOptional({ example: 'claude-sonnet' })
  @IsOptional()
  @IsString()
  currentModelId?: string;
}
export class UpdateChatSessionDto {
  @ApiPropertyOptional({ example: 'Refactor plan — backend' })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiPropertyOptional({ type: ChatContextDto })
  @IsOptional()
  @Type(() => ChatContextDto)
  @ValidateNested()
  context?: ChatContextDto;
  @ApiPropertyOptional({ example: 'gemini31-pro' })
  @IsOptional()
  @IsString()
  currentModelId?: string;
}
export class SaveChatMessageDto {
  @ApiProperty({ example: 'user' })
  @IsString()
  role: 'user' | 'ai';
  @ApiProperty({ example: 'Outline steps to add OAuth2 to this Nest app.' })
  @IsString()
  content: string;
  @ApiPropertyOptional({ type: [Object] })
  @IsOptional()
  @IsArray()
  recs?: any[];
  @ApiPropertyOptional({ type: [Object] })
  @IsOptional()
  @IsArray()
  attachments?: any[];
}
export class GetChatSessionsDto {
  @ApiProperty({ example: 'usr_7f3a9c2e' })
  @IsString()
  sessionId: string;
  @ApiProperty({ example: false })
  @IsBoolean()
  isGuest: boolean;
}
