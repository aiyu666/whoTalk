## How to use

### development

1. `npm install`
2. `npm run dev`

### production

1. `npm install --production`
2. `npm run dev` PS: You can use vscode debugging feature to connect server

## Migrate

* Migrate up: `npm run migrateUp`
* Migrate down: `npm run migrateDown`

## Tools

### Adminmongo

![](./docs/image/adminMongo.jpg)

1. `docker-compose up`
2. Open terminal. Connect to `localhost:1234`
3. Set connection configs
    ```
    Connection name: Any name
    Connection string: mongodb://root:example@mongo:27017
    ```