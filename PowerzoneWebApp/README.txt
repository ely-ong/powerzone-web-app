HOW TO RUN THE APPLICATION:

1. Copy the github project to a new folder in your PC
(if not the first time, then you can just update your copy of the project by copying the files that 
were pushed since the last time you updated your copy of the project)

2. Open the *updated* project folder in your command prompt and IF it is your first time, paste this command line into your command prompt:
			
	npm i supervisor express body-parser mongodb hbs routes session bcrypt mongoose express-session

3. Once the packages are done installing, run the web app using supervisor by typing this in the command prompt:

	supervisor index.js

4. The following should show up in your command prompt:

Running node-supervisor with
  program 'index.js'
  --watch '.'
  --extensions 'node,js'
  --exec 'node'

Starting child process with 'node index.js'
Watching directory 'C:\Users\*YOUR USERNAME*\Desktop\CSSWENG MP' for changes.
Press rs for restarting the process.
Server running at:
http://localhost:3000
Connected to: mongodb+srv://PowerzoneAdmin:SnowYukiNalu@powerzonedb.zucj5.mongodb.net/Database?retryWrites=true&w=majority


   Copy "http://localhost:3000" into your web browser, and the log-in page should show up :)