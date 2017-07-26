# Trueque Gamer

# General workflow
1. Layout: Creating the static html and the css styles with stylus
1. React: Making the layout work dynamically with react.js
1. Django: Adding the backend for the site

# Important information
* In order to see only the react components working make sure the code is not in `production`
* Once the layout has come out to react production or to django, any change should be made directly into react process and not anymore in layout
* Use `'UNICODE_JSON': False` in settings under `REST_FRAMEWORK` configuration variable in odert to show utf-8 characters form the constants file in games app

## Important Commands
* `http-server web/react -p 8000`
* `./web/django/truegamer/manage.py runserver 8080` in order to run it with `localhost:8080`
* `gulp w-react`
* `w-react-django`
* `react-prod`
* run the db with `lunchy start postgres`
* stop the db with `lunchy stop postgres`
* To allow other to use the project use `manage.py runserver 0.0.0.0:8000`

#PostgreSQL

## Useful commands
* To start shell: `psql`
* To see databases in postgres' shell: `\l`
* To see users in postgres's shell: `\du`
* To connect to a database in postgres use `\connect <name of db>;`
* To see all the entries in a table use `SELECT * FROM <table>;`

## Run postgres for the very first time
Based on [this](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04) tutorial
1. Install lunchy `sudo gem install lunchy`
1. Run `lunchy start postgres` (to stop it use `lunchy stop postgres`
1. Run `psql` in shell
2. in postgres shell run `CREATE DATABASE <myproject>;`
3. Create the user for that db running `CREATE USER <username> WITH PASSWORD 'password';`
4. Change roles by running `ALTER ROLE myprojectuser SET client_encoding TO 'utf8';`
5. `ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';`
6. `ALTER ROLE myprojectuser SET timezone TO 'UTC';`
7. Grant privileges with `GRANT ALL PRIVILEGES ON DATABASE <myporject> TO <user>;`
8. After creating the empty database it is important to create a super user, see the section on how to create a super user

## How to create a super user
you can use this in the postgres shell (although with gae could have some preoblems, better use the django shell): `UPDATE auth_user SET is_superuser=true, is_staff=ture WHERE username='MikeWoodcock';`
or in django, which is not the best option:
1. run `manage.py shell`
2. `from django.contrib.auth.models import User`
3. `user = User.objects.get(username=`username`)
4. `user.is_staff = True`
5. `user.is_superuser = True`
6. `user.save()`

### Possible errors with postgres
* `psql: FATAL: database <user> does not exist`: the solution is to run `createdb` in the normal shell

## Google app engine
### Proxy to connect to db
In order to be able to connect to the google cloud sql instance (postgres) follow the next steps:
1. run `curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64`
2. and then make it executable with `chmod +x cloud_sql_proxy` 

### In order to initialize the proxy
use the following command in the same directory where you downloaded `cloud_slq_proxy`
* `./cloud_sql_proxy -instances="[YOUR_INSTANCE_CONNECTION_NAME]"=tcp:5432`
you can use `migrate` or `makemigrations` to create the tables needed.

### Using a google storage bucket

0. Make sure there is not an extra folder inside the `static` folder of each app
1. first run `./manage.py collectstatic`
2. upload the static files to the bucket with `gsutil rsync -R static/ gs://<your-gcs-bucket>/static` it sometimes will be necesary to change the `rsync` option because sometimes it will delete the cors file
3. make them publicly available with `gsutil defacl set public-read gs://<your-gcs-bucket>`
4. perhaps it will be necesary to change the cors settings, with `gsutil cors set cors-json.file.json gs://tg-static`

## Migrating to the new social django app

Follow the next link: [here](https://github.com/omab/python-social-auth/blob/master/MIGRATING_TO_SOCIAL.md)

## How to move react to django?
1. Run `gulp react-prod-django`
2. Run `gulp css-prod` 

### In order to use fetch with REST framework
See [here](https://gist.github.com/marteinn/3785ff3c1a3745ae955c)
