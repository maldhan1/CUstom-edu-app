# Learn with Maldhan — Cloud & Kubernetes Academy

A classroom-ready three-tier starter project:
- **Frontend:** React + Vite, served by Nginx
- **Backend:** Node.js + Express REST API
- **Database:** PostgreSQL
- **Local development:** Docker Compose
- **Kubernetes/EKS:** Deployments, Services, Secret, ConfigMap and persistent storage

## 1. Run locally

Requirements: Docker Engine and Docker Compose plugin.

```bash
docker compose up --build -d
docker compose ps
```

Open **http://localhost:8080**. Test API endpoints:

```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/courses
```

Stop the containers but keep database data:

```bash
docker compose down
```

Delete database data too (irreversible for this local demo):

```bash
docker compose down -v
```

## 2. Build and push images to Docker Hub

Make sure the Docker Hub account is yours and you are logged in. Replace `maldhan` if your Docker Hub username differs.

```bash
docker login
docker build -t maldhan/learnwithmaldhan-frontend:v1 ./frontend
docker build -t maldhan/learnwithmaldhan-backend:v1 ./backend
docker push maldhan/learnwithmaldhan-frontend:v1
docker push maldhan/learnwithmaldhan-backend:v1
```

Never put a Docker Hub password directly into a command or commit it into this project.

## 3. Deploy to EKS

First confirm you are using the intended cluster:

```bash
kubectl config current-context
```

Edit `k8s/02-secret.yaml` and change the demo database password. Use the same password in the Kubernetes Secret; the backend and database both read it from that Secret. If your Docker Hub username differs, update both image names in the manifests.

Apply the manifests in order:

```bash
kubectl apply -f k8s/01-namespace.yaml
kubectl apply -f k8s/02-secret.yaml
kubectl apply -f k8s/03-backend.yaml
kubectl apply -f k8s/04-database.yaml
kubectl apply -f k8s/05-frontend.yaml
kubectl get pods -n maldhan-academy -w
```

Get the public frontend endpoint:

```bash
kubectl get svc frontend -n maldhan-academy
```

Wait for `EXTERNAL-IP` to show an AWS load balancer hostname. This can take a few minutes and **AWS load balancers may incur charges**.

## 4. EKS notes

- The PostgreSQL manifest uses a 5Gi PersistentVolumeClaim. Your EKS cluster must have a compatible StorageClass and EBS CSI driver configured.
- For production, prefer a managed database such as Amazon RDS, TLS, AWS Secrets Manager or External Secrets, tighter IAM/network permissions, backups and monitored resource limits.
- This is a training starter, not a production LMS. It intentionally has no real user accounts, password storage, or student personal data.
- The frontend shows demo learning-path cards and reads them from the API; the API reads from PostgreSQL when it is available and returns a demo fallback if the database is temporarily unavailable.

## 5. Troubleshooting

```bash
kubectl get all -n maldhan-academy
kubectl describe pod -n maldhan-academy <pod-name>
kubectl logs -n maldhan-academy deployment/api
kubectl logs -n maldhan-academy deployment/frontend
kubectl logs -n maldhan-academy deployment/database
```

If you change application code, rebuild and push a new image tag (for example `v2`), update the matching image in the YAML, and apply it again.
