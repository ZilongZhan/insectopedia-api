import { Types } from "mongoose";

export interface BugStructure {
  _id: Types.ObjectId;
  commonName: string;
  latinName: string;
  imageUrl: string;
  description: string;
  isDangerous: boolean;
  isFavorite: boolean;
  className: string;
  phylum: string;
  order: string;
}

export interface BugsInfo {
  bugs: BugStructure[];
  bugsTotal: number;
}

export type BugData = Omit<BugStructure, "_id">;
