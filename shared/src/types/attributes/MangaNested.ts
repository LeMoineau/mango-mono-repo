import { MangaFormattedName } from "../primitives/Identifiers";
import { Identified } from "./Identified";

export interface IntersiteMangaNested {
  formattedName: MangaFormattedName;
}

export interface IdentifiedIntersiteMangaNested
  extends IntersiteMangaNested,
    Identified {}

export interface MangaNested {
  endpoint: string;
  title: string;
}

export interface IdentifiedMangaNested extends MangaNested, Identified {}
