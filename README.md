### alert

```
window.alert("Hello world!");
alert("Hello world!");
```
### variables
### Example of using var
```
var number1 = 45;
var number2 = 2;
var multiplied = number1 * number2;
```

## When to Use var, let, or const?
(w3schools)

1. Always declare variables

2. Always use const if the value should not be changed

3. Always use const if the type should not be changed (Arrays and Objects)

4. Only use let if you can't use const

5. Only use var if you MUST support old browsers.


### [ReferenceError: document is not defined](https://bobbyhadz.com/blog/javascript-referenceerror-document-is-not-defined)

* The "ReferenceError: document is not defined" error occurs for multiple reasons:

1. Using document in Node.js.
2. Using document on the server (e.g. server-side rendering in Next.js).
3. Misspelling the document global variable (should be all lowercase).

The code below helps you test whether you are on the server or the browser. 

If you are on the server, you can't use document.write().
```
if (typeof window !== 'undefined') {
  // 👉️ can use document here
  console.log('You are on the browser')

  console.log(document.title)
  console.log(document.getElementsByClassName('my-class'));
} else {
  // 👉️ can't use document here
  console.log('You are on the server')
}
```

