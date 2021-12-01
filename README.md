# WeLoveMovies-Backend
Backend Live Preview: [click here](https://frozen-ravine-83173.herokuapp.com/movies/)

Project Prompt:
"You've been hired on as a backend developer at a new startup called WeLoveMovies! As another developer works on the design and frontend experience, you have been tasked with setting up a database and building out specific routes so that users can gain access to data about movies, theaters, and reviews."

For this project, I created the database queries using Knex, designed the express architecture, and set up a staging database using ElephantSql.

Technologies used: Node.js, Express.js, Knex.js, PostgreSQL.

# This API server expresses the following endpoints:

# /movies Route
### GET /movies (optional param is_showing)
Responds with a list of movies in the following format:
``
{
  "data": [
    {
      "id": 1,
      "title": "Spirited Away",
      "runtime_in_minutes": 125,
      "rating": "PG",
      "description": "Chihiro ...",
      "image_url": "https://imdb-api.com/..."
    }
    // ...
  ]
}
``
If specified as `GET /movies?is_showing=true`, the route only returns those movies where the movie is currently showing in theaters.

### GET /movies/:movieId
Responds with a movie matching the corresponding movieId requested.

Example: `GET /movies/1` Response:
``
{
  "data": {
    "id": 1,
    "title": "Spirited Away",
    "runtime_in_minutes": 125,
    "rating": "PG",
    "description": "Chihiro...",
    "image_url": "https://imdb-api.com/..."
  }
}
``
If no movie exists, an error will be returned as the response with status code 404: `{"error": "Movie cannot be found."}`

### GET /movies/:movieId/theaters
Responds with all theaters where the movie matching the requested movieId is playing. Example: `GET /movies/1/theaters` Response:
``
{
  "data": [
    {
      "theater_id": 2,
      "name": "Hollywood Theatre",
      "address_line_1": "4122 NE Sandy Blvd.",
      "address_line_2": "",
      "city": "Portland",
      "state": "OR",
      "zip": "97212",
      "created_at": "2021-02-23T20:48:13.342Z",
      "updated_at": "2021-02-23T20:48:13.342Z",
      "is_showing": true,
      "movie_id": 1
    }
    // ...
  ]
}
``
### GET /movies/:movieId/reviews
Responds with all reviews for the movie, including all of the critic details added to the critic key of the response. Example: `GET /movies/1/reviews` Response:
``
{
  "data": [
    {
      "review_id": 1,
      "content": "Lorem markdownum ...",
      "score": 3,
      "created_at": "2021-02-23T20:48:13.315Z",
      "updated_at": "2021-02-23T20:48:13.315Z",
      "critic_id": 1,
      "movie_id": 1,
      "critic": {
        "critic_id": 1,
        "preferred_name": "Chana",
        "surname": "Gibson",
        "organization_name": "Film Frenzy",
        "created_at": "2021-02-23T20:48:13.308Z",
        "updated_at": "2021-02-23T20:48:13.308Z"
      }
    }
    // ...
  ]
}
``
# /theaters Route
### GET /theaters
Responds with all theaters as well as all movies playing at each theater added to the movie key. Response looks like the following:
``
{
  "data": [
    {
      "theater_id": 1,
      "name": "Regal City Center",
      "address_line_1": "801 C St.",
      "address_line_2": "",
      "city": "Vancouver",
      "state": "WA",
      "zip": "98660",
      "created_at": "2021-02-23T20:48:13.335Z",
      "updated_at": "2021-02-23T20:48:13.335Z",
      "movies": [
        {
          "movie_id": 1,
          "title": "Spirited Away",
          "runtime_in_minutes": 125,
          "rating": "PG",
          "description": "Chihiro...",
          "image_url": "https://imdb-api.com...",
          "created_at": "2021-02-23T20:48:13.342Z",
          "updated_at": "2021-02-23T20:48:13.342Z",
          "is_showing": false,
          "theater_id": 1
        }
        // ...
      ]
    }
    // ...
  ]
}
``
# /reviews Route
## PUT /reviews/:reviewId
Partially or fully updates a review. If the ID is incorrect a `404` will be returned.

A body like the following should be passed along with the request:
``
{
  "score": 3,
  "content": "New content..."
}
``
The response includes the entire review record with the newly patched content, and the critic information set to the critic property.
``
{
  "data": {
    "review_id": 1,
    "content": "New content...",
    "score": 3,
    "created_at": "2021-02-23T20:48:13.315Z",
    "updated_at": "2021-02-23T20:48:13.315Z",
    "critic_id": 1,
    "movie_id": 1,
    "critic": {
      "critic_id": 1,
      "preferred_name": "Chana",
      "surname": "Gibson",
      "organization_name": "Film Frenzy",
      "created_at": "2021-02-23T20:48:13.308Z",
      "updated_at": "2021-02-23T20:48:13.308Z"
    }
  }
}
``
### DELETE /reviews/:reviewId
Deletes review matching reviewId. Returns status `204 No Content.`

If the given ID does not match an existing review, responds with status 404 and the following:
``
{
  "error": "Review cannot be found."
}
``
