An Airline backend project with the best practices. Project is created in a way that it can serve as a starter template for multiple node js projects.

`src` - Contains actual source code files and folders

 - `config` - All configurations or setup of a library or module is done here. ex: setting up `dotenv` so that we can directly use environment variables anywhere in the project without having to initialize the `dotenv` object everytime.

 - `routes` - In the routes folder, we register a route and bind them with corresponding middleware and controllers to it.

 - `middlewares` - they intercept the incoming requests where we write our validators.

 - `controllers` - include the business logic to be done when incoming request successfully passes through the middleware and returns required data or error on processing it.

 - `repositories` - contains logic to interact with DB, may contain raw queries.

 - `services` - contains business logic and interacts with the repositories for data from the database.

 - `utils` - contains helper methods, error classes, etc.

### Setup the project

 - Clone the repo on your local machine
 - In the root directory run the following command to get all the required dependencies for the project:
    ```
        npm install
    ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=<your port number>
    ```

    ex:
    ```
        PORT=3000
    ```

 - Inside the `src` folder, execute the following command:
    ```
        npx sequelize init
    ```
 - By executing this command 2 folders viz `migrations` and `seeders` will be created along with `config.json` file in `config` folder.
 - Fill in the required details for the environments that you require in your project
 - Finally execute the below command to run the server:
    ```
        npm run dev
    ```