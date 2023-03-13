## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const getAll = connection.taxonomy.get();
const getOne = connection.taxonomy.get(...TaxonomyGetInput);


```



## Parameters for TaxonomyGetInput

| label/required | description                              | type         | default | valid values |
| :------------- | :--------------------------------------- | :----------- | :------ | :----------- |
| publicKeys     | Taxonomy data to retrieve by public keys | \[PublicKey] |         |              |

## Response Example

```javascript
[
  {publicKey: "", label: "", owner: "", parent: ""}
]
```