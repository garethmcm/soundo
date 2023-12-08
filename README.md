# Full stack code for Soundo app frontend and backend

The app is still undergoing development so development servers for both have to be initialised to use.

For frontend in React run the command yarn dev from within the lower soundo folder (ie soundo/soundo) and the app should become available on localhost:5173

Front end uses the Tone.js library which is included but can be installed again using yarn add tone if required. All audio files and source images are kept in soundo/assets.

For the backend, the Django virtual environment file env is in the first soundoback folder (soundo/soundoback), will activate on command source env/bin/activate. Manage.py is in lower soundoback folder (soundo/soundoback/soundoback), runserver command is python manage.py runserver

This uses Django, Django Rest Framework and Django Rest Framework Simple JWT packages which should be installed within the project - in case of errors use command pip install django djangorestframework djangorestframework-simplejwt

Project size was too large for submission on Moodle so 3 folders have been uploaded to a Dropbox folder. These folder do not contain any vital source code information, only external libraries and supplementary files needed to run the project, will not run properly without these files. .txt files have been put in locations to indicate where they are supposed to be and directory locations have been given below as well, from root directory

soundo/soundo/assets: https://www.dropbox.com/scl/fi/oajdt14auxl7jjpm4ott1/assets.zip?rlkey=vqeu5g9wph5s96cmybhmft4s6&dl=0
soundo/soundo/node_modules: https://www.dropbox.com/scl/fi/vlofdacung0nvzb7pulp2/node_modules.zip?rlkey=ufzzj46vwg4gpi6g8gp2xiqdx&dl=0

soundo/soundoback/env/lib: https://www.dropbox.com/scl/fi/tj7c3nvcevvoxdbngwzu0/lib.zip?rlkey=9cnhkq8lfuvtqih7xionc9l8f&dl=0
