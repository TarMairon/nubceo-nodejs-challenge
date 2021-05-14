# nubceo-nodejs-challenge
_This is responding to the Nubceo Node.js challenge_</br>
_I created a REST API following the bulletpoints given in [The Challenge](https://github.com/improvein/dev-challenge/tree/master/backend-nodejs)_</br>
_Several libraries were used, which will be listed at the bottom of this file_
_All URLs are assuming the API is running on a local enviroment, so a **localhost** is used with and enviroment **PORT** variable_</br>
_Please bear this in mind if you plan on running the server and make the necesary changes_</br>

## DATABASE MODEL
The API is using a **Non-SQL** databese though **MongoDB**
Entities are described as follows:

* **USER**</br>
A user entity containing some basic data
* **GENRE**</br>
A genre entity which holds a list of screening genres with it's data.
* **TYPE**</br>
A type entity which holds a list of screening types, being **Movie** or **TV Show** 
* **SCREENING**</br>
A screening entity which holds a list of screenings with it's data
The entity is populated with **TYPE** and **GENRE** for a basic filter. Also populated with **PEOPLE** for it's director and actors
Being it necesary (ex: if a TV Show is being shown), the entity is also populated with **SEASON**
* **SEASON**</br>
A season entity which holds a list of screening seasons with it's data
* **EPISODE**</br>
A episode entity which holds a list of season episodes with it's data
* **PEOPLE**</br>
A people entity containing some basic data

## FUNCTIONALITY
### Running the project
As prerequisites, it is assumed Node.js and MongoDB are installed and running.</br>
To run the project, one should first download this repository and install it's dependencies.</br>
After that, a terminal should be opened and navigated to the project folder, where two commands were set for it to run: 
_start_ (intended for production) and _dev_ (intended for developing, running through **nodemon**)</br>
I left the _**.env**_ file in the repo to show the enviroment variables used in the proyect, so one doesn't have to find them in code and create them.
These variables are used with the **dotenv** library installed as development only.
```
npm start
```
```
npm run dev
```

### Endpoints
Below is the list of endpoints created for each case requested</br>
All the data requested and responded will be in JSON format</br></br>

* Endpoints for authentication using JWT.</br>
This endpoint should carry a **userName** and **password** in it's body, and will respond with a **loggedUser**, **token** and **refreshToken**
```
localhost:3000/api/user/login
```

* Also an endpoint for refreshing the JWT access token.</br>
_This endpoint is expecting an **Authorization** header with the **refreshToken** given in the login_</br>
This endpoint carrys no body or params, just the header, and will respond with a new **token**
```
localhost:3000/api/refresh-token
```

* Endpoint for retrieving movies. It should be allowed to filter and sort by some field.</br>
This endpoint is expecting some **query** parameters as filter by content, including **imdbID**, **title**, **genreID** and **typeID**</br>
_To filter for a **movie**, one should filter with a **typeID** refering to the **Movie** entry in the **TYPE** entity._
_This was done assuming that the episode was selected from a list of episodes shown to the user._
```
localhost:3000/api/screening/search
```

* Endpoint for retrieving the information (director included) of a specific episode of a TV Show.</br>
This endpoint is expecting a **path** parameter containing the **id** of the episode being retrieved
```
localhost:3000/api/episode/:id
```

* Endpoint for adding a new object (it could be for any entity you like)</br>
_I opted for the **User** entity for no other reason than I needed to create a user to test the JWT Authentication TOKENS_</br>
This endpoint should carry **User** data in it's body, requiring, but not limited to, **name**, **email**, **userName** and **password**
```
localhost:3000/api/user/create
```

## LIBRARIES
Here is the list of libraries used in the proyect.</br>
This is added just as an info section, since all dependencies can be added through the _package.json_.</br>

### Global dependencies
[express](npmjs.com/package/express)</br>
[bcrypt](npmjs.com/package/bcrypt)</br>
[jwt-simple](npmjs.com/package/jwt-simple)</br>
[moment](npmjs.com/package/moment)</br>
[mongoose](npmjs.com/package/mongoose)</br>

### Dev dependencies
[nodemon](npmjs.com/package/nodemon)</br>
[dotenv](npmjs.com/package/dotenv)

## FINAL NOTE
Anything and everything here and everywhere else was coded by me and my coffee machine.
I wanted to take the time and say thanks to my beloved coffee maker, which stands by me in thick and thin.</br>
Also, my girlfriend, becasue she proof reads this things and I don't want her to get mad at me 😆</br>

Any thoughts, questions or crtisisms are more than welcome as a learning experience.
