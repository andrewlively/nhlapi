# nhlapi

Client for NHL Stats API

[![Build Status](https://travis-ci.com/andrewlively/nhlapi.svg?branch=master)](https://travis-ci.com/andrewlively/nhlapi)

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

Thanks to @dword4 for helping document the [available endpoints](https://gitlab.com/dword4/nhlapi)!
