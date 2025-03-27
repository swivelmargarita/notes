# pacman

## pacman -F, file operations
~~~admonish tip
Download file database
```
pacman -Fy
```
~~~


~~~admonish tip
Find which package owns a file, for example `/usr/bin/rg`
```
$ pacman -F /usr/bin/rg

usr/bin/rg is owned by extra/ripgrep 14.1.1-1
```
~~~


~~~admonish tip
Search with regex. For example search which packages provides a man page for docker:
```
$ pacman -Fx '\bdocker\.1\.gz$'

extra/docker 1:28.0.1-1
    usr/share/man/man1/docker.1.gz
extra/podman-docker 5.4.1-1 [installed]
    usr/share/man/man1/docker.1.gz
```
~~~


~~~admonish tip
List the files owned by the a package, for example `unrar`
```
$ pacman -Fl unrar

unrar usr/bin/unrar
unrar usr/share/licenses/unrar/LICENSE
```
~~~


~~~admonish tip

```

```
~~~


