## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const getAll = connection.template.get();
const getOne = connection.template.get([""]);


```



## Parameters for TaxonomyGetInput

| required | description                             | type         | default | valid values |
| :------- | :-------------------------------------- | :----------- | :------ | :----------- |
| No       | Taxonomy data to retrieve by public key | \[PublicKey] |         |              |

## Response Example

```javascript
[
  {
    	title: "", inputs: [], private: true, version: 0,
  }
]
```