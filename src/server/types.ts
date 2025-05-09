import { Request } from "express";

interface BugsQuery {
  pageNumber: string;
}

export type BugsRequest = Request<unknown, unknown, unknown, BugsQuery>;

export interface ErrorResponse {
  error: string;
}
