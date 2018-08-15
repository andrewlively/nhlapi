import { Team, TEAMS } from "../../src/libs/Team";

test("Team | Roster | Get CBJ Roster", async () => {
  const cbj = new Team(TEAMS.COLUMBUS_BLUE_JACKETS);

  const roster = await cbj.getRoster();

  expect(Array.isArray(roster)).toBeTruthy();
  expect(roster.length).toBeTruthy();
  expect(roster[0].jerseyNumber).toBeDefined();
});
