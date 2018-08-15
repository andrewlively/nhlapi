import { CONFERENCES, League } from "../../src";

test("League | Conferences | Get all conferences", async () => {
  const conferences = await new League().getConferences();

  expect(conferences).toHaveLength(2);
});

test("League | Conferences | Get Eastern", async () => {
  const eastern = await new League().getConference(CONFERENCES.EASTERN);

  expect(eastern.name).toBe("Eastern");
});
