test if something is a instance of a class

const array = []


is(Array, array);

```
function is(Class, value) {
  return value?.constructor === Class
}
```
