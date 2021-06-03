# Tot backend exercise: simple version

We ask you to develop a RESTful API that manages users of an application.

The API should enable a client to create users (name and email address will suffice). Users must be unique by their email address.

We’ll use this exercise to evaluate your skills on software engineering, code quality, error handling, type safety and dependency management.

### Requirements

- The application must be developed for Node.js. We prefer TypeScript. If you’re not comfortable with it, you can use JavaScript;
- You’re free to use any framework and library that you think best;
- Data must be stored in a SQL database of your choice;

### Nice to have

- We embrace functional programming paradigms, we would be happy to see how much familiar you are with it;
- A Dockerfile for the application and a docker-compose file to run the whole ecosystem;
- OpenAPI documentation;
- Feel free to add validation rules in addition to the required ones.

# How to run
In order to easily run the project you should have `make` installed on your local machine

To setup the project run:
`make setup`

You can get a shell into the node container running:
`make sh`

To execute the test suite run:
`make test`

To build the production image run:
`make build-image`


