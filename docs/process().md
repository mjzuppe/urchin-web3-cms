
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
 payer: "5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd",
 owner: "5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd",
 taxonomies: [
    {
      publicKey: "", label: "", parent: "", 
    }
  ], templates: [
    {
    	title: "", inputs: [], private: true, version: 0,
    }
  ], entries: [
    {
      //
    }
  ], assets: [
    {
      publicKey: "", arweaveId: "", url: "", metadataId: "" 
    }
  ] 
}
```



`playa().run()` // runs all functions. If assets are uploading AND entries being created, entry values can scan for `{{filename}}` and replace with arweave URL