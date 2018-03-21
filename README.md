# Type/Code Development Exercise

For this excercise you are tasked with recreating this article page with one interactive element, an editable title.

The page layout should be recreated in HTML/CSS to replicate the mockup as closely as possible. The mockup can be found in two formats, PDF and Illustrator in the excercise directory.

Assets for the page layout can be found in the excercise/assets directory. Please note that the text of the Article header is transparent to reveal the hero image behind - this is the only element on the page with that effect.

The page layout uses a grid system (guides can be seen in the Illustrator file). At desktop size, this grid is made up of fixed-width gutters on the left and right, with 8 fluid-width columns filling the remaining space in between. (If you're feeling ambitious, you're free to also re-interpret the grid system for smaller viewport sizes).

The one non-standard font used, Copernicus, can be found converted for web use in the excercise/fonts directory. The two other fonts used, Futura and Palatino, are found standard on OS X so it's safe to assume (for the sake of this excercise) that the are present on the user's computer.

The primary interactive element of this excerise is the editable article header. Outside of this, everything on the page can be static - no hover states, no nothing. The article header follows a fairly standard 'edit in place' pattern. In 'edit mode', as a user enters a title for the page, a slug is automatically generated based off of that title. If the slug already exists in the database, an additional 5 random characters should be appended to the generated slug to dodge the collision.

The UI interactions should be powered by Javascript using whatever patterns or frameworks you think are best suited.

The title of the page should be persisted across page reloads in a database. Use whatever database makes the most sense.

It's not necessary to create any functionality that allows the user to create additional pages, or access other pages.

To create some test data, please populate the database with five pages with the following titles. Each page should have a slug that is generated with the same protocol that will be used in the implementation. It should be possible to quickly populate the database with these pages - so consider creating a fixture.

- "It is impossible to walk rapidly and be unhappy."
- "We don't get offered crises, they arrive."
- "I have seen the future and it doesn't work."
- "I dwell in possibility..."
- "Knowledge is power."

The backend software can be created in whatever language and framework you think is best suited.

Specifications for the editable are below as user stories:

- In 'read mode', user sees page title as stored in database.
- In 'read mode', user sees 'edit button'.
- User can click yellow edit button to switch to 'edit mode'.
- In 'edit mode', user sees 'discard button' and 'save button'.
- User can see existing page title in input field upon switching to 'edit mode'.
- User can modify title in 'edit mode'.
- User cannot submit title with 0 characters.
- User sees disabled (grayed out) save button if input contains 0 characters.
- User is presented with a generated slug upon modifying the value of the title input (on keyup).
- If a generated slug conflicts with one already in the database, 5 random characters should be appended to the slug.
- User can click 'save button' to persist title and slug to database and be returned to 'read mode'.
- User can click 'discard button' to discard any modifications.


Please work from this directory, and share your implementation. Ideally, you can create a Git repository and invite us as a collaborator. Instructions should be added to this README file that allow us to take your code, run the application, and evaluate your work. Code should be annotated where sensible.

As a whole, this exercise aims to touch on a variety of skills and concepts involved in a lot of development at Type/Code. Throughout the process, please feel free to reach out for help - while we're reluctant to give hints for implemenation, we're glad to clarify specifications. Please dedicate no more than 12 hours to the exercise - while 100% completion is great, it's not expected - focus on the areas where you know you can excel and identify areas where you might need some help.

# Developer Notes
## Todo list

- [x] create a checklist
- [x] setup project dependencies
- [x] implement the epitome backend
- [X] create the rest api endpoints for the article's
   - [x] create the rest api endpoint list
   - [x] create the rest api endpoint get
   - [x] create the rest api endpoint post
   - [x] create the rest api endpoint patch
   - [x] create the rest api endpoint delete (just because I can not needed)
- [x] Configure webpack-dev-server
- [x] Configure webpack build
- [x] recreate the layout using react components
   - [x] create header to toggle list and home navigation
   - [x] create a basic list of the articles for indexing (just because it makes sense)
   - [x] create a body component that renders a body component containing predefined html
   - [x] create a meta component for meta sidebar
   - [x] create a text header component that uses canvas for see through block
~~- [ ] write unit tests for code where its reasonable and have time~~
- [x] document installation
~~- [ ] code cleanup when done and time remaining~~

~~~~
I ran out of time before I could write tests, this will be something that I will be implementing as part of the epitome framework that I wrote. This example app will serve as a first test when I do implement that. I would have used mocha and Controllers/Article.controller.test.js would return a function that gets the app container and controller instance.
~~~~

## Decisions and reasons for them
### Structure
rest-server: The rest-server folder is clearly named as a rest based server root directory in order to clarify the intent that in here is all the files for that project. Code can be split up to be contained is separate git repositories in order to minimize the impact a small change has on a development team.

front-end: Contains all the code used by the front end application. This would be moved to a separate github project and included as a sub project here. The front end can run its own server to do server side rendering.

common: Would be moved to a seperate github project and installed on both the front end and back end applications in order to share the common code of the project.

~~~~
#NOTE: for production you would run an HTTPS/HTTP2 server that would then use html streaming or http push to send the header with react and other vendor cdn links to the front end when request starts. The react application would then use server side rendering and send the response expectint react js files to be there already.
~~~~

### Libraries
epitome: A framework I am working on for running a backend on. The goal is to simplify and eliminate menial tasks that developers usually have to handle in the same way Laravel and CakePhp does in the php community. I used it so that you can be aware that I wrote it and this way you can see more of my code than what I can produce in 12 hours.

uni-validation: Another lib that I wrote (granted there are better options out there, like uni-validator), and decided to use so that you can go see my code quality there as well.

Rxjs: Great for all asynchronous coding. A dependency of uni-validation.

Styling: Done with an adaptation of my custom framework [dewwwald/Modern](https://github.com/dewwwald/Modern).

## INSTALLATION

The installation assumes that mongodb is setup with no user on the development machine.

Requirements:
- Mongodb v3.6.3
- node v8.9.4
- npm 5.6.0

This installs npm, builds the front end and starts the front end and back end server.
```
npm install
npm run seeder
npm start
```

### Requirements
- NodeJs v8.9.4
- MongoDB v3.4.2
- NPM 5.6.0


