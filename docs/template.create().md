## Function Example

```javascript JavaScript
/// Create instance
const connection = urchin(...config); 

const connection.template.create([...templateInput]);


```



## Parameters for TemplateInput

| label/required         | description                                     | type                                        | default | valid values                                |
| :--------------------- | :---------------------------------------------- | :------------------------------------------ | :------ | :------------------------------------------ |
| title\*                | name of taxonomy reference                      | string                                      | ""      | length 1-200 characters                     |
| private                | only permit entries to this template from owner | boolean                                     | true    |                                             |
| inputs\*               | array of objects                                | \[object]                                   | \[]     |                                             |
| inputs[i].label\*      | field input label                               | string                                      |         | length 1-24                                 |
| inputs[i].type\*       | field input type                                | string                                      | "text"  | "text","textarea","select","numeric","file" |
| inputs[i].options      | options when using type "select"                | \[string]                                   |         | string length 1-24                          |
| inputs[i].validation\* | method to validate input                        | [Joi Object](https://joi.dev/api/?v=17.8.1) |         |                                             |

## Response Example

```javascript
[
  {
    title: "Blog Post",
    inputs: [
      {
        label: "headline",
        type: "text"
      },
        {
        label: "stage",
        type: "select",
        options: [
        	"published",
          "draft"
        ]
        },
      {
      	label: "featured image",
        type: "file",
      },
      {
      	label: "body",
        type: "textarea"
      }
      }
    ]
  }
]
```