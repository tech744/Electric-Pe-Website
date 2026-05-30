import type { LongformSection } from "../types";
import { LF_CITIES_KARNATAKA } from "./lf-cities-karnataka";
import { LF_CITIES_NCR_UP } from "./lf-cities-ncr-up";
import { LF_CITIES_RAJUP } from "./lf-cities-rajup";

/**
 * Long-form body content for city (/stores/{city}) pages, keyed by city slug.
 * ~1,000–1,200 words of original prose per city across structured sections,
 * rendered as <h2> + paragraphs + optional bullets on the city page template.
 * Merged from per-region batch files for maintainability.
 */
export const CITY_LONGFORM: Record<string, LongformSection[]> = {
  ...LF_CITIES_KARNATAKA,
  ...LF_CITIES_NCR_UP,
  ...LF_CITIES_RAJUP,
};
