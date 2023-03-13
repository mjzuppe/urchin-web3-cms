
## Function Example

```javascript Javascrip
/// Create instance
const connection = urchin(...config); 

/// Load data
connection.taxonomy.create(...taxonomyData);
connection.template.create(...templateData);
connection.entry.create(...entryData);

async = () => {
	const r = await connection.process();
}

```



Available Parameters:

| label/required | description             | type | default | valid values |
| :------------- | :---------------------- | :--- | :------ | :----------- |
| verbose        | log progress to console | bool | false   | true, false  |

## Response Example

```javascript
const results = 
{
 completed: true,
 taxonomies: [
    {
      publicKey: "", label: "", owner: "", parent: "", 
    }
  ], templates: [
    {

    }
  ], entries: [
    {

    }
  ], assets: [
    {
     
    }
  ] 
}
```
