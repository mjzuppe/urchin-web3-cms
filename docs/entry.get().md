## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const getAll = connection.entry.get();
const getOne = connection.entry.get(...EntryGetInput);


```



## Parameters for EntryGetInput

| required | description                          | type         | default | valid values |
| :------- | :----------------------------------- | :----------- | :------ | :----------- |
| No       | Entry data to retrieve by public key | \[PublicKey] |         |              |

## Response Example

```javascript
[
  {
  	publicKey: "", 
    owner: "",
    version: 0,
    template: "5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd",
    taxonomy: [],
    private: false,
    immutable: false,
    inputs: [
      {
      	headline: "this is a blog post",
        stage: "published",
        "featured image": {publicKey: "", url: "url://"}, //Note that files return objects
        body: "this is the body of the post."
      }
    ]
  }
]
```