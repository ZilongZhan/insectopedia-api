import { BugData } from "../types.js";
import { BugDataDto } from "./types.js";

export const mapBugDataDtoToBugData = ({
  name,
  scientificName,
  ...rest
}: BugDataDto): BugData => ({
  ...rest,
  commonName: name,
  latinName: scientificName,
});
