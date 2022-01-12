import { Template, Match } from '@aws-cdk/assertions';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as sns from '@aws-cdk/aws-sns';
import { App, Stack } from '@aws-cdk/core';
import { AlarmInstance } from '../src';

test('test create Instance and Alarm SNS Topic', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc });
  Template.fromStack(stack).findResources('AWS::EC2::VPC');
  Template.fromStack(stack).findResources('AWS::CloudWatch::Alarm');
  Template.fromStack(stack).findResources('AWS::SNS::Topic');
});

test('test create Instance and Alarm and input SNS Topic', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const topic = new sns.Topic(stack, 'Topic');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc, topic, notifyMail: ['mail@example.com'] });
  Template.fromStack(stack).findResources('AWS::EC2::VPC');
  Template.fromStack(stack).findResources('AWS::CloudWatch::Alarm');
  Template.fromStack(stack).hasResourceProperties('AWS::SNS::Subscription', Match.objectLike({
    Endpoint: 'mail@example.com',
  }));
});

test('test have two sns SNS Subscription', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const topic = new sns.Topic(stack, 'Topic');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc, topic, notifyMail: ['mail@example.com', 'mail2@example.com'] });
  Template.fromStack(stack).findResources('AWS::EC2::VPC');
  Template.fromStack(stack).findResources('AWS::CloudWatch::Alarm');
  Template.fromStack(stack).hasResourceProperties('AWS::SNS::Subscription', Match.objectLike({
    Endpoint: 'mail@example.com',
  }));
  Template.fromStack(stack).hasResourceProperties('AWS::SNS::Subscription', Match.objectLike({
    Endpoint: 'mail2@example.com',
  }));
});