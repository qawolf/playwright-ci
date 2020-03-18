export const CI_PROVIDERS: Array<{
  label: string;
  name: string | null;
  path: string;
  qawolfPath?: string;
}> = [
  { label: 'Azure DevOps', name: 'azure', path: 'azure-pipelines.yml' },
  {
    label: 'Bitbucket Pipelines',
    name: 'bitbucket',
    path: 'bitbucket-pipelines.yml',
  },
  { label: 'CircleCI', name: 'circleci', path: '.circleci/config.yml' },
  {
    label: 'GitHub Actions',
    name: 'github',
    path: '.github/workflows/playwright.yml',
    qawolfPath: '.github/workflows/qawolf.yml',
  },
  { label: 'GitLab CI/CD', name: 'gitlab', path: '.gitlab-ci.yml' },
  { label: 'Jenkins', name: 'jenkins', path: 'Jenkinsfile' },
  { label: 'Skip CI setup', name: null, path: '' },
];
