# Full stack code for Soundo app frontend and backend

The app is still undergoing development so development servers for both have to be initialised to use. 

For frontend in React run the command yarn dev from within the lower soundo folder (ie soundo/soundo) and the app should become available on localhost:5173

Front end uses the Tone.js library which is included but can be installed again using yarn add tone if required. All audio files and source images are kept in soundo/assets.

For the backend, the Django virtual environment file env is in the first soundoback folder (soundo/soundoback), will activate on command source env/bin/activate. Manage.py is in lower soundoback folder (soundo/soundoback/soundoback), runserver command is python manage.py runserver

This uses Django, Django Rest Framework and Django Rest Framework Simple JWT packages which should be installed within the project - in case of errors use command pip install django djangorestframework djangorestframework-simplejwt


