# AWS Commands

## RDS port forwarding through SSM

Set the RDS endpoint once as a persistent user environment variable:

```powershell
[System.Environment]::SetEnvironmentVariable(
  "MYAPP_RDS_ENDPOINT",
  "<rds_endpoint_value>",
  "User"
)
```
Set the instance id of EC2 that allows SSM connection once as a persistent user environment variable:

```powershell
[System.Environment]::SetEnvironmentVariable(
  "SSM_EC2_INSTANCE_ID",
  "<EC2_INSTANCE_ID>",
  "User"
)
```

Open a new terminal after setting it, then use this AWS Systems Manager command to open a local tunnel to the remote PostgreSQL instance:

```powershell
aws ssm start-session `
  --target $env:SSM_EC2_INSTANCE_ID `
  --document-name AWS-StartPortForwardingSessionToRemoteHost `
  --parameters host="$env:MYAPP_RDS_ENDPOINT",portNumber="5432",localPortNumber="5432"
```

Verify the variable is available:

```powershell
$env:MYAPP_RDS_ENDPOINT
```

Note: In PowerShell, environment variables are accessed with `$env:...`. `$MYAPP_RDS_ENDPOINT` would be a regular session variable, not the persistent Windows environment variable.

## Connect To EC2
aws ssm start-session --target $env:SSM_EC2_INSTANCE_ID

## Upload Spring Boot JAR To S3

From the `services/userservice` directory, upload the built Spring Boot jar to the `rosh1-app-deploy` S3 bucket with:

```powershell
aws s3 cp target/userservice-0.0.1-SNAPSHOT.jar s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar
```

## Download jar from s3 to ec2 or any current directory
To download the jar from S3 into the current directory, use:

```powershell
aws s3 cp s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar .
```

## Get Caller Identity

```powershell
aws sts get-caller-identity
```