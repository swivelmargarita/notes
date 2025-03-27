# Podman
### Pulling images from dockerhub
Make sure to use `docker.io/` at the beginning of the image name:
~~~admonish fail
```bash
$ docker pull thinca/vim
Error: short-name "thinca/vim" did not resolve to an alias and no unqualified-search registries are defined in "/etc/containers/registries.conf"
```
~~~

~~~admonish success
```bash
$ docker pull docker.io/thinca/vim

Trying to pull docker.io/thinca/vim:latest...
Getting image source signatures
Copying blob 4f4fb700ef54 done   |
Copying blob 31e352740f53 done   |
Copying blob 59ee4629b0a1 done   |
Copying blob ec144417bad2 done   |
Copying blob 864275e25a89 done   |
Copying config c92399797b done   |
Writing manifest to image destination
c92399797bab01a245189a4f168a0308f94f37daca1ec560251bceb70b0dbbc9`
```
~~~

