App name and a brief description of the project

- Movie Reviewer
- - website that lets user create an account and while logged in they can add movies and reviews for movies and vote on other user reviews

A list of authors

- EJ, Tyler, Sky

A list of features included in the site

- A home page that displays all the movies added by other users
- A user can create a new account or sign into an existing one
- A logged in user can add a profile image to there profile page
- When logged in a User can add a new movie to the site
  - A user can also view any movies info hosted on the site and write reviews for that specific movie
  - A user can delete or edit there reviews and upvote/downvote other users reviews

An outline of the technologies in the project

- express, react, nodejs, objection/knex, passport, PSQL,

Install

- From github clone the repo
- In your terminal navigate to the apps directory and run `yarn install`
- Once install you will need to create a local data base in the terminal `createdb movie-reviewer_development`
- The data base will need tables and seeded data provided, in the terminal you need to run the following commands in the server directory ` yarn migrate:latest` `yarn db:seed`
