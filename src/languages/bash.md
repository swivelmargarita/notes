# Bash
### Group commands without subshell with '\{\}'
Following command does not do the result one might expect. Regardless of the exit
status of the `cd /tmp`, `exit` command will always be run.
```bash
cd /tmp || echo "cd to /tmp failed"; exit
# Exits anyways even if cd was succesful
```

```admonish note
In `bash` you may treat `;` as an equilent of a newline.
```

```admonish note
Use `{ cmds }` to group a list of commands that will be executed in the current
shell. At the other hand, `( cmds )` will execute the `cmds` in a subshell.
```

#### Don't forget the `;`

```bash
$ bash
$ cd /tmp || { echo "cd to /tmp failed"; exit }
>
>
>
> ^C
$
```
~~~admonish warning
When using command grouping with curly braces '{', always end the list of
commands inside the curly braces with a semicolon and a space ';\<space\>' like
this:

```bash
$ cd /tmp || { echo "cd to /tmp failed"; exit; }
```
~~~

~~~admonish success
```bash
[t@olympus notes]$ cd /tmp || { echo "cd to /tmp failed"; exit; }
[t@olympus tmp]$
```
~~~
