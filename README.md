# Starship Travel API

## Overview

This API consumes data from the Star Wars API at [swapi.tech](https://www.swapi.tech/). It takes a distance to be traveled as input and returns the name of the starship and the number of stops required to cover that distance.

## Usage
### Instalation

To install and use this api, follow this steps:
1. Clone the repository
   ```
   git clone <repo-url>
   ```
3. Install dependencies
   ```
   npm install
   ```
5. Run application
   ```
   nodemon src
   ```
7. Send requests using your local machine
   ```
   GET /starships?distance=
   ```

### Endpoint

The API endpoint is `/starships`.

### Query Parameters

- `distance`: The distance to be traveled.

### Example

#### Request

```
GET /starships?distance=1000000
```

#### Response

```json
[
  {
    "name": "Sentinel-class landing craft",
    "stops": 19
  },
  {
    "name": "Death Star",
    "stops": 3
  },
]
```
