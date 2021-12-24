const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Neil Kuan',
  authorAddress: 'guan840912@gmail.com',
  description: 'A sample L3 CDK project',
  cdkVersion: '1.128.0',
  defaultReleaseBranch: 'main',
  keywords: ['aws-cdk', 'custom', 'l3'],
  name: 'cdk-demo-construct',
  repositoryUrl: 'https://github.com/neilkuan/cdk-demo-construct.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-cloudwatch-actions',
  ],
  packageName: 'cdk-demo-construct',
  publishToPypi: {
    distName: 'cdk-demo-construct',
    module: 'cdk_demo_construct',
  },
  gitignore: ['cdk.context.json', 'cdk.out'],
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
      secret: 'AUTOMATION_GITHUB_TOKEN',
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
});
project.synth();
