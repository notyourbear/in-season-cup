import { HOCKEY_TEAMS } from "../constants/hockeyTeams";
import { TEAM } from "../types";

export const getTeamOwner = (team: TEAM) => {
  const hockeyteam = Object.values(HOCKEY_TEAMS).find(
    ({ teamName }) => teamName === team.teamName
  );

  return hockeyteam?.owner;
}