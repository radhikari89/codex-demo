# Deploy Userservice To EC2

This runbook assumes you are starting from the repository root on your local machine.

The EC2 instance must have permission to read from the S3 bucket and connect to the RDS database used by the `aws` Spring profile.

## 1. Build The Spring Boot JAR

```powershell
mvn -f services/userservice/pom.xml clean package
```

The build creates:

```text
services/userservice/target/userservice-0.0.1-SNAPSHOT.jar
```

## 2. Upload The JAR To S3

```powershell
aws s3 cp services/userservice/target/userservice-0.0.1-SNAPSHOT.jar s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar
```

## 3. Connect To EC2

```powershell
aws ssm start-session --target $env:SSM_EC2_INSTANCE_ID
```

After the session starts, the following commands run on the EC2 instance.

## 4. Prepare The App Directory On EC2

For the first deployment on a new EC2 instance, install Java 21 if it is not already available:

```bash
sudo dnf install -y java-21-amazon-corretto
java -version
```

```bash
sudo mkdir -p /opt/my-app
sudo chown -R ssm-user:ssm-user /opt/my-app
cd /opt/my-app
```

## 5. Download The JAR From S3 To EC2

```bash
aws s3 cp s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar .
```

## 6. Run The Spring Boot JAR

Run the app with the AWS Spring profile so it uses `application-aws.properties`:

```bash
java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws
```

To keep the app running after you disconnect from SSM, use `nohup`:

```bash
nohup java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws > app.out.log 2> app.err.log &
```

## 7. Verify The App

On EC2, verify the health endpoint:

```bash
curl http://localhost:8080/actuator/health
```

Check logs if the app does not start:

```bash
tail -n 100 app.out.log
tail -n 100 app.err.log
```

## 8. Stop Or Restart The App

Find the running process:

```bash
ps -ef | grep userservice-0.0.1-SNAPSHOT.jar
```

Stop it by replacing `<pid>` with the Java process id:

```bash
kill <pid>
```

Then restart with:

```bash
cd /opt/my-app
nohup java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws > app.out.log 2> app.err.log &
```
