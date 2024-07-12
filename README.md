# Powerzone Inventory System
![badge-js](https://img.shields.io/badge/Javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![badge-mongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![badge-hbs](https://img.shields.io/badge/Handlebars-f0772b?style=flat&logo=handlebarsdotjs&logoColor=white)
![badge-CSS3](https://img.shields.io/badge/CSS-%231572B6.svg?style=flat&logo=css3&logoColor=white)

A web-based inventory system built for Powerzone Petroleum Products Corporation.

<img src="https://github.com/user-attachments/assets/7fe4a831-c082-4b12-b36c-07c96325d905" width="90%" height="90%">

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

## Project Team
- Lander Cua
- Anna Patricia Desembrana
- Jacob Bryan Gaba
- Clarissa Mandadero
- Elyssia Barrie Ong
- Patrick Ong
- Nathan Von Rodriguez

##
This project is the overarching requirement for a software engineering class in De La Salle University.
