import { League } from '../../src/libs/League';

test("League | Standings | Get latest", async () => {
  const standings = await new League().getStandings();

  expect(standings).toHaveLength(4);
});

test("League | Standings | Get 2017-2018", async () => {
  const standings = await new League().getStandings({ season: "20172018" });

  expect(standings).toHaveLength(4);
});

test("League | Standings | Get Jan 1, 2018", async () => {
  const standings = await new League().getStandings({ date: new Date(2018, 0, 1) });

  expect(standings).toHaveLength(4);
});
