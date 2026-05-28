import type { ChargingSection } from "./index";
import { LF_NCR } from "./lf-ncr";
import { LF_RAJGUJMP } from "./lf-rajgujmp";
import { LF_KARNATAKA } from "./lf-karnataka";
import { LF_SOUTH } from "./lf-south";
import { LF_MAHARASHTRA } from "./lf-maharashtra";
import { LF_EAST } from "./lf-east";
import { LF_VEHICLE } from "./lf-vehicle";
import { LF_HIGHWAY } from "./lf-highway";
import { LF_USECASE } from "./lf-usecase";

/**
 * Long-form, research-backed body content for charging pages, keyed by slug.
 * Each entry is ~1,000–1,200 words of original prose across structured
 * sections (rendered as <h2> + paragraphs + optional bullets).
 *
 * Sources are used for facts only; all prose is original. Bengaluru's
 * long-form lives inline on its ChargingPage entry (the format exemplar);
 * every other page's content is collected in the per-region batch files
 * and merged here.
 */
export const LONGFORM: Record<string, ChargingSection[]> = {
  ...LF_NCR,
  ...LF_RAJGUJMP,
  ...LF_KARNATAKA,
  ...LF_SOUTH,
  ...LF_MAHARASHTRA,
  ...LF_EAST,
  ...LF_VEHICLE,
  ...LF_HIGHWAY,
  ...LF_USECASE,
};
