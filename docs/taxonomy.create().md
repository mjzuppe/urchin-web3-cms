## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const connection.taxonomy.create([...TaxonomyCreateInput]);


```

## Parameters for TaxonomyCreateInput

| label/required | description                | type      | default | valid values           |
| :------------- | :------------------------- | :-------- | :------ | :--------------------- |
| publickKey*    | reference to target address| PublicKey |         |                        |
| label\*        | name of taxonomy reference | string    |         | length 1-24 characters |
| parent         | reference to parent        | PublicKey |         |                        |

## Response Example

```
{
	label: "javascript",
  parent: null
  // Note that response is payload from input
}
```