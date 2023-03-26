## [Calendar-app Netlify](https://lucent-praline-056e76.netlify.app/)

After launching the application, the user can create new events by clicking on the dates in the calendar and entering information about the event. The user can also edit and delete existing events by clicking on the corresponding buttons in the interface.

The application allows you to view the calendar in week mode. To change the viewing week, click on the toggle button at the top of the application. By pressing the "Today" button, you will return to the current week for planning.

## Functionality:

The app was developed using the React library

When you click the "create" button, by default, the nearest possible time for an event with a duration of 1 hour is selected

Events are created according to the rules:

- created within one day
- duration not less than 15 min. no longer than 6 hours.
- start and end times in multiples of 15 minutes

When you click on the hour cell, the application will offer to create an event in the selected range

You cannot delete an event 15 minutes before it starts

## Style

### Project commands:

- `npm start ` "Starting project"
- `npm run build` "Bundling project"

### The tech stack is:

- [HTML5](http://htmlbook.ru/html)
- [CSS3](https://developer.mozilla.org/ru/docs/Web/CSS)
- [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Sass (Scss)](https://sass-lang.com/)
- [BEM methodology](https://en.bem.info/methodology/)
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
- [React](https://en.reactjs.org/)
- [Moment](https://momentjs.com/)

### Author:

- Vladislav Rozhuk
