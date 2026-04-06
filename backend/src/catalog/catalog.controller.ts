import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}
  @Get('labs')
  @ApiOperation({ summary: 'List model labs (providers)' })
  @ApiOkResponse({ description: 'Labs used to group models in the catalog' })
  getLabs() {
    return this.catalogService.getLabs();
  }
  @Get('models')
  @ApiOperation({ summary: 'List catalog models with pricing and tags' })
  @ApiOkResponse({ description: 'Model cards for marketplace and pickers' })
  getModels() {
    return this.catalogService.getModels();
  }
  @Get('agents')
  @ApiOperation({ summary: 'List starter agent blueprints' })
  @ApiOkResponse({ description: 'Preset agents (name, model, tools, prompts)' })
  getAgents() {
    return this.catalogService.getAgents();
  }
  @Get('agent-explore')
  @ApiOperation({
    summary: 'Agents page: discovery tabs, suggested prompts, and sample apps',
  })
  @ApiOkResponse({
    description: 'Tabs, prompt chips, and demo app list for the agent hub',
  })
  getAgentExplore() {
    return this.catalogService.getAgentExplore();
  }
  @Get('hero-onboarding')
  @ApiOperation({ summary: 'Landing hero: guided setup questions and answers' })
  @ApiOkResponse({
    description: 'Stepwise onboarding used to tailor first recommendations',
  })
  getHeroOnboarding() {
    return this.catalogService.getHeroOnboarding();
  }
  @Get('flagship-comparison')
  @ApiOperation({
    summary: 'Flagship model comparison table (landing marketplace)',
  })
  @ApiOkResponse({
    description: 'Rows for pricing, context, speed tier, and multimodal flags',
  })
  getFlagshipComparison() {
    return this.catalogService.getFlagshipComparison();
  }
  @Get('research')
  @ApiOperation({ summary: 'List research briefs for the feed' })
  @ApiOkResponse({ description: 'Summaries and metadata for each brief' })
  getResearch() {
    return this.catalogService.getResearch();
  }
  @Get('research/:id')
  @ApiOperation({ summary: 'Get a single research brief by id' })
  @ApiOkResponse({
    description: 'Full brief: overview, metrics, findings, citations',
  })
  getResearchById(
    @Param('id')
    id: string,
  ) {
    return this.catalogService.getResearchById(id);
  }
}
