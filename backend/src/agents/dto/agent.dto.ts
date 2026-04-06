import {
  IsString,
  IsOptional,
  IsArray,
  IsIn,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateAgentDto {
  @ApiProperty({ example: 'Field Notes Analyst' })
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;
  @ApiPropertyOptional({
    example: 'Pulls sources, cites them, and returns short briefs.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;
  @ApiProperty({ example: 'claude-sonnet' })
  @IsString()
  modelId: string;
  @ApiPropertyOptional({
    example: 'You summarize papers; every claim needs a citation line.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  systemPrompt?: string;
  @ApiPropertyOptional({ example: ['web_search', 'file_access'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tools?: string[];
  @ApiPropertyOptional({ enum: ['draft', 'active', 'paused'] })
  @IsOptional()
  @IsIn(['draft', 'active', 'paused'])
  status?: string;
}
export class UpdateAgentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modelId?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  systemPrompt?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tools?: string[];
  @ApiPropertyOptional({ enum: ['draft', 'active', 'paused'] })
  @IsOptional()
  @IsIn(['draft', 'active', 'paused'])
  status?: string;
}
export class RunAgentDto {
  @ApiProperty({
    example: 'Compare retrieval-augmented vs long-context setups for legal QA.',
    description:
      'User turn; the client may inline small excerpts from attachments.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(32000)
  message: string;
}
