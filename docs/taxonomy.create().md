## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const connection.taxonomy.create([...TaxonomyCreateInput]);


```



## Parameters for TaxonomyCreateInput

| label/required | description                | type      | default | valid values           |
| :------------- | :------------------------- | :-------- | :------ | :--------------------- |
| label\*        | name of taxonomy reference | string    |         | length 1-24 characters |
| parent         | reference to parent        | PublicKey |         |                        |

## Response Example

```javascript
{
	label: "javascript",
  parent: null
}
```