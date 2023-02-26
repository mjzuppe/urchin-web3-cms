## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const connection.entry.create([...EntryInput]);


```



## Parameters for EntryInput

| label/required  | description                                                         | type         | default | valid values                                                     |
| :-------------- | :------------------------------------------------------------------ | :----------- | :------ | :--------------------------------------------------------------- |
| template\*      | reference to template in which entry is based upon                  | PublicKey    |         |                                                                  |
| taxonomy        | associated taxonomies                                               | \[PublicKey] | \[]     | array length \< 4                                                |
| private         | only permit retrieving only when author is requesting               | boolean      | false   |                                                                  |
| immutable       | discontinue ability to update entry                                 | boolean      | false   |                                                                  |
| inputs          | array of objects                                                    | \[object]    | \[]     |                                                                  |
| inputs[i].label | matching label based on parameter within referenced template.inputs | string       |         | must match from associated template                              |
| inputs[i].value | associated value                                                    | any          |         | will be validated via template.inputs[i].validation if it exists |

## Response Example

```javascript
[
  {
  	template: "5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd",
    taxonomy: [],
    private: false,
    immutable: false,
    inputs: [
      {
      	headline: "this is a blog post",
        stage: "published",
        "featured image": "./hero.img",
        body: "this is the body of the post."
      }
    ]
  }
]
```