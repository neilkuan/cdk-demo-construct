# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### AlarmInstance <a name="cdk-demo-construct.AlarmInstance"></a>

#### Initializers <a name="cdk-demo-construct.AlarmInstance.Initializer"></a>

```typescript
import { AlarmInstance } from 'cdk-demo-construct'

new AlarmInstance(scope: Construct, id: string, props: AlarmInstanceProps)
```

##### `scope`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstance.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstance.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstance.parameter.props"></a>

- *Type:* [`cdk-demo-construct.AlarmInstanceProps`](#cdk-demo-construct.AlarmInstanceProps)

---



#### Properties <a name="Properties"></a>

##### `instance`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstance.property.instance"></a>

```typescript
public readonly instance: Instance;
```

- *Type:* [`@aws-cdk/aws-ec2.Instance`](#@aws-cdk/aws-ec2.Instance)

---

##### `topic`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstance.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---


## Structs <a name="Structs"></a>

### AlarmInstanceProps <a name="cdk-demo-construct.AlarmInstanceProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { AlarmInstanceProps } from 'cdk-demo-construct'

const alarmInstanceProps: AlarmInstanceProps = { ... }
```

##### `vpc`<sup>Required</sup> <a name="cdk-demo-construct.AlarmInstanceProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* [`@aws-cdk/aws-ec2.IVpc`](#@aws-cdk/aws-ec2.IVpc)

---

##### `notifyMail`<sup>Optional</sup> <a name="cdk-demo-construct.AlarmInstanceProps.property.notifyMail"></a>

```typescript
public readonly notifyMail: string[];
```

- *Type:* `string`[]

---

##### `topic`<sup>Optional</sup> <a name="cdk-demo-construct.AlarmInstanceProps.property.topic"></a>

```typescript
public readonly topic: Topic;
```

- *Type:* [`@aws-cdk/aws-sns.Topic`](#@aws-cdk/aws-sns.Topic)

---

##### `userData`<sup>Optional</sup> <a name="cdk-demo-construct.AlarmInstanceProps.property.userData"></a>

```typescript
public readonly userData: UserData;
```

- *Type:* [`@aws-cdk/aws-ec2.UserData`](#@aws-cdk/aws-ec2.UserData)

---



