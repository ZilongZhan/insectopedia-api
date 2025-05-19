import { BugData } from "../types.js";
import { BugDataDto } from "./types.js";

export const mapBugDataDtoToBugData = ({
  name,
  scientificName,
  phylum,
  className,
  order,
  ...rest
}: BugDataDto): BugData => ({
  ...rest,
  commonName: name,
  latinName: scientificName,
  phylum,
  class: className,
  order,
});
