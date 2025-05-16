import { BugStructure } from "../types.js";

export type BugDto = Omit<
  BugStructure,
  "_id" | "commonName" | "latinName" | "class" | "phylum" | "order"
> & {
  id: string;
  name: string;
  scientificName: string;
  taxonomy: [phylum: string, className: string, order: string];
};

export type BugDataDto = Omit<BugDto, "id">;
