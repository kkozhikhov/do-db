## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Brief explanation of caching and optimization strategies

1. **Artist data caching with TTL and key update on new artist artwork**  
   When a new artwork is added for an artist, delete the relevant cache key so that the data is refreshed on the next request.

2. **Indexes**
   - a. **Index on classification**  
   
   - b. **Index on fields used in JOIN**  
   
   - c. **Partial index that only includes non-deleted entities**  
   
   - d. **Index on ID fields (for pagination)**  

3. **View table for aggregated values**  


p.s The task was done in 160 minutes 