# Trueque Gamer

# General workflow
1. Layout: Creating the static html and the css styles with stylus
1. React: Making the layout work dynamically with react.js
1. Django: Adding the backend for the site

# Important information
* Once the layout has come out to react production or to django, any change should be made directly into react process and not anymore in layout
* Use `'UNICODE_JSON': False` in settings under `REST_FRAMEWORK` configuration variable in odert to show utf-8 characters form the constants file in games app

## Important Commands
* `http-server web/react -p 8000`
* `./web/django/truegamer/manage.py runserver 8080` in order to run it with `localhost:8080`
* `gulp w-react`
* `w-react-django`
* `react-prod`

## How to move react to django?
1. Run `gulp react-prod-django`
2. Run `gulp css-prod` 
