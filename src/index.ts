import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import * as cw_actions from '@aws-cdk/aws-cloudwatch-actions';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as sns from '@aws-cdk/aws-sns';
import * as cdk from '@aws-cdk/core';

export interface AlarmInstanceProps {
  readonly userData?: ec2.UserData;
  readonly vpc: ec2.IVpc;
  readonly topic?: sns.Topic;
  readonly notifyMail?: string[];
}

export class AlarmInstance extends cdk.Construct {
  public instance: ec2.Instance;
  public topic: sns.Topic;
  constructor(scope: cdk.Construct, id: string, props: AlarmInstanceProps) {
    super(scope, id);
    this.instance = new ec2.Instance(this, 'Instance', {
      instanceName: this.node.id,
      instanceType: new ec2.InstanceType('t3.micro'),
      machineImage: new ec2.AmazonLinuxImage({ generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2 }),
      userData: props.userData,
      vpc: props.vpc,
    });

    const metrics = new cloudwatch.Metric({
      namespace: 'AWS/EC2',
      metricName: 'CPUUtilization',
      dimensionsMap: { InstanceId: this.instance.instanceId },
    });

    const alarm = new cloudwatch.Alarm(this, 'Alarm', {
      alarmDescription: 'Alarm for instance',
      metric: metrics,
      threshold: 50,
      evaluationPeriods: 1,
    });

    this.topic = props.topic ?? new sns.Topic(this, 'Topic');
    alarm.addAlarmAction(new cw_actions.SnsAction(this.topic));
    if (props.notifyMail) {
      props.notifyMail.forEach((mail, index) => {
        new sns.Subscription(this, `AlarmSns${index}`, {
          topic: this.topic,
          protocol: sns.SubscriptionProtocol.EMAIL,
          endpoint: mail,
        });
      });
    }
  }
}