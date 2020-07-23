# expressts-typeorm-base

Step 1:run ```bash npm install```

Step 2:config your database in file ```bash ormconfig.json```

Step 3: Start

Run the server in development mode: ```bash npm run start:dev```.

Run all ```bash unit-tests: npm test```.

Run a single unit-test: ```bash npm test -- --testFile="name of test file" (i.e. --testFile=Users)```.

Check for linting errors: ```bash npm run lint```.

Build the project for production: ```bash npm run build```.

Run the production build: ```bash npm start```.

Run production build with a different env file ```bash npm start -- --env="name of env file"``` (default is production).
