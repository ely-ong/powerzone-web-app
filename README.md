# Powerzone Web Application Project

## Setup Instructions
1. Clone this repository:
```
  git clone https://github.com/ely-ong/powerzone-web-app.git
```

2. Open the project folder in your command prompt 
```
  cd powerzone-web-app/PowerzoneWebApp
```

3. If opening the project for the first time, install the required packages:
```
  npm i supervisor express body-parser mongodb hbs routes session bcrypt mongoose express-session
```

4. Run the web app using supervisor using the following command:
```
  supervisor index.js
```

  The following should show up in your command prompt:
  ```
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
  ```
5. Open http://localhost:3000 in your web browser to view the application.
