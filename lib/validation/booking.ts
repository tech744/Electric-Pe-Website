import { z } from "zod";

/**
 * Indian mobile number - 10 digits, optionally prefixed with +91 or 91.
 * We normalise to the 10-digit form on successful parse.
 */
const indianPhoneSchema = z
  .string()
  .trim()
  .regex(/^(?:\+?91)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number")
  .transform((v) => v.replace(/^(\+?91)/, ""));

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name")
  .max(80, "Name is too long");

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(120);

const consentSchema = z
  .boolean()
  .refine((v) => v === true, "Please accept the terms to continue");

const citySlugSchema = z.string().min(2).max(40);
const storeSlugSchema = z.string().min(2).max(80);
const modelSlugSchema = z.string().min(2).max(80);
const pincodeSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode");

/** POST /api/book-test-ride */
export const bookTestRideSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  city: citySlugSchema,
  pincode: pincodeSchema,
  model: modelSlugSchema.optional(),
  storeSlug: storeSlugSchema.optional(),
  preferredDate: z.string().min(1, "Pick a date"),
  preferredSlot: z.enum(["morning", "afternoon", "evening"]),
  currentlyRides: z.enum(["petrol", "ev", "none"]),
  consent: consentSchema,
  source: z.string().max(80).optional(),
  utm: z
    .object({
      source: z.string().max(40).optional(),
      medium: z.string().max(40).optional(),
      campaign: z.string().max(80).optional(),
    })
    .optional(),
  captchaToken: z.string().optional(),
});
export type BookTestRideInput = z.infer<typeof bookTestRideSchema>;

/** POST /api/contact */
export const contactSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema,
  topic: z.enum(["sales", "service", "partnership", "press", "other"]),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

/** POST /api/newsletter */
export const newsletterSchema = z.object({
  email: emailSchema,
  source: z.string().max(40).optional(),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;

/** POST /api/service-request */
export const serviceRequestSchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  email: emailSchema.optional().or(z.literal("")),
  modelSlug: modelSlugSchema,
  vinOrReg: z.string().trim().max(40).optional().or(z.literal("")),
  issueType: z.enum([
    "battery",
    "motor",
    "brakes",
    "tyres",
    "electrical",
    "software",
    "cosmetic",
    "other",
  ]),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  city: citySlugSchema,
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;

/** POST /api/savings-report */
export const savingsReportSchema = z.object({
  email: emailSchema,
  kmPerDay: z.number().int().min(1).max(500),
  fuelType: z.enum(["petrol", "cng", "diesel"]),
  currentMileage: z.number().positive().max(100),
  fuelPrice: z.number().positive().max(500),
  scooterVariantSlug: z.string().max(80),
  electricityRate: z.number().positive().max(50),
  monthlySavingsInr: z.number().nonnegative(),
  annualSavingsInr: z.number().nonnegative(),
  captchaToken: z.string().optional(),
});
export type SavingsReportInput = z.infer<typeof savingsReportSchema>;

/** POST /api/partnership-lead */
export const partnershipLeadSchema = z.object({
  type: z.enum(["ev-oem", "charger-oem", "cpo", "cms", "store-franchise", "general"]),
  companyName: z.string().trim().min(2).max(120),
  contactName: nameSchema,
  role: z.string().trim().max(80).optional(),
  phone: indianPhoneSchema,
  email: emailSchema,
  message: z.string().trim().max(2000).optional(),
  extra: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type PartnershipLeadInput = z.infer<typeof partnershipLeadSchema>;

/**
 * Dealer enquiry options.
 *
 * The `*_VALUES` tuples are the single source of truth: the Zod enum is built
 * from them and the label maps are typed as `Record<Union, string>`, so adding
 * a value without a label (or vice versa) is a compile error. The form renders
 * from these and the notification email reads the same labels.
 */
export const DEALER_INVESTMENT_VALUES = [
  "5-10L",
  "10-20L",
  "20-30L",
  "30L+",
] as const;
export type DealerInvestmentRange = (typeof DEALER_INVESTMENT_VALUES)[number];
export const DEALER_INVESTMENT_LABELS: Record<DealerInvestmentRange, string> = {
  "5-10L": "₹5–10 Lakhs",
  "10-20L": "₹10–20 Lakhs",
  "20-30L": "₹20–30 Lakhs",
  "30L+": "₹30 Lakhs +",
};

export const DEALER_BUSINESS_VALUES = [
  "existing-2w-dealership",
  "other",
] as const;
export type DealerBusinessNature = (typeof DEALER_BUSINESS_VALUES)[number];
export const DEALER_BUSINESS_LABELS: Record<DealerBusinessNature, string> = {
  "existing-2w-dealership": "Existing 2-wheeler dealership",
  other: "Other",
};

/**
 * States and union territories, for the dealership enquiry.
 *
 * A dropdown rather than a free-text field: the sales team filters this list
 * by territory, and "MH" / "Maharastra" / "maharashtra" typed into a text box
 * would make that filter useless within a week.
 */
export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;
export type IndianState = (typeof INDIAN_STATES)[number];

/** POST /api/dealer-enquiry */
export const dealerEnquirySchema = z.object({
  name: nameSchema,
  phone: indianPhoneSchema,
  // Optional: most dealership leads come in by phone and chasing an email
  // address at the first touch only costs us submissions.
  email: emailSchema.optional().or(z.literal("")),
  city: z
    .string()
    .trim()
    .min(2, "Tell us the city or district you want to cover")
    .max(80, "City is too long"),
  state: z.enum(INDIAN_STATES, {
    errorMap: () => ({ message: "Select a state" }),
  }),
  investmentRange: z.enum(DEALER_INVESTMENT_VALUES, {
    errorMap: () => ({ message: "Select an investment range" }),
  }),
  businessNature: z.enum(DEALER_BUSINESS_VALUES, {
    errorMap: () => ({ message: "Select your current line of business" }),
  }),
  remarks: z.string().trim().max(2000, "Please keep remarks under 2000 characters").optional(),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type DealerEnquiryInput = z.infer<typeof dealerEnquirySchema>;

/** POST /api/careers-apply */
export const careersApplySchema = z.object({
  jobSlug: z.string().min(2).max(80),
  name: nameSchema,
  email: emailSchema,
  phone: indianPhoneSchema,
  resumeUrl: z.string().url("Please share a link to your resume (Drive, LinkedIn, etc.)"),
  coverNote: z.string().trim().max(2000).optional(),
  consent: consentSchema,
  captchaToken: z.string().optional(),
});
export type CareersApplyInput = z.infer<typeof careersApplySchema>;
