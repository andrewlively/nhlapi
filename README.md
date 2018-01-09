# nhlapi

Client for NHL Stats API

## Example

```js
import { Team } from "@andrewlively/nhlapi";

//  ...

const blueJackets = new Team(29);

const roster = await blueJackets.roster(); // Returns a promise

const schedule = await blueJackets.schedule({
  startDate: '2018-01-01',
  endDate: '2018-01-31',
  season: '20172018'
});

// ...
```
