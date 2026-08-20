import type { IconKind } from './SkillIcon'

/** Which pixel glyph each skill shows. Unlisted skills fall back to a window. */
const BY_SKILL: Record<string, IconKind> = {
  TypeScript: 'type',
  JavaScript: 'braces',
  'C#': 'hash',
  SQL: 'database',
  'VB.NET': 'braces',

  React: 'atom',
  'Next.js': 'triangle',
  'Vue.js': 'leaf',
  'ASP.NET Core': 'server',
  'Entity Framework': 'database',
  SignalR: 'scan',
  jQuery: 'braces',

  Docker: 'container',
  'Node.js': 'server',
  Keycloak: 'key',
  Alfresco: 'doc',
  'PDF.js': 'doc',
  WebTwain: 'scan',
  'LLM integration': 'brain',

  Git: 'branch',
  'GitHub Actions': 'gear',
  'Azure DevOps': 'cloud',
  'Azure Pipelines': 'cloud',
  Playwright: 'bug',
  Cypress: 'bug',
  SonarCloud: 'shield',
  'Claude Code': 'brain',
  Figma: 'pen',
  Jira: 'board',
  IIS: 'window',
  'VS Code': 'terminal',
}

export const iconFor = (skill: string): IconKind => BY_SKILL[skill] ?? 'window'
