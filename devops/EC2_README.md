# EC2 Configuration And Userservice Deployment

Use this runbook for all EC2 host setup and app deployment work for `userservice`.

## When To Use This File

Open this document when you need to:

- prepare a new EC2 instance
- deploy or redeploy the Spring Boot JAR
- inspect files packaged inside the deployed JAR
- start, stop, or verify the app
- expose the app on port `80` through Nginx

## Prerequisites

- you are starting from the repository root on your local machine
- the EC2 instance can read from the deployment S3 bucket
- the EC2 instance can connect to the RDS database used by the `aws` Spring profile
- `SSM_EC2_INSTANCE_ID` is available in your local environment if you plan to connect with SSM

## Quick Paths

### First-Time Setup

Follow these sections in order:

1. Build And Upload The JAR
2. Connect To EC2
3. First-Time EC2 Preparation
4. Start The App
5. Verify The App

### Redeploy An Updated JAR

Use this sequence:

1. Build And Upload The JAR
2. Connect To EC2
3. Download The New JAR
4. Stop The Running App
5. Restart The App
6. Verify The App

### Inspect The Deployed JAR

Use the `Inspect The JAR On EC2` section when you need to check packaged config files such as `application.properties`.

### Expose The App On Port 80

After the app works on port `8080`, follow the `Optional Nginx Reverse Proxy` section.

## Build And Upload The JAR

Build locally:

```powershell
mvn -f services/userservice/pom.xml clean package
```

The build creates:

```text
services/userservice/target/userservice-0.0.1-SNAPSHOT.jar
```

Upload it to S3:

```powershell
aws s3 cp services/userservice/target/userservice-0.0.1-SNAPSHOT.jar s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar
```

## Connect To EC2

```powershell
aws ssm start-session --target $env:SSM_EC2_INSTANCE_ID
```

After the session starts, the remaining commands in this document run on the EC2 instance unless noted otherwise.

## First-Time EC2 Preparation

Install Java 21 if it is not already present:

```bash
sudo dnf install -y java-21-amazon-corretto
java -version
```

Create the app directory:

```bash
sudo mkdir -p /opt/my-app
sudo chown -R ssm-user:ssm-user /opt/my-app
cd /opt/my-app
```

## Download The JAR To EC2

```bash
cd /opt/my-app
aws s3 cp s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar .
```

## Inspect The JAR On EC2

Use this when you need to investigate files packaged inside the deployed Spring Boot JAR.

The `java-21-amazon-corretto` package is enough to run the app, but the `jar` command comes from the Corretto development package:

```bash
sudo dnf install java-21-amazon-corretto-devel -y
jar --version
```

From the app directory, list packaged application config files:

```bash
cd /opt/my-app
jar tf userservice-0.0.1-SNAPSHOT.jar | grep 'BOOT-INF/classes/application'
```

Extract a specific file for inspection:

```bash
jar xf userservice-0.0.1-SNAPSHOT.jar BOOT-INF/classes/application.properties
cat BOOT-INF/classes/application.properties
```

This extracts into `BOOT-INF/classes/...` under the current directory. Inspect the file only; do not edit the extracted copy expecting it to change the running JAR.

## Start The App

Run the app with the AWS Spring profile:

```bash
java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws
```

To keep it running after you disconnect, use:

```bash
nohup java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws > app.out.log 2> app.err.log &
```

## Stop Or Restart The App

Find the running Java process:

```bash
ps -ef | grep userservice-0.0.1-SNAPSHOT.jar
```

Stop it by replacing `<pid>` with the Java process id:

```bash
kill <pid>
```

Restart it:

```bash
cd /opt/my-app
nohup java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws > app.out.log 2> app.err.log &
```

## Verify The App

Check health locally on EC2:

```bash
curl http://127.0.0.1:8080/actuator/health
```

If security groups allow public access to port `8080`, these may also work from your machine:

```text
http://<ec2-public-ip>:8080/actuator/health
http://<ec2-public-dns>:8080/actuator/health
```

Check logs if startup fails:

```bash
tail -n 100 app.out.log
tail -n 100 app.err.log
```

## Optional Nginx Reverse Proxy

Use this when you want EC2 to serve standard HTTP on port `80` and forward requests to Spring Boot on port `8080`.

Request flow:

- client -> `http://<ec2-host>/...`
- Nginx -> listens on port `80`
- Spring Boot -> listens on `127.0.0.1:8080`

### Install Nginx

```bash
sudo dnf install -y nginx
```

### Start And Enable Nginx

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx
```

### Allow Port 80 In The EC2 Security Group

Make sure the EC2 security group allows inbound `HTTP` on port `80`.

### Create The Reverse Proxy Config

Create `/etc/nginx/conf.d/userservice.conf` with:

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Using `server_name _;` keeps the config simple and allows both the EC2 public IP and public DNS name to work over plain HTTP.

### Test And Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Verify Through Nginx

On EC2:

```bash
curl http://127.0.0.1/
curl http://127.0.0.1/actuator/health
```

From your machine:

```text
http://<ec2-public-ip>/
http://<ec2-public-dns>/
http://<ec2-public-ip>/api/v1/users
http://<ec2-public-dns>/api/v1/users
```

## Troubleshooting

### HTTP Works But HTTPS Fails

That is expected unless you separately configure TLS on Nginx, an ALB, or the Spring Boot app.

These are expected to work:

- `http://<ec2-public-ip>:8080`
- `http://<ec2-public-dns>:8080`
- `http://<ec2-public-ip>` after Nginx is configured
- `http://<ec2-public-dns>` after Nginx is configured

These are expected to fail until TLS is configured:

- `https://<ec2-public-ip>:8080`
- `https://<ec2-public-dns>:8080`
- `https://<ec2-public-ip>`
- `https://<ec2-public-dns>`

## Related Runbooks

- Deployment overview: [DEPLOY_README.md](DEPLOY_README.md)
- Path-based custom-domain routing: [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)
- Local AWS helper commands: [AWS_COMMANDS.md](AWS_COMMANDS.md)
