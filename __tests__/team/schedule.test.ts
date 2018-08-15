import { Team, TEAMS } from "../../src/libs/Team";

test("Team | Schedule | Get CBJ 2017-2018 Schedule", async () => {
  const cbj = new Team(TEAMS.COLUMBUS_BLUE_JACKETS);

  const schedule = await cbj.getSchedule({
    endDate: new Date(2017, 8, 20),
    season: "20172018",
    startDate: new Date(2017, 8, 18),
  });

  expect(Array.isArray(schedule)).toBeTruthy();
  expect(schedule.length).toBeTruthy();
});