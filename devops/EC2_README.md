# EC2 Configuration And Userservice Deployment

This runbook covers the EC2-side setup for the Spring Boot `userservice`, including:

- first-time EC2 preparation
- Spring Boot JAR deployment
- app start and restart commands
- verification steps
- optional Nginx reverse proxy setup on port `80`

This assumes:

- you start from the repository root on your local machine
- the EC2 instance can read from the deployment S3 bucket
- the EC2 instance can connect to the RDS database used by the `aws` Spring profile

## 1. Build The Spring Boot JAR Locally

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

## 3. Connect To EC2 Through SSM

```powershell
aws ssm start-session --target $env:SSM_EC2_INSTANCE_ID
```

After the session starts, the remaining commands in this document run on the EC2 instance unless noted otherwise.

## 4. First-Time EC2 Preparation

Install Java 21 if it is not already present:

```bash
sudo dnf install -y java-21-amazon-corretto
java -version
```

Create the application directory:

```bash
sudo mkdir -p /opt/my-app
sudo chown -R ssm-user:ssm-user /opt/my-app
cd /opt/my-app
```

## 5. Download The JAR To EC2

```bash
aws s3 cp s3://rosh1-app-deploy/userservice-0.0.1-SNAPSHOT.jar .
```

## 6. Run The Spring Boot App

Run the app with the AWS Spring profile:

```bash
java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws
```

To keep it running after you disconnect, use `nohup`:

```bash
nohup java -jar userservice-0.0.1-SNAPSHOT.jar --spring.profiles.active=aws > app.out.log 2> app.err.log &
```

## 7. Verify The App On Port 8080

Check health locally on EC2:

```bash
curl http://127.0.0.1:8080/actuator/health
```

If security groups allow it and the app is listening publicly, these may also work from your machine:

```text
http://<ec2-public-ip>:8080/actuator/health
http://<ec2-public-dns>:8080/actuator/health
```

Check logs if startup fails:

```bash
tail -n 100 app.out.log
tail -n 100 app.err.log
```

## 8. Stop Or Restart The App

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

## 9. Optional: Put Nginx In Front Of Spring Boot

Use this when you want EC2 to serve standard HTTP on port `80` and proxy requests to Spring Boot on port `8080`.

Request flow:

- client -> `http://<ec2-host>/...`
- Nginx listens on port `80`
- Nginx proxies to `http://127.0.0.1:8080`

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

### Create Nginx Reverse Proxy Config

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

Using `server_name _;` keeps the config simple and allows both the public IP and public DNS name to work over plain HTTP.

### Test And Reload Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Verify Through Nginx On Port 80

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

## 10. Notes About HTTP vs HTTPS

At this stage, the EC2 host is expected to serve plain HTTP unless you separately install TLS on Nginx, an ALB, or the Spring Boot app itself.

That means these are expected to work:

- `http://<ec2-public-ip>:8080`
- `http://<ec2-public-dns>:8080`
- `http://<ec2-public-ip>` after Nginx is configured
- `http://<ec2-public-dns>` after Nginx is configured

These are expected to fail unless you configure TLS:

- `https://<ec2-public-ip>:8080`
- `https://<ec2-public-dns>:8080`
- `https://<ec2-public-ip>`
- `https://<ec2-public-dns>`

## 11. Related Runbooks

- Path-based custom-domain routing: [CUSTOM_DOMAIN_PATH_ROUTING.md](CUSTOM_DOMAIN_PATH_ROUTING.md)
- Local AWS helper commands: [AWS_COMMANDS.md](AWS_COMMANDS.md)
