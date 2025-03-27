# GCP
## Artifact Registy
### Make an artifact repository publicly readable by all users
```bash
$ gcloud artifacts repositories add-iam-policy-binding <repository> \
    --role=roles/artifactregistry.reader
    --member=allUsers \
    --project=<project> \
    --location=<location>
```

~~~admonish example
```bash
$ gcloud artifacts repositories add-iam-policy-binding eu.gcr.io \
    --member=allUsers \
    --role=roles/artifactregistry.reader
    --project=my-project \
    --location=europe \

Updated IAM policy for repository [eu.gcr.io].
bindings:
- members:
  - allUsers
  role: roles/artifactregistry.reader
etag: ...
version: 1
```
~~~
