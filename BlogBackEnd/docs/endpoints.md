# Endpoints

- Sample bodies for their corresponding endpoints may also be found in the Postman collection.
- If no sample body is provided for any given endpoint, no sample body is required.
- Each section is labeled with its corresponding folder in Postman.

[Postman Collection](https://www.getpostman.com/collections/7a82d732c439d431359c) | [BASE URL](https://blogbackend-eli.herokuapp.com/api) | [Schema](https://dbdesigner.page.link/VfzyA87X2LzAs5nA8) | [Documentation](https://documenter.getpostman.com/view/6401823/T1LQi78J?version=latest) | [Endpoints](endpoints.md)

## Auth

### Endpoints

| Request Method | Endpoint    | Description                      |
| :------------- | :---------- | :------------------------------- |
| `POST`         | `/login`    | Logs user in and returns a token |
| `POST`         | `/register` | registers a user                 |

### Login Sample Body

```json
{
  "username": "johndoe123",
  "password": "password123"
}
```

### Registration Sample Body

```json
{
  "username": "johndoe123",
  "password": "password123",
  "email": "email@emailaddress.com"
}
```

## Users

### Endpoints

| Request Method | Endpoint          | Description           |
| :------------- | :---------------- | :-------------------- |
| `PUT`          | `/users/:usersid` | updates a user        |
| `DELETE`       | `/users/:usersid` | deletes a user        |
| `GET`          | `/users`          | returns list of users |
| `GET`          | `/users/:usersid` | returns a user        |

### PUT Sample Body

- can change one or more fields; every field not required to be included in every body submitted.

```json
{
  "username": "johndoe123",
  "email": "email@emailaddress.com"
}
```

## Authors

### Available Optional Query Parameters

- bio (case insensitive); any portion of a bio matching will be returned
- firstname (case insensitive); any portion of a first name matching will be returned
- lastname (case insensitive); any portion of a last name matching will be returned
- sortBy (firstname, lastname, id) (case sensitive)
- direction (asc/desc) (case sensitive)

### Endpoints

| Request Method | Endpoint                                               | Description                                                                                                  |
| :------------- | :----------------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `POST`         | `/authors/`                                            | creates an author                                                                                            |
| `PUT`          | `/authors/:authorsid`                                  | updates an author                                                                                            |
| `DELETE`       | `/authors/:authorsid`                                  | deletes an author                                                                                            |
| `GET`          | `/authors`                                             | returns list of authors & their posts & tags                                                                 |
| `GET`          | `/authors/:authorsid`                                  | returns an author & their posts & tags                                                                       |
| `GET`          | `/authors?sortBy=firstname&firstname=r&direction=desc` | returns list of authors sorted by firstname, filtered with first name to include r, and descending direction |
| `GET`          | `/authors?sortBy=lastname&firstname=r&direction=asc`   | returns list of authors sorted by lastname, filtered with first name to include r, and ascending direction   |

### POST Sample Body

- every field required to be included in every body submitted.

```json
{
  "bio": "I really enjoy writing. It is one of my favourite hobbies.\n\nFollow me on:\n-Instagram\n-Snapchat",
  "firstname": "Lainey",
  "lastname": "Ritter"
}
```

### PUT Sample Body

- can change one or more fields; every field not required to be included in every body submitted.

```json
{
  "bio": "I really enjoy writing. It is one of my favourite hobbies.\n\nFollow me on:\n-Instagram\n-Snapchat",
  "firstname": "Lainey",
  "lastname": "Ritter"
}
```

## Posts

### Available Required Query Parameters

- tags (`culture`, `design`, `health`, `history`, `politics`, `science`, `startups`, `tech`) (case insensitive)

### Available Optional Query Parameters

- sortBy (`author`, `authorId`, `likes`, `reads`, `id`) (case sensitive)
- direction (`asc`, `desc`) (case sensitive)

### Endpoints

| Request Method | Endpoint                                               | Description                                                                      |
| :------------- | :----------------------------------------------------- | :------------------------------------------------------------------------------- |
| `POST`         | `/posts/`                                              | creates a post                                                                   |
| `PUT`          | `/posts/:postsid`                                      | updates a post                                                                   |
| `DELETE`       | `/posts/:postsid`                                      | deletes a post                                                                   |
| `GET`          | `/posts?tags=tech,health`                              | returns list of posts (tag(s) required)                                          |
| `GET`          | `/posts/:postsid`                                      | returns a post                                                                   |
| `GET`          | `/posts?tags=tech,health&sortBy=author&direction=desc` | returns list of posts with corresponding tags, sort criteria, and sort direction |
| `GET`          | `/posts?tags=tech,health&sortBy=author&direction=desc` | returns list of posts with corresponding tags, sort criteria, and sort direction |

### POST Sample Body

- every field required to be included in every body submitted.

```json
{
  "authorsid": 9,
  "likes": 960,
  "reads": 50361
}
```

### PUT Sample Body

- can change one or more fields; every field not required to be included in every body submitted.

```json
{
  "authorsid": 9,
  "likes": 960,
  "reads": 50361
}
```

## Tags

### Available Tags

- `culture`, `design`, `health`, `history`, `politics`, `science`, `startups`, `tech`

### Endpoints

| Request Method | Endpoint                 | Description                                                            |
| :------------- | :----------------------- | :--------------------------------------------------------------------- |
| `POST`         | `/tags/`                 | creates a tag                                                          |
| `PUT`          | `/tags/:tagsid`          | updates a tag                                                          |
| `DELETE`       | `/tags/:tagsid`          | deletes a tag                                                          |
| `GET`          | `/tags`                  | returns list of tags                                                   |
| `GET`          | `/tags/authors`          | returns list of tags with corresponding authors & their matching posts |
| `GET`          | `/tags/posts`            | returns list of tags with matching posts & their corresponding authors |
| `GET`          | `/tags/:tagsid`          | returns a tag with matching posts & authors                            |
| `GET`          | `/tags/:tagname/authors` | returns a tag & matching authors                                       |
| `GET`          | `/tags/:tagname/posts`   | returns a tag & matching posts                                         |

### POST Sample Body

- every field required to be included in every body submitted.

```json
{
  "tagname": "culture"
}
```

### PUT Sample Body

- can change one or more fields; every field not required to be included in every body submitted.

```json
{
  "tagname": "culture"
}
```

## PostsTags

### Endpoints

| Request Method | Endpoint                  | Description                    |
| :------------- | :------------------------ | :----------------------------- |
| `POST`         | `/poststags`              | links a post to a tag          |
| `PUT`          | `/poststags/:poststagsid` | updates a post-tag link        |
| `DELETE`       | `/poststags/:poststagsid` | deletes a post-tag link        |
| `GET`          | `/poststags`              | returns list of post-tag links |

### POST Sample Body

- every field required to be included in every body submitted.

```json
{
  "postsid": 15,
  "tagsid": 1
}
```

### PUT Sample Body

- can change one or more fields; every field not required to be included in every body submitted.

```json
{
  "postsid": 15,
  "tagsid": 1
}
```

## Popularity

### Popularity: Endpoints

| Request Method | Endpoint     | Description                         |
| :------------- | :----------- | :---------------------------------- |
| `GET`          | `/mostliked` | returns list of 20 most liked posts |
| `GET`          | `/mostread`  | returns list of 20 most read posts  |
