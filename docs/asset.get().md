
## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const getAll = connection.asset.get();
const getOne = connection.asset.get([""]);


```



## Parameters for AssetGetInput

| required | description                          | type         | default | valid values |
| :------- | :----------------------------------- | :----------- | :------ | :----------- |
| No       | Asset data to retrieve by public key | \[PublicKey] |         |              |

## Response Example

```javascript
[
  {publicKey: "", id: "", url: "", updated: 0}
]
```