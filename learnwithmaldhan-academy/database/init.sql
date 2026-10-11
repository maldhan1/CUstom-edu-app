CREATE TABLE IF NOT EXISTS courses (id SERIAL PRIMARY KEY,title VARCHAR(160) NOT NULL,category VARCHAR(60) NOT NULL,level VARCHAR(40) NOT NULL,duration VARCHAR(80) NOT NULL,description TEXT NOT NULL);
INSERT INTO courses(title,category,level,duration,description) VALUES
('Kubernetes Foundations','Kubernetes','Beginner','8 practical labs','Master Pods, Deployments, Services, ConfigMaps and cluster basics.'),
('Docker & Containers','DevOps','Beginner','6 practical labs','Build images, run containers, publish to Docker Hub and use Compose.'),
('AWS Cloud Essentials','Cloud','Beginner','7 practical labs','Explore IAM, EC2, VPC, load balancing and cloud deployments.'),
('CI/CD with GitHub Actions','Automation','Intermediate','5 practical labs','Build repeatable pipelines to test, package and deploy applications.'),
('Linux for Cloud Engineers','Linux','Beginner','9 practical labs','Practice commands, users, permissions, services and scripting.'),
('Three-Tier App on EKS','Project','Intermediate','End-to-end project','Connect a frontend, REST API and PostgreSQL using Kubernetes Services.')
ON CONFLICT DO NOTHING;
