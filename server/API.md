# API Routes

# Funcdef


### Overview

```
GET:  

    ["funcdef/all", "/funcdef"] returns all the function definitions
    ["funcdef/:id"] returns the function definiton with the specific ID

POST: 

    ["/funcdef/save"] saves a function definition

```

-----------------------
## Get all the funcdefs

ROUTE: `GET:  /funcdef/all` <br>

- RESPONSE <br>

```json
{
  "message": "",
  "data": [
    {
      "_id": "5e85b4ec632c2530d4943515",
      "latestVersionNumber": 1,
      "latestVersion": {
        "description": "newstuff",
        "name": "renamedstuff",
        "functionVariables": [],
        "versionNumber": 1
      }
    },
    {
      "_id": "5e85b4ee632c2530d4943516",
      "latestVersionNumber": 9,
      "latestVersion": {
        "description": "ok",
        "name": "nynynyigengeningene",
        "functionVariables": [],
        "versionNumber": 9
      }
    },
    {
      "_id": "5e85cd60e7428b0ef659c8e6",
      "latestVersionNumber": 1,
      "latestVersion": {
        "description": "newstuff",
        "name": "renamedstuff",
        "functionVariables": [],
        "versionNumber": 1
      }
    },
    {
      "_id": "5e85cd62e7428b0ef659c8e7",
      "latestVersionNumber": 1,
      "latestVersion": {
        "description": "newstuff",
        "name": "renamedstuff",
        "functionVariables": [],
        "versionNumber": 1
      }
    }
  ]
}
```

-----------------------
## Get the versions
- Will return an array of the available versions for the specified funcdef id <br>

ROUTE: `GET: /funcdef/version/snapshot/5e85b4ee632c2530d4943516` <br>

- RESPONSE <br>
```json
{
  "message": "Fetched version numbers",
  "data": [
    {
      "_id": "5e85b4ee632c2530d4943516",
      "latestVersionNumber": 8,
      "versionNumbers": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
      ]
    }
  ]
}
```

-----------------------
## Get funcdef with id
- Will return the latest version with the specified id <br>

ROUTE: `GET: /funcdef/:id` <br>

- RESPONSE <br>
```json
{
  "message": "",
  "data": {
    "_id": "5e85b4ee632c2530d4943516",
    "latestVersionNumber": 8,
    "latestVersion": {
      "description": "ok",
      "name": "nynynyigengeningene",
      "functionVariables": [],
      "versionNumber": 8
    }
  }
}
```
-----------------------
## Get a specific funcdef version number

ROUTE: `GET: /funcdef/:id/:versionNumber?` <br>

- RESPONSE <br>
```json
{
  "message": "",
  "data": {
    "_id": "5e85b4ee632c2530d4943516",
    "targetVersion": {
      "description": "ok",
      "name": "nynynyigengeningene",
      "functionVariables": [],
      "versionNumber": 6
    }
  }
}
```

-----------------------
## Add a funcdef version

ROUTE:  `POST: /funcdef/version/add` <br>

- PAYLOAD <br>
```json
{
"_id": "5e85b4ee632c2530d4943516",
    "content":
    {
        "description": "ok",
        "name": "nynynyigengeningene",
        "functionVariables": []
    }

}
```

-----

- RESPONSE <br>
```json
{
  "message": "Versioned function definition",
  "data": {
    "_id": "5e85b4ee632c2530d4943516",
    "description": "ok",
    "name": "nynynyigengeningene",
    "functionVariables": [],
    "versionNumber": 9
  }
}
```