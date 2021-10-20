import * as ec2 from '@aws-cdk/aws-ec2';
import * as sns from '@aws-cdk/aws-sns';
import { App, Stack } from '@aws-cdk/core';
import { AlarmInstance } from '../src';
import '@aws-cdk/assert/jest';

test('test create Instance and Alarm SNS Topic', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc });
  expect(stack).toHaveResource('AWS::EC2::VPC');
  expect(stack).toHaveResource('AWS::CloudWatch::Alarm');
  expect(stack).toHaveResource('AWS::SNS::Topic');
});

test('test create Instance and Alarm and input SNS Topic', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const topic = new sns.Topic(stack, 'Topic');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc, topic, notifyMail: ['mail@example.com'] });
  expect(stack).toHaveResource('AWS::EC2::VPC');
  expect(stack).toHaveResource('AWS::CloudWatch::Alarm');
  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Endpoint: 'mail@example.com',
  });
});

test('test have two sns SNS Subscription', () => {
  const app = new App();
  const stack = new Stack(app, 'testing-stack');
  const topic = new sns.Topic(stack, 'Topic');
  const vpc = new ec2.Vpc(stack, 'VPC');
  new AlarmInstance(stack, 'AlarmInstance', { vpc, topic, notifyMail: ['mail@example.com', 'mail2@example.com'] });
  expect(stack).toHaveResource('AWS::EC2::VPC');
  expect(stack).toHaveResource('AWS::CloudWatch::Alarm');
  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Endpoint: 'mail@example.com',
  });
  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Endpoint: 'mail2@example.com',
  });
});