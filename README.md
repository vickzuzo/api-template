### EMEDIC VENDOR PLATFORM [(visit)]("https://vendor.emedic.com")

```bash
# setup with configure client
# create a file configureClient.js in src/api folder.
## put below inside the file
```

```javascript
const axios = require('axios');
const fs = require('fs');

const configureClient = async () => {
  try {
    const {data} = await axios.get('swagger url here');
    // const { data } = await axios.get('http://localhost:5055/explorer/openapi.json');
    const schemas = Object.keys(data.components.schemas).reduce((t, a) => {
      t[a] = {
        type: 'object',
        ...data.components.schemas[a],
      };
      return t;
    }, {});
    data.components.schemas = schemas;
    fs.writeFile('openapi.json', JSON.stringify(data), function (err) {
      if (err) console.log({err});
    });
  } catch (error) {
    console.log({error});
  }
};

configureClient();
```

```javascript
// add package.json script to "generate-openapi".
 "generate-openapi": "node src/api/configureClient.js",

// update package.json script 'generate-client'.
 "generate-client": "npm run generate-openapi && openapi --input openapi.json --output ./src/generated --useOptions --useUnionTypes --request ./src/api/request.ts --client axios && yarn format-client"
```

```bash
    # MODIFICATIONS YOU CAN ADD
    # - delete openapi.json file after script is done executing and is successful.
```
