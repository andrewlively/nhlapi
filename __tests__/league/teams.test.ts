import { League, TEAMS } from "../../src";

test("League | Teams | Get all teams", async () => {
  const teams = await new League().getTeams();

  expect(teams).toHaveLength(31);
});

test("League | Teams | Get only CBJ and MIN", async () => {
  const teams = await new League().getTeams({
    ids: [
      TEAMS.COLUMBUS_BLUE_JACKETS,
      TEAMS.MINNESOTA_WILD
    ]
  });

  expect(teams).toHaveLength(2);
});
