import { DIVISONS, League } from '../../src/libs/League';

test("League | Divisions | Get all divisons", async () => {
  const divisons = await new League().getDivisions();

  expect(divisons).toHaveLength(4);
});

test("League | Divisions | Get Metro", async () => {
  const metro = await new League().getDivision(DIVISONS.METROPOLITAN);

  expect(metro.name).toBe("Metropolitan");
});
