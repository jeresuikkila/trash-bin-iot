

# Usage

## Environment variables

Environment variables in a nutshell:

1. Create `.env` file into `trash-bin-iot/frontend/`

2. Add environment-specific variables on new lines in the form of for example:

    ```sh
    REACT_APP_TEST=123
    REACT_APP_API_KEY=asd123
    ```

3. `require('dotenv').config()` as early as possible in your application, i.e., `trash-bin-iot/frontend/src/index.js`. This places the values into `process.env`

4. Access the `.env` values anywhere in the code with for example `process.env.REACT_APP_API_KEY`

More about using dotenv package at https://www.npmjs.com/package/dotenv

# Create React App info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Run the app in Docker

`docker run --rm -p 3000:3000 jeresuikkila/trash-bin-iot-frontend`
