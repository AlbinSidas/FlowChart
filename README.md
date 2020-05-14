# FlowChart
This project will create a simple flowchart with great extendability.


## Installationsguide:
1. Go to webpack webpage and download webpack.
```
 npm install webpack webpack-cli --save-dev 
 and
 npm install -g webpack
```

2. To bundle the project 
* Go to the folder where webpack.config.js resides and run
```bash
webpack
```

## To run dev-server:
* Navigate to directory-root.
* Run 
```
npm run start:dev or npm run webpack
```
Then open your browser and go to http://localhost:9000/.

### General codeguidelines:
* Underscore( _ ) at the start of a variable name marks an private variable.
* Tabs are two spaces.


## If you want to start everything (client & server)
* make it executable the first time
`chmod +x start_server_and_client.sh` 


* Run the below command, specify `<PORTNUMBER>` as `27018` or whatever number you want, the defualt is `27017`
```sh
./start_server_and_client.sh <PORTNUMBER>
```
## Prettier

* Install<br>
`npm install --global prettier`

* Run prettier
```bash
 prettier --single-quote --trailing-comma all --tab-width 4 --write docs package.json "scripts/**/*.js"
 prettier --single-quote --trailing-comma all --tab-width 4 --write docs package.json "server/**/*.js"
```
