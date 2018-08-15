# nhlapi

Client for NHL Stats API

## Example

```js
import { Team, TEAMS } from "@andrewlively/nhlapi";

//  ...

const blueJackets = new Team(TEAMS.COLUMBUS_BLUE_JACKETS);

const roster = await blueJackets.getRoster();

const schedule = await blueJackets.schedule({
  startDate: new Date(2018, 0, 1),
  endDate: new Date(2018, 0, 31),
  season: "20172018"
});

// ...
```
