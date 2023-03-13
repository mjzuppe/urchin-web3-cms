## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const connection.asset.create([...AssetInput]);


```



## Parameters for AssetInput

| label/required | description                | type   | default | valid values |
| :------------- | :------------------------- | :----- | :------ | :----------- |
| original\*     | reference to file location | string |         |              |

## Response Example

```javascript
[
  {
  	original: "./img.jpg"
    // metadata: {
    //	mimetype: "image/jpg",
    //  size: 2493024,
    //  extension: "jpg",
    //  charset: "UTF-8",
    //  lastModified: "1519211809934",
    }
  }
]
```