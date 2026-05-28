import type { ChargingSection } from "./index";

/**
 * Long-form, research-backed body content for national use-case pages,
 * keyed by slug. Each entry is ~1,000-1,200 words of original prose across
 * structured sections (rendered as <h2> + paragraphs + optional bullets).
 *
 * Sources are used for facts only; all prose is original. These are NATIONAL
 * ("India") topic pages, so each adapts its own structure rather than the
 * city template.
 */
export const LF_USECASE: Record<string, ChargingSection[]> = {
  "home-ev-charger-installation-india": [
    {
      heading: "Why home charging is the backbone of EV ownership",
      body: [
        "Ask anyone who has lived with an electric vehicle for a year and they will tell you the same thing: the real convenience is not the public fast charger on the highway, it is the charger sitting in your own parking spot. Industry estimates suggest that the large majority of EV charging in India happens at home, usually overnight, when the car is parked and electricity is cheapest. You plug in when you get back from work, and you wake up to a full battery every single morning. There is no detour, no queue, and no waiting around while the car tops up.",
        "The cost gap is just as compelling. Residential electricity in most Indian states is billed at a far lower rate per unit than public charging, where operators have to recover the cost of land, grid upgrades, transformers and round-the-clock maintenance. For a typical owner, charging at home can mean spending a few hundred to roughly a couple of thousand rupees a month on electricity, against the several thousand rupees the same driving would cost in petrol. Over a year of normal city running, those savings comfortably outweigh what you spend setting the charger up in the first place.",
        "A dedicated home charger is also kinder to your vehicle than makeshift arrangements. A properly installed unit on its own circuit, with the right safety protection, charges your car steadily and reliably rather than relying on a long extension lead run across a parking area. That reliability is exactly why a home setup is the foundation that the rest of your charging life is built on, with the public network there for the days you travel further.",
      ],
    },
    {
      heading: "Types of home chargers and what suits your vehicle",
      body: [
        "Home chargers in India broadly fall into AC units, which is what almost every household uses. AC chargers send alternating current to the car, and the vehicle's own onboard charger converts it for the battery. The right choice depends mainly on what you drive and how much power your connection can spare. A two-wheeler or a small electric car has a modest battery and is perfectly happy on a lower-powered unit, while a larger car benefits from a faster wall-mounted charger that can refill the battery overnight.",
        "You will also choose between a portable unit and a fixed wall-mounted one. A portable charger plugs into a suitable socket and is easy to move, which suits scooters and entry-level cars. A wall-mounted unit is bolted in place on its own circuit, charges faster, and is the better long-term option for a car you depend on daily. Most home car chargers in India use the Type 2 connector and run on a standard single-phase supply.",
      ],
      bullets: [
        "Two-wheelers and small EVs: a portable or low-power AC unit, often in the low single-digit kW range, is usually enough for an overnight charge.",
        "Most electric cars: a wall-mounted AC charger around 3.3 kW to 7.4 kW (Type 2) refills the battery comfortably overnight on a single-phase home connection.",
        "Portable vs wall-mounted: portable is flexible and lower cost; wall-mounted is faster, neater and built for daily use.",
        "DC fast chargers (30 kW and above) belong in public hubs and fleet depots, not in a typical home; they need far more power than a household supply provides.",
      ],
    },
    {
      heading: "What installation involves",
      body: [
        "A safe home charger is as much about the wiring behind it as the unit on the wall. The first step is a load check: an electrician confirms whether your sanctioned connection and distribution board can take the extra demand of a charger, especially if you also run an air conditioner, geyser and other heavy appliances at the same time. If your supply is tight, you may need to apply to your local DISCOM for a higher sanctioned load before going ahead.",
        "From there it is about getting the cabling, protection and earthing right. The charger should sit on a dedicated circuit with its own breaker and the correct protective devices, run with appropriately rated cable, and be properly earthed. Indian EV charging equipment is built to national standards such as the IS 17017 series, so choosing certified hardware and a qualified installer matters for both safety and warranty. A good installer will also place the unit sensibly so the cable reaches your parking spot without strain.",
      ],
      bullets: [
        "Load assessment: check that your sanctioned load and distribution board can handle the charger alongside existing appliances.",
        "Dedicated circuit and protection: the charger gets its own breaker, correctly rated cable, proper earthing and the right safety devices.",
        "Meter options: charge through your existing meter, or in some cases request a separate metered connection that may qualify for special EV tariffs.",
        "Certified equipment and installer: choose standards-compliant hardware and a qualified electrician to protect safety and warranty.",
      ],
    },
    {
      heading: "What a home charger costs and what you save",
      body: [
        "The upfront outlay has two parts: the charger itself and the installation. Hardware ranges widely depending on power rating and whether you opt for a basic unit or a smart, app-connected one. Installation cost depends on how far the cabling has to run, whether your distribution board needs upgrading, and whether you need a higher sanctioned load. Households that need electrical upgrades will naturally pay more than those with a charger going in next to an existing point.",
        "What makes the maths work is the running cost. Charging a car at home spreads its energy use across ordinary residential tariffs, often during cheaper off-peak hours, while petrol prices keep climbing. The difference between a few hundred to a couple of thousand rupees of electricity a month and several thousand rupees of fuel adds up quickly. For a typical city driver covering ten to twelve thousand kilometres a year, the yearly saving against petrol can match or exceed the cost of the charger and its installation, after which the savings simply keep stacking up. Several state EV policies and DISCOMs also offer incentives or simplified approvals that further reduce the upfront burden.",
      ],
    },
    {
      heading: "Home charging for apartment residents",
      body: [
        "Not everyone has a private bungalow with a dedicated meter at the parking spot, and apartment living brings its own questions. The good news is that national policy is firmly on the resident's side. The Ministry of Power's guidelines make clear that charging an EV does not require any special electricity licence, and the choice of drawing power through your existing meter or requesting a separate sub-meter for charging is meant to rest with the owner. New buildings are also required to keep a share of parking EV-ready under the model building bye-laws.",
        "In a society, the practical route is usually either an individual charger at your allotted parking bay, billed to you, or a shared charger installed and managed by the society for everyone to use. Each has trade-offs around approval, billing and load, which is why apartment charging deserves its own playbook. If you live in a flat, our guidance on charging for housing societies walks through getting RWA sign-off, fair billing and load management in detail.",
      ],
    },
    {
      heading: "How ElectricPe helps",
      body: [
        "ElectricPe makes home charging straightforward from end to end. We supply and install home EV chargers matched to your vehicle and your electrical setup, handling the load check, the dedicated circuit, the safety protection and the certified hardware so you get a clean, reliable install rather than a risky workaround. Whether you ride a scooter or drive a car, we help you pick the right power rating instead of overpaying for capacity you will never use.",
        "Your home charger then becomes the anchor of a much bigger network. The free ElectricPe app, with 200,000+ downloads and a 4.4 star rating, gives you access to 25,000+ public chargers across 60+ partner networks for the days you drive beyond your usual range. You see live availability, get turn-by-turn navigation to a working charger, and pay through one unified wallet, so charging at home and topping up on the road feel like one seamless habit. Add our low-cost charging subscription and your public top-ups get even better value.",
      ],
    },
  ],

  "ev-fleet-charging-india": [
    {
      heading: "The fleet charging challenge in India",
      body: [
        "For a fleet, charging is not a convenience question, it is an operations question. A delivery rider who cannot charge is a delivery that does not happen, and a logistics van stuck waiting for a charger is revenue sitting idle. As Indian fleets across e-commerce delivery, intra-city logistics, food-tech and ride-hailing electrify their two-wheelers, three-wheelers and light commercial vehicles, the hard part stops being the vehicles and becomes keeping them charged and on the road.",
        "The economics are what is driving the shift. Electric commercial vehicles cut running costs sharply compared with diesel and petrol, and that lower per-kilometre cost is exactly why fleet operators are moving fast. Electric light commercial vehicles in particular have become one of the largest and fastest-growing categories as cities demand quicker, cleaner last-mile delivery. Central programmes such as FAME and the newer PM E-DRIVE scheme add further push by supporting electric commercial mobility and charging infrastructure.",
        "But scale changes everything. Charging one car overnight is simple; charging fifty vehicles on overlapping shift patterns, across depots and city routes, while keeping every charger working and every cost accounted for, is a logistics discipline in its own right. That is the challenge this page is about.",
      ],
    },
    {
      heading: "Depot vs en-route public charging",
      body: [
        "Most fleets run on a blend of two charging models. The first is depot charging, where vehicles return to a base and charge while parked, usually overnight or between shifts. Because the vehicles sit for hours, slower AC charging is often enough and is cheaper to install per point, which makes depots the cost-efficient backbone of a fleet's energy plan. This return-to-base pattern mirrors how public bus operators charge electric buses at their own depots.",
        "The second is en-route public charging, where drivers top up at public stations during the working day to extend range without going back to base. Here, faster DC charging matters because every minute a vehicle is plugged in is a minute it is not earning. The right mix depends on duty cycles, route lengths and how much space and power a depot can support.",
      ],
      bullets: [
        "Depot charging: vehicles charge at base, typically overnight on AC; lowest per-unit cost and the planning backbone for most fleets.",
        "En-route public charging: drivers top up on the road, usually on DC fast chargers, to extend range and reduce downtime mid-shift.",
        "Match charger speed to dwell time: long parked hours suit AC; quick turnarounds suit DC.",
        "Power and space limits at the depot often decide how many vehicles you can charge at once and where public charging fills the gap.",
      ],
    },
    {
      heading: "Managing a fleet's charging: access, billing and uptime",
      body: [
        "Once a fleet relies on charging, the management layer becomes as important as the chargers themselves. Drivers need controlled access so the right vehicles charge at the right points, finance needs every kilowatt-hour attributed correctly rather than chasing scattered receipts, and operations needs visibility into which chargers are free and which are out of service before a driver wastes a trip on a dead unit.",
        "Fragmentation is the enemy here. A fleet that charges across many independent networks ends up with a different app, a different wallet and a different invoice for each one, which makes both day-to-day routing and month-end reconciliation painful. The fleets that run smoothly are the ones that consolidate access, billing and live status into a single view.",
      ],
      bullets: [
        "Access control: manage which drivers and vehicles can charge, and where, from one place.",
        "Consolidated billing: one statement across networks instead of reconciling dozens of separate invoices.",
        "Uptime visibility: see live availability so drivers route to working chargers, not broken ones.",
        "Usage data: track consumption per vehicle and route to spot inefficiency and plan capacity.",
      ],
    },
    {
      heading: "Cost control and uptime for fleets",
      body: [
        "The two numbers that decide whether an electric fleet is winning are cost per kilometre and vehicle uptime. On cost, the levers are clear: lean on cheaper depot charging during off-peak hours wherever the duty cycle allows, reserve faster public charging for when range genuinely demands it, and get a low per-unit rate on public charging through a plan rather than paying full walk-up prices on every session.",
        "On uptime, the goal is to never strand a vehicle. That means routing drivers to chargers that are confirmed available and working, spreading charging so a depot is not overloaded at one moment, and using consumption data to predict capacity needs before they become bottlenecks. A fleet that pairs disciplined cost management with reliable access turns charging from an operational risk into a quiet, predictable line item.",
      ],
    },
    {
      heading: "How ElectricPe powers fleets",
      body: [
        "ElectricPe is built to remove exactly the friction that slows fleets down. Through one platform, drivers reach 25,000+ chargers across 60+ partner networks, so en-route charging is not limited to a single operator's footprint. Live availability means drivers head to working chargers instead of guessing, which protects the uptime that fleet operations depend on.",
        "On the back office, a single unified wallet and consolidated billing replace the mess of separate apps, logins and invoices, giving finance one clear view of charging spend across the whole network. Combined with our low-cost charging subscription for a better per-unit rate, fleets get both the reach and the cost control they need. And where a depot makes sense, ElectricPe can help put the right charging setup on the ground so home-base and on-route charging work as one system.",
      ],
    },
    {
      heading: "Getting started",
      body: [
        "Every fleet is different, with its own vehicle mix, route patterns and depot constraints, so the best first step is a conversation. Our team can look at how your vehicles run, where they charge today, and where consolidated access, smarter billing and a low-cost plan would save you the most.",
        "Talk to our team about powering your fleet with ElectricPe. We will help you map depot and en-route charging to your duty cycles, bring your charging spend onto one wallet and one bill, and give your drivers a network of 25,000+ chargers with live availability behind them, so your vehicles spend more time earning and less time waiting.",
      ],
    },
  ],

  "ev-charging-subscription-plan-india": [
    {
      heading: "Why a charging subscription saves money",
      body: [
        "If you charge in public regularly, the single biggest lever on your monthly cost is the rate you pay per unit. Public charging in India is priced well above home electricity because operators carry the cost of land, grid connections and upkeep, and walk-up sessions usually pay the full sticker rate. Over a month of commuting, that gap between a casual public rate and a discounted one adds up to real money.",
        "A charging subscription works the same way a telecom plan does. Instead of paying the full price every time you plug in, you pay a small recurring amount and unlock a lower per-unit rate on your charging. For anyone who charges often enough, the savings on energy quickly outweigh the cost of the plan, which is precisely why subscription-based charging has become one of the smartest ways to bring down running costs without changing how you drive.",
        "The beauty of it is that nothing about your routine has to change. You charge where you already charge, on the same network of stations, but every unit costs you less. For a daily driver, that is the difference between public charging feeling like a premium and feeling like the best-value way to keep moving.",
      ],
    },
    {
      heading: "How the ElectricPe subscription works",
      body: [
        "The ElectricPe subscription is designed to be simple: a low-cost plan that gives you a low per-unit rate on charging across the network, so the more you charge, the more you save. You subscribe once, and the discounted rate applies to your sessions, with everything handled inside the free ElectricPe app and paid through one unified wallet.",
        "Because ElectricPe is an aggregator rather than a single operator, the plan is not locked to one brand of charger. Your better rate follows you across 60+ partner networks and 25,000+ chargers, which means you are not forced to drive past a convenient station just because it belongs to a different company. That combination of a low recurring cost and broad reach is what makes the plan genuinely useful for everyday charging.",
      ],
      bullets: [
        "A low recurring fee unlocks a low per-unit rate on your charging sessions.",
        "The discounted rate works across 60+ partner networks and 25,000+ chargers, not just one brand.",
        "Everything runs through the free ElectricPe app and one unified wallet.",
        "The more regularly you charge, the more the plan pays for itself.",
      ],
    },
    {
      heading: "Who benefits most",
      body: [
        "A subscription is not for everyone in equal measure; it rewards people who charge in public often. Daily commuters are the obvious winners, because the per-unit saving applies session after session, month after month, and steadily outpaces the cost of the plan. The more kilometres you cover, the stronger the case becomes, and the quicker the plan turns into pure savings.",
        "It is just as valuable for anyone who cannot rely on home charging, including people living in apartments without a dedicated point, or those whose parking does not allow a personal charger. For them, public charging is not a backup but the primary way they keep their vehicle running, so a lower rate directly lowers their cost of ownership. Fleets and gig drivers, who treat charging as a core operating cost, see the benefit multiplied across every vehicle in their operation.",
        "Even occasional public chargers can come out ahead if they are honest about their habits. If you charge at home most days but rely on the public network for weekend trips, errands or the times your home charger is unavailable, those sessions still add up over a year. A low per-unit rate quietly trims the cost of every one of them, which is why it is worth checking your real charging pattern before assuming a plan is only for heavy users.",
      ],
    },
    {
      heading: "Public charging cost in India and how a plan cuts it",
      body: [
        "To see why a plan matters, it helps to picture the spread of public charging prices. Slower public AC chargers are priced above home electricity, and DC fast chargers, which give you a quick top-up, sit higher still because of the power and infrastructure they demand. Relying purely on full-price fast charging can more than double what the same driving would cost at home.",
        "A subscription compresses that gap. By lowering the per-unit rate you pay across the network, it brings public charging much closer to the cost of charging at home, which is exactly the relief that drivers without a home charger need. Pair the plan with sensible habits, such as using slower charging when you have time to spare and fast charging only when you are in a hurry, and your monthly charging bill becomes both lower and far more predictable.",
      ],
    },
    {
      heading: "Using it across 60+ networks with one wallet",
      body: [
        "The frustration with charging in India has long been fragmentation: different operators, different apps, different payment methods. ElectricPe was built to fix that. With one app and one unified wallet, you can charge across 60+ partner networks and 25,000+ chargers without juggling logins or topping up multiple balances.",
        "Your subscription rides on top of that single, simple experience. You open the app, see live availability so you head to a charger that is actually free and working, follow turn-by-turn navigation to reach it, and pay from the same wallet every time, all at your discounted rate. Instead of charging being a patchwork of apps and prices, it becomes one consistent, low-cost habit no matter which network you plug into.",
      ],
    },
    {
      heading: "How to subscribe",
      body: [
        "Getting started takes only the free ElectricPe app, which has 200,000+ downloads and a 4.4 star rating. Download it, set up your unified wallet, and activate the charging subscription from within the app to unlock your low per-unit rate across the network. There is nothing to install in your home and no hardware to buy, so the plan is just as practical for apartment residents and fleet drivers as it is for car owners with a private parking spot.",
        "From that point, every public charge you make uses the discounted rate automatically, with live availability and navigation guiding you to the nearest working charger. If you charge in public even a few times a week, the plan starts paying for itself almost immediately, turning public charging from a premium expense into the best-value way to keep your EV on the road. And because the same wallet and the same plan work across 60+ networks, you never have to think about which operator owns the charger in front of you.",
      ],
    },
  ],

  "corporate-ev-charging-india": [
    {
      heading: "Why offer workplace EV charging",
      body: [
        "Workplace charging has quietly become one of the most practical employee benefits a company can offer. As more of the workforce switches to electric two-wheelers and cars, the office car park is exactly where vehicles sit idle for six to eight hours a day, which is the ideal window to charge. An employee who can plug in at work arrives home with a full battery and never worries about range, and the company earns goodwill at a relatively modest cost.",
        "It also sits squarely inside corporate sustainability and ESG goals. Enabling employees to drive electric, and powering those vehicles cleanly, is a visible, measurable contribution to lowering a company's transport footprint. As return-to-office norms settle and EV ownership rises fastest among working-age professionals, charging at the workplace is increasingly something employees expect rather than a novelty, which makes it a genuine lever for attracting and retaining talent.",
        "For HR and admin teams, the appeal is that it is a benefit that keeps giving. Once installed, it runs in the background, supports the company's green commitments, and helps employees save on their own running costs, all without the recurring expense of most perks.",
      ],
    },
    {
      heading: "Setting up office charging",
      body: [
        "A good workplace rollout starts with demand, not hardware. A short internal survey of how many employees already drive EVs, how many plan to soon, and what they drive prevents both under-provisioning and over-investing in points that sit unused. Because cars typically stay parked through the working day, slower AC charging is usually enough to fully recharge during office hours, which keeps costs sensible.",
        "The next checks are electrical and physical. The facility team must confirm the building's sanctioned load, transformer and distribution-board capacity can take the added demand, and apply to the DISCOM for a load increase if needed. Placement matters too: chargers should sit near existing electrical infrastructure to limit cabling cost, in accessible, well-lit parking, with room to expand as adoption grows. Indian charging equipment follows national standards such as the IS 17017 series, so certified hardware and a qualified installer are essential.",
      ],
      bullets: [
        "Gauge demand first with a quick employee survey, then size the number of points to real need.",
        "AC chargers (often around 7 kW, and higher in some setups) suit the long parking hours of a workday; reserve DC fast charging for high-turnover or fleet use.",
        "Check sanctioned load and distribution capacity, and apply to the DISCOM for more power if required.",
        "Place chargers near existing wiring and accessible parking, and leave conduit or space to expand later.",
      ],
    },
    {
      heading: "Managing access and billing for employees",
      body: [
        "Once chargers are in, the operational question is who can use them and how usage is paid for. Open, unmanaged points get misused and overloaded, so most workplaces add controlled access, commonly through RFID cards or an app, so only registered employees charge and each session is tied to a user. This also gives admin teams the data to see how heavily the chargers are used and plan expansion.",
        "Billing can flow several ways depending on company policy. Some employers absorb charging as a free benefit, others recover the energy cost from employees, and many sit in between with subsidised rates. Whichever model you choose, the practical need is the same: a clean way to track consumption per user and bill or report on it without manual effort.",
      ],
      bullets: [
        "Controlled access via RFID or app so only registered employees charge.",
        "Per-user tracking so each session is attributed correctly.",
        "Flexible billing: free benefit, cost recovery, or subsidised rates, depending on policy.",
        "Usage reporting to plan capacity and demonstrate utilisation.",
      ],
    },
    {
      heading: "Employee benefit and the ESG angle",
      body: [
        "Workplace charging delivers value on two fronts at once. For employees, it removes range anxiety from the daily commute and meaningfully lowers their cost of driving electric, which is a tangible, daily perk that few other benefits match. In a hiring market where younger professionals are the keenest EV adopters, that perk helps a company stand out and keep the people it wants.",
        "For the organisation, it is a concrete sustainability story rather than a slogan. Every commute shifted from petrol to clean charging is a measurable cut in the company's transport emissions, and the chargers themselves are a visible signal of the firm's environmental commitment to employees, clients and visitors alike. That combination of a real employee benefit and a credible ESG contribution is why workplace charging earns its place on the facilities roadmap.",
        "There is a practical payoff for the workplace itself too. Employees who can charge at the office are less likely to leave mid-day to find a public charger, which keeps people on site and productive, and visitor-friendly charging makes a quietly positive impression on clients who drive electric. As more of a company's own pool cars and fleet vehicles go electric, the same infrastructure supports them as well, so an early, well-planned rollout keeps paying back as adoption grows.",
      ],
    },
    {
      heading: "How ElectricPe enables corporate charging",
      body: [
        "ElectricPe brings corporate charging together as a single, managed service. We help companies install the right chargers for their parking and load situation, sized to real employee demand rather than guesswork, with certified, standards-compliant hardware and proper electrical work. Controlled access and per-user tracking mean admin teams keep the points orderly and bill or report on usage with ease.",
        "Beyond the office walls, employees also gain the full ElectricPe network through the free app, with access to 25,000+ chargers across 60+ partner networks, live availability, navigation and one unified wallet for charging on the road. A dashboard view of workplace usage helps facilities and HR teams manage capacity and plan ahead. The result is a charging programme that works both at the office and everywhere employees drive.",
      ],
    },
    {
      heading: "Getting started",
      body: [
        "The simplest way to begin is to talk it through with people who set this up every day. Our team can help you survey employee demand, check what your building can support, and design a workplace charging plan that fits your parking, your power and your policy on access and billing.",
        "Talk to our team about corporate EV charging with ElectricPe. We will help you install the right setup, give employees access to a 25,000+ charger network through the app, and put the management dashboard in place, so workplace charging becomes a smooth benefit that supports both your people and your sustainability goals.",
      ],
    },
  ],

  "ev-charging-for-apartments-india": [
    {
      heading: "The apartment charging problem in India",
      body: [
        "A large share of urban Indians live in flats, and for them the simplest part of EV ownership, plugging in at home, is often the hardest. You cannot just run a cable from a ground-floor home to a car in a shared basement, and many EV owners in societies find themselves negotiating with the management committee, worrying about which meter the electricity comes off, and sometimes facing outright resistance to installing anything in common areas.",
        "This matters because home charging is the foundation of practical EV ownership, with the bulk of charging meant to happen overnight where the car is parked. When a society makes that difficult, residents are pushed onto pricier public charging for everyday needs, which undermines much of the cost benefit of going electric. As more residents in any given tower buy EVs, an ad-hoc approach of dangling extension cords and informal arrangements stops being workable and starts creating safety and fairness disputes.",
        "The encouraging part is that this is a solved problem in principle. National policy actively encourages residential charging, and there are clear, fair ways for a society to support it. What apartments need is a structured approach, which is what the rest of this page lays out.",
      ],
    },
    {
      heading: "Shared vs individual chargers in a society",
      body: [
        "Societies generally choose between two models, and many end up combining them. An individual charger is installed at a resident's own allotted parking bay and used only by that household, billed to them directly. A shared charger, or a small cluster of them, is installed by the society in common parking and used by any resident on a first-come basis, with usage metered and billed per session.",
        "Each suits a different situation. Individual chargers are clean and simple where residents have dedicated, allotted bays, while shared chargers make better use of limited power and space where parking is common or unallotted, and are the fairer answer when only some residents have fixed spots. The right call depends on the society's parking layout, available electrical load, and how many residents drive or plan to drive EVs.",
      ],
      bullets: [
        "Individual charger: installed at a resident's own bay, used and billed to that household; best where parking is allotted.",
        "Shared charger: installed by the society in common parking, used by many residents, metered per session; best where parking is common or power is limited.",
        "A hybrid mix often works, with shared points now and individual ones as bays get allotted.",
        "Load and parking layout, not preference alone, usually decide which model fits.",
      ],
    },
    {
      heading: "Getting approval: RWA and the right-to-charge approach",
      body: [
        "Approval is where most apartment charging stalls, so it helps to know how the rules actually sit. The Ministry of Power's EV charging guidelines make clear that charging an EV is treated as ordinary electricity use and needs no special licence. Crucially, the guidelines support a resident's right to charge: DISCOMs are expected to enable power for charging either through the resident's existing meter or through a separate sub-meter, with that choice resting with the owner. New buildings are also required to keep a share of parking EV-ready under the national model building bye-laws.",
        "In practice, anything installed on society property still needs the management committee's sign-off, usually through a resolution or AGM approval, and the society can reasonably ask residents to bear their own costs. What a society should not do is block charging arbitrarily or impose punitive commercial tariffs on a resident simply charging their own vehicle. Where the society's sanctioned load is tight, the committee applies to the DISCOM for a load increase, and internal wiring may need upgrading to handle the new demand safely.",
      ],
      bullets: [
        "No special licence is needed; charging is treated as normal electricity use.",
        "Power can be drawn from the resident's existing meter or a separate sub-meter, with the choice resting with the owner.",
        "Installations in common areas need the committee's resolution or AGM approval, and residents can be asked to cover costs.",
        "If the society's load is insufficient, it applies to the DISCOM for a load increase and may need to upgrade internal wiring.",
      ],
    },
    {
      heading: "Fair billing for residents",
      body: [
        "Billing is where good intentions can sour, because residents quietly resent paying inflated rates or, worse, cross-subsidising neighbours who use chargers they do not. The principle of fair billing is simple: each resident pays for the energy they actually use, at a rate that reflects the real cost rather than an arbitrary markup. Metering each session, whether through a sub-meter or a smart charger that records consumption per user, is what makes that possible.",
        "For shared chargers, transparent per-session billing keeps the system fair and avoids the friction of loading EV costs onto everyone's general maintenance. For individual chargers on a separate connection, residents may even access special EV tariffs offered by some states. The goal in every case is the same: clear, accurate, per-user billing that residents trust, which is what keeps a society's charging programme running smoothly for the long term.",
      ],
    },
    {
      heading: "How ElectricPe helps societies",
      body: [
        "ElectricPe helps housing societies move from disputes to a clean, working system. We help install shared chargers in common parking, sized to the society's available load and parking layout, with certified, standards-compliant equipment and proper electrical work, so the setup is safe and built to last. We also support resident access controls and per-user, per-session billing, so every resident pays only for what they use and the committee is not left reconciling messy charges.",
        "On top of the in-society setup, residents get the free ElectricPe app, with 200,000+ downloads and a 4.4 star rating, which opens up 25,000+ chargers across 60+ partner networks for top-ups when they are away from home, complete with live availability, navigation and one unified wallet. So a resident's society charger and the wider public network work together as one simple charging experience.",
      ],
    },
    {
      heading: "Getting started",
      body: [
        "The best first move for any society is a conversation about what its parking, load and resident demand actually allow. Our team can help the management committee assess the building's capacity, choose between shared and individual chargers, and set up access and fair billing in a way that satisfies residents and keeps the system simple to run.",
        "Talk to our team about EV charging for your society with ElectricPe. We will help you install the right chargers, put transparent resident billing in place, and give every resident access to a 25,000+ charger network through the app, so charging at home and on the road becomes effortless for everyone in the building.",
      ],
    },
  ],
};
