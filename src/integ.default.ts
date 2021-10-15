import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { AlarmInstance } from './index';
const app = new cdk.App();
const stack = new cdk.Stack(app, 'integ-default');
const vpc = new ec2.Vpc(stack, 'VPC');
new AlarmInstance(stack, 'AlarmInstance', { vpc, notifyMail: ['mail@example.com'] });