import type { LongformSection } from "../types";
import { LF_LOC_BENGALURU } from "./lf-loc-bengaluru";
import { LF_LOC_DELHI } from "./lf-loc-delhi";
import { LF_LOC_KARNATAKA } from "./lf-loc-karnataka";
import { LF_LOC_NCR_UP } from "./lf-loc-ncr-up";
import { LF_LOC_RAJUPX } from "./lf-loc-rajupx";

/**
 * Long-form body content for locality pages, keyed by locality slug.
 * ~700–1,000 words of original, area-specific prose per locality (shorter
 * than city/charging long-form because there are many localities per city,
 * and we want a unique angle per locality without thin/duplicate content).
 * Merged from per-region batch files for maintainability.
 */
export const LOCALITY_LONGFORM: Record<string, LongformSection[]> = {
  ...LF_LOC_BENGALURU,
  ...LF_LOC_DELHI,
  ...LF_LOC_KARNATAKA,
  ...LF_LOC_NCR_UP,
  ...LF_LOC_RAJUPX,
};
