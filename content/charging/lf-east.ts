import type { ChargingSection } from "./index";

/** Long-form content: East + Northeast + UT city hubs (Kolkata, Bhubaneswar, Guwahati, Chandigarh). */
export const LF_EAST: Record<string, ChargingSection[]> = {
  "ev-charging-stations-kolkata": [
    {
      heading: "Kolkata's EV charging network at a glance",
      body: [
        "Kolkata is one of India's largest metros, and it already runs one of the country's biggest electric fleets, thanks to the sheer number of e-rickshaws that ferry people across its neighbourhoods every day. That three-wheeler base has quietly made electric mobility ordinary here, and now two-wheeler EVs are climbing fast alongside it. Public charging has spread to match, with points showing up at fuel stations, shopping centres, office buildings and pay-and-park lots across the city.",
        "West Bengal's power utility has taken a direct hand in the rollout, working as the state nodal agency to seed charging stations from its own land and other government sites. The result is a network that keeps growing, but one that is split across many different operators, each with its own app and payment. ElectricPe pulls those public chargers into a single free app with live availability, so you can see which point is actually open and pay from one wallet instead of switching between a dozen logins.",
      ],
    },
    {
      heading: "Where to find charging stations across Kolkata",
      body: [
        "Charger coverage follows where Kolkata works, shops and commutes. The central business stretch around Park Street, Dalhousie and Esplanade carries reliable points near offices, while the newer planned townships in the east and on the southern fringe are where much of the fresh infrastructure is landing. The IT belt at Sector V in Salt Lake and the wider New Town area are particularly well served, since both were built with modern parking and power in mind.",
        "Rather than driving to a point and hoping it is free, you can filter the ElectricPe map down to chargers near your route or your locality and check their status before you leave.",
      ],
      bullets: [
        "Business and retail core: Park Street, Esplanade, Dalhousie and major malls like South City and Quest",
        "IT and planned townships: Salt Lake Sector V, New Town and Rajarhat",
        "Southern and suburban belts: EM Bypass, Ballygunge, Behala and the Garia stretch",
        "Transit points: select Kolkata Metro station parking and large public lots",
        "Housing clusters: apartment complexes and co-operative societies with shared chargers",
      ],
    },
    {
      heading: "Connector types and charging speeds in Kolkata",
      body: [
        "Which charger you need depends on what you drive. Kolkata's vast fleet of e-rickshaws and the rising number of electric scooters charge mostly on AC points, which suit slower overnight and top-up refills. Electric cars increasingly use DC fast chargers for a quick boost between trips. The city's public mix leans heavily toward AC to serve its three- and two-wheeler base, with DC fast chargers growing along busy commuter corridors and at highway-edge hubs.",
        "Inside ElectricPe you can filter by connector and power rating, so you only see points your specific vehicle can actually plug into and never waste a trip on the wrong socket.",
      ],
      bullets: [
        "AC charging: Type-2 and Bharat AC-001, well suited to overnight and top-up charging of two- and three-wheelers",
        "DC fast charging: CCS2 and CHAdeMO, used by cars for high-power top-ups",
        "Power output spans roughly 3.3 kW slow points up to high-power fast chargers above 30 kW",
        "Two-wheelers mostly use AC points, while cars lean on DC fast charging for speed",
      ],
    },
    {
      heading: "What it costs to charge in Kolkata, and how to pay less",
      body: [
        "Public charging in Kolkata is billed per unit of electricity, and the rate varies with the operator and whether the point is slow AC or fast DC. West Bengal has set a dedicated EV charging tariff that is split by time of day, with a lower rate through off-peak hours and a slightly higher one during the evening peak, and no fixed charge for connections taken under the EV category. That supportive structure helps keep electric running costs well below the cost of petrol over the same distance.",
        "Prices still differ from one network to the next, so the cost-conscious move is to compare before you plug in. ElectricPe shows the tariff up front, and its low-cost charging subscription brings a lower per-unit rate across the networks it supports, so frequent chargers save on every session instead of paying whatever rate they happen to land on.",
      ],
      bullets: [
        "Charger type: DC fast charging usually costs more per unit than slower AC charging",
        "Time of day: West Bengal's EV tariff is cheaper in off-peak hours than during the evening peak",
        "Operator and location: each network sets its own rate, and premium sites may add a convenience fee",
        "Your plan: a charging subscription lowers the per-unit rate everywhere it is accepted",
      ],
    },
    {
      heading: "Charging at home and at work in Kolkata",
      body: [
        "Most Kolkata EV owners do the bulk of their charging where the vehicle sits idle for hours: at home overnight, or at the office through the workday. An electric scooter tops up comfortably from an ordinary household socket, and West Bengal makes this easier by allowing a separate metered connection under the EV tariff category, which keeps your home charging billed at the supportive EV rate rather than a higher slab.",
        "If your building does not have shared charging yet, it is worth raising with your association, since the state's amended building rules now encourage new and existing premises to make space for EV points. Until then, ElectricPe maps the public network around your home, your office and the routes you drive most, and for owners setting up their own point, ElectricPe also sells home chargers.",
      ],
    },
    {
      heading: "West Bengal's EV policy advantage",
      body: [
        "Kolkata's charging growth did not happen by chance. West Bengal's Electric Vehicle Policy set out to build the state into a cleaner-mobility leader, pairing purchase incentives with road tax and registration exemptions and a concrete plan to put hundreds of charging stations on the ground through a public-private model. The state utility identifies sites from its substations, transmission land, tourism properties and urban bodies, and each planned station is meant to carry both a slow charger and a DC fast charger.",
        "For an everyday driver, the practical result is more chargers in more places, lower taxes at purchase and a friendly electricity tariff for charging. ElectricPe's job is to keep pace, adding new operators to the app as they come online so your Kolkata map stays current.",
      ],
    },
    {
      heading: "Charging on longer trips, and why ElectricPe is the easy answer",
      body: [
        "Kolkata is also a launch-pad for intercity EV travel across eastern India. The corridors toward Durgapur and Asansol on the way to Jharkhand, the run down to Digha on the coast, and the routes north toward Siliguri are steadily filling in with fast chargers at fuel stops and highway plazas. Before a longer drive, you can map your charging stops in advance so range anxiety never makes the decision for you.",
        "Whether you are topping up around the city or planning a weekend trip, the value is the same: one free app that shows live availability across 60+ networks, gives turn-by-turn navigation to the point you pick, and lets you pay from a single wallet. With 200,000+ downloads and a 4.4 star rating, ElectricPe turns Kolkata's scattered, multi-operator network into one map you can actually trust.",
      ],
    },
  ],
  "ev-charging-stations-bhubaneswar": [
    {
      heading: "Bhubaneswar's EV charging landscape at a glance",
      body: [
        "Bhubaneswar was one of India's earliest Smart City picks, and that planned, tech-forward character shows in how electric mobility is taking root here. Odisha's capital pairs a growing IT corridor with wide, well-laid roads, and EV adoption is climbing across scooters, e-rickshaws and an expanding base of electric cars. Public charging has followed the demand, appearing at fuel stations, malls, office complexes and government campuses across the city.",
        "As elsewhere in India, those chargers belong to many different operators, each with a separate app, wallet and pricing. ElectricPe brings the city's public chargers into one free app with live availability, so instead of installing a different app for every network you see them all in one place, check which point is open right now, and pay through a single wallet.",
      ],
    },
    {
      heading: "Where to find charging stations across Bhubaneswar",
      body: [
        "Charger coverage tracks where Bhubaneswar works and shops. The IT and institutional belt at Infocity and Chandaka, along with the campuses around KIIT and the universities, concentrate demand and are among the better-served pockets. The retail and commercial heart around Saheed Nagar, Master Canteen and the big malls adds a second dense layer, while the temple-and-tourism stretch toward Old Town draws steady traffic.",
        "Inside the ElectricPe app you can narrow that map to your locality, your office or your route and confirm a charger is actually free before driving over, rather than arriving to find it occupied or offline.",
      ],
      bullets: [
        "IT and education belt: Infocity, Chandaka, Patia and the KIIT-KISS campus zone",
        "Commercial and retail hubs: Saheed Nagar, Master Canteen, Jaydev Vihar and major malls",
        "Government and institutional core: the Secretariat area and Unit-wise administrative blocks",
        "Highway access: points along NH-16 and the corridor toward Cuttack",
        "Residential clusters: apartment complexes and colonies with shared chargers",
      ],
    },
    {
      heading: "Connector types and charging speeds in Bhubaneswar",
      body: [
        "The right charger depends on your vehicle. Electric two-wheelers and the city's e-rickshaws charge mostly on AC points, which suit slower overnight and top-up refills, while electric cars increasingly rely on DC fast chargers for quick boosts between trips. Bhubaneswar's public mix leans toward AC to serve its two- and three-wheeler base, with DC fast chargers growing along the busier corridors and at highway-edge hubs.",
        "ElectricPe lets you filter by connector and power output so you only ever see points your specific car or scooter can use, removing the guesswork that catches out first-time EV owners.",
      ],
      bullets: [
        "AC charging: Type-2 and Bharat AC-001, ideal for overnight and top-up charging of two- and three-wheelers",
        "DC fast charging: CCS2 and CHAdeMO, for quick high-power top-ups, used mostly by cars",
        "Power output ranges from 3.3 kW home-style points up to higher-power DC fast chargers",
        "Scooters and e-rickshaws lean on AC, while cars use DC fast charging for speed",
      ],
    },
    {
      heading: "What it costs to charge in Bhubaneswar, and how to pay less",
      body: [
        "Public charging in Bhubaneswar is priced per unit of electricity, and the rate varies with the operator and whether the point is slow AC or fast DC. Odisha applies a concessional electricity tariff for EV charging stations across the state, which helps keep public charging meaningfully cheaper than running a petrol vehicle over the same distance. AC points remain the most economical way to refill, while DC fast charging carries a premium for its speed.",
        "Prices still differ between networks, so the cost-conscious move is to compare before you plug in. ElectricPe shows the tariff up front, and its low-cost charging subscription brings a lower per-unit rate across the networks it supports, so people who charge often save on every session.",
      ],
      bullets: [
        "Charger type: DC fast charging usually costs more per unit than slower AC charging",
        "Operator and location: each network sets its own rate, and premium sites may add a convenience fee",
        "State tariff: Odisha's concessional EV charging tariff keeps the base cost low",
        "Your plan: a charging subscription lowers the per-unit rate everywhere it is accepted",
      ],
    },
    {
      heading: "Charging at home and at work in Bhubaneswar",
      body: [
        "Most Bhubaneswar EV owners do the bulk of their charging where the vehicle sits idle for hours: at home overnight, or at the office through the workday. An electric scooter tops up comfortably from an ordinary household socket, and the city's newer apartment projects increasingly provide shared chargers in the basement. Public charging then becomes the convenient backup for the days your routine breaks or you are caught out across town.",
        "If your building does not have charging yet, it is worth raising with your association, since Odisha's policy actively encourages private landowners and premises to set up points. Until then, ElectricPe maps the public network around your home, your office and the routes you drive most, and for owners setting up their own point, ElectricPe also sells home chargers.",
      ],
    },
    {
      heading: "Odisha's EV policy advantage",
      body: [
        "Bhubaneswar sits at the centre of Odisha's renewed electric push. The state's latest EV policy raises the ambition sharply, targeting around half of all new vehicle registrations to be electric by 2030 and aligning with Odisha's longer-term vision for clean mobility. It widens purchase incentives across scooters, e-rickshaws, cars, buses and goods carriers, keeps a full waiver on road tax and registration fees, offers subsidised parking for EVs in municipal areas, and even plans a dedicated charge-finder platform to help drivers locate working points.",
        "On the infrastructure side, the policy pushes for a fast charger at fuel pumps and state bus terminals, backs highway fast-charging through viability gap funding, and earmarks Bhubaneswar among the cities for research centres of excellence. For a driver, that means more chargers, lower ownership costs and a network designed to keep pace. ElectricPe complements it by unifying access to those chargers in one app.",
      ],
    },
    {
      heading: "Charging on longer trips, and why ElectricPe is the easy answer",
      body: [
        "Bhubaneswar is also a base for intercity EV travel across Odisha and beyond. The short hop to Cuttack, the coastal run to Puri and Konark, and the longer corridors toward Visakhapatnam on NH-16 are steadily gaining fast chargers at fuel stops and highway plazas, helped along by the state's plan to put chargers at petrol pumps and bus terminals. Before a longer drive, you can map your charging stops in advance so range anxiety never decides your plans.",
        "Whether you are topping up around the city or heading to the coast for the weekend, the value is the same: one free app that shows live availability across 60+ networks, gives turn-by-turn navigation to the point you pick, and lets you pay from a single wallet. That is the difference between hunting for a charger and simply driving to one.",
      ],
    },
  ],
  "ev-charging-stations-guwahati": [
    {
      heading: "Guwahati's EV charging network at a glance",
      body: [
        "Guwahati is the gateway to Northeast India, and it is where the region's electric-mobility story is moving fastest. Assam's largest city has a busy mix of e-rickshaws, a rising tide of electric scooters and a slowly growing base of electric cars, all of which have pushed public charging onto the map. Points are appearing at fuel stations, malls, office complexes and along the main arteries that thread through the hilly, river-edged city.",
        "Those chargers belong to many different operators, each with its own app, wallet and pricing, which makes finding a working point harder than it should be. ElectricPe brings the city's public chargers into one free app with live availability, so you can see what is open before you set off and pay through a single wallet rather than juggling a separate app at every site.",
      ],
    },
    {
      heading: "Where to find charging stations across Guwahati",
      body: [
        "Charger coverage tracks where Guwahati lives, works and shops. The commercial heart around Paltan Bazaar, Fancy Bazaar and GS Road carries reliable points near offices and retail, while the growing belt toward Six Mile, Beltola and the airport corridor at Borjhar adds newer infrastructure. The institutional zone around Dispur and the university areas at Jalukbari concentrate steady demand.",
        "Inside the ElectricPe app you can narrow that map to your locality, your office or your route and confirm a charger is actually free before driving over, instead of arriving to find it occupied or offline.",
      ],
      bullets: [
        "Commercial core: Paltan Bazaar, Fancy Bazaar, GS Road and major malls",
        "Administrative and growth belts: Dispur, Six Mile and Beltola",
        "Airport and western corridor: the Borjhar airport stretch and Jalukbari",
        "Highway access: points along NH-27 and the corridors out of the city",
        "Residential clusters: apartment complexes and colonies with shared chargers",
      ],
    },
    {
      heading: "Connector types and charging speeds in Guwahati",
      body: [
        "Which charger you need depends on what you drive. Guwahati's electric scooters and e-rickshaws charge mostly on AC points, which suit slower overnight and top-up refills, while electric cars increasingly use DC fast chargers for a quick boost between trips. The city's public mix leans toward AC to serve its large two- and three-wheeler base, with DC fast chargers growing along the busier corridors and at highway-edge hubs.",
        "ElectricPe lets you filter by connector and power output so you only see points your specific vehicle can plug into, removing the guesswork that trips up first-time EV owners.",
      ],
      bullets: [
        "AC charging: Type-2 and Bharat AC-001, ideal for overnight and top-up charging of two- and three-wheelers",
        "DC fast charging: CCS2 and CHAdeMO, for quick high-power top-ups, used mostly by cars",
        "Power output ranges from 3.3 kW home-style points up to higher-power DC fast chargers",
        "Scooters and e-rickshaws mostly use AC, while cars rely on DC fast charging for speed",
      ],
    },
    {
      heading: "What it costs to charge in Guwahati, and how to pay less",
      body: [
        "Public charging in Guwahati is billed per unit of electricity, and the rate varies with the operator and whether the point is slow AC or fast DC. Assam's EV policy ties the tariff for third-party charging infrastructure to the state electricity regulator's order, and it grants charging stations a large exemption from electricity duty during the policy period, both of which help keep public charging cheaper than petrol over the same distance.",
        "Prices still differ between networks, so the cost-conscious move is to compare before you plug in. ElectricPe shows the tariff up front, and its low-cost charging subscription brings a lower per-unit rate across the networks it supports, so frequent chargers save on every session instead of paying whatever rate they happen to land on.",
      ],
      bullets: [
        "Charger type: DC fast charging usually costs more per unit than slower AC charging",
        "Operator and location: each network sets its own rate, and premium sites may add a convenience fee",
        "Policy support: Assam's electricity-duty exemption for charging stations keeps base costs down",
        "Your plan: a charging subscription lowers the per-unit rate everywhere it is accepted",
      ],
    },
    {
      heading: "Charging at home and at work in Guwahati",
      body: [
        "Most Guwahati EV owners do the bulk of their charging where the vehicle sits idle for hours: at home overnight, or at the office through the workday. An electric scooter tops up comfortably from an ordinary household socket, and a growing number of apartment projects are starting to provide shared chargers in the basement. Public charging then becomes the convenient backup for the days your routine breaks or you ride further than planned.",
        "If your building does not have charging yet, it is worth raising with your association as the city's EV base grows. Until then, ElectricPe maps the public network around your home, your office and the routes you drive most, and for owners setting up their own point, ElectricPe also sells home chargers.",
      ],
    },
    {
      heading: "Assam's EV policy advantage",
      body: [
        "Guwahati's charging momentum is backed by an active Assam EV policy that set out to put a large fleet of electric two-, three- and four-wheelers on the road and build the infrastructure to support them. The policy pairs battery-linked purchase incentives with a waiver on road tax and registration charges, adds a full waiver on parking charges for EVs, and offers a generous capital subsidy to operators setting up commercial public charging stations.",
        "Crucially for coverage, the policy lets petrol pumps add charging stations once they meet fire and safety norms, and it grants a steep electricity-duty exemption to charging sites. For a driver, that adds up to lower ownership costs and a network that keeps widening. The one thing policy cannot fix on its own is the patchwork of operator apps, which is exactly the friction ElectricPe is built to remove.",
      ],
    },
    {
      heading: "Charging on longer trips, and why ElectricPe is the easy answer",
      body: [
        "Guwahati is the natural hub for EV travel across the Northeast. The corridors toward Shillong in the hills, the run to Tezpur up the Brahmaputra valley, and the routes toward Nagaon and beyond are slowly gaining fast chargers at fuel stops, aided by the policy that lets petrol pumps host charging. Before a longer drive through this terrain, mapping your charging stops in advance matters even more, so range anxiety never makes the decision for you.",
        "Whether you are topping up around the city or heading into the hills for the weekend, the value is the same: one free app that shows live availability across 60+ networks, gives turn-by-turn navigation to the point you pick, and lets you pay from a single wallet. With 200,000+ downloads and a 4.4 star rating, ElectricPe turns the region's scattered network into one map you can trust.",
      ],
    },
  ],
  "ev-charging-stations-chandigarh": [
    {
      heading: "Chandigarh's EV charging network at a glance",
      body: [
        "Chandigarh is one of India's most planned and prosperous cities, and that affluence has translated into brisk EV uptake, with Ather and Ola scooters now a common sight and electric cars steadily joining them. The Union Territory has openly set out to become a model EV city, and public charging has expanded across its orderly grid of sectors, with points at parking lots, malls, fuel stations and office areas.",
        "Even in a compact, well-organised city, the chargers belong to several different operators, each with its own app, wallet and pricing. ElectricPe brings the city's public chargers into one free app with live availability, so instead of juggling a separate app for every network you see them all in one place, confirm which point is open, and pay from a single wallet.",
      ],
    },
    {
      heading: "Where to find charging stations across Chandigarh",
      body: [
        "Chandigarh's sector grid makes charging easy to reason about, and the UT's stated aim is to cover every sector with public points, including at least one charger in each major parking. Coverage is strongest around the commercial and retail heart in the central sectors and along the city's main shopping and office stretches, while the institutional and educational belt adds reliable points. The tri-city links toward Mohali and Panchkula extend the practical map for daily commuters.",
        "Inside the ElectricPe app you can narrow the map to a specific sector, your office or your route and confirm a charger is actually free before driving over.",
      ],
      bullets: [
        "Commercial and retail core: Sector 17, Sector 22 and Sector 34 with its exhibition ground",
        "Lifestyle and leisure hubs: the Elante Mall area in Industrial Area Phase 1 and Sukhna Lake stretch",
        "Institutional belt: the Panjab University and PGIMER zone around Sector 14 and Sector 12",
        "Tri-city links: corridors toward Mohali and Panchkula",
        "Residential clusters: sector markets and group-housing societies with shared chargers",
      ],
    },
    {
      heading: "Connector types and charging speeds in Chandigarh",
      body: [
        "Which charger you need depends on your vehicle. Chandigarh's popular electric scooters charge mostly on AC points, ideal for overnight and top-up refills, while the city's growing fleet of electric cars uses DC fast chargers for quick boosts between trips. The public mix carries a solid base of AC points to serve two-wheelers, with DC fast chargers concentrating at busier sites and along the routes out of the UT.",
        "ElectricPe lets you filter by connector and power output so you only see points compatible with your car or scooter, taking the guesswork out of every stop.",
      ],
      bullets: [
        "AC charging: Type-2 and Bharat AC-001, ideal for overnight and top-up charging of two-wheelers",
        "DC fast charging: CCS2 and CHAdeMO, for quick high-power top-ups, used mostly by cars",
        "Power output ranges from 3.3 kW home-style points up to higher-power DC fast chargers",
        "Scooters lean on AC charging, while cars use DC fast charging for speed",
      ],
    },
    {
      heading: "What it costs to charge in Chandigarh, and how to pay less",
      body: [
        "Public charging in Chandigarh is billed per unit of electricity, and the rate varies with the operator and whether the point is slow AC or fast DC. The UT's EV policy ties public charging tariffs to the rate notified by the regional electricity regulator, which sets a low energy charge with no fixed charge for public charging stations, and the policy commits to keeping that rate at the same level or lower through its period. That makes electric running cost markedly less than petrol over the same distance.",
        "Prices still differ between networks, so the cost-conscious move is to compare before you plug in. ElectricPe shows the tariff up front, and its low-cost charging subscription brings a lower per-unit rate across the networks it supports, so people who charge often save on every session.",
      ],
      bullets: [
        "Charger type: DC fast charging usually costs more per unit than slower AC charging",
        "Regulated tariff: Chandigarh's notified public-charging rate is low with no fixed charge",
        "Operator and location: each network sets its own rate, and premium sites may add a convenience fee",
        "Your plan: a charging subscription lowers the per-unit rate everywhere it is accepted",
      ],
    },
    {
      heading: "Charging at home and at work in Chandigarh",
      body: [
        "Most Chandigarh EV owners do the bulk of their charging where the vehicle sits idle for hours: at home overnight, or at the office through the workday. An electric scooter tops up comfortably from an ordinary household socket, and the UT treats domestic charging like normal home consumption, which keeps it simple and economical. The city's building rules now push new and renovated premises to make a share of their parking EV-ready, with conduits and power in place for chargers.",
        "If your building does not have charging yet, it is worth raising with your society, especially as the UT plans an online platform to help homes and offices set up points. Until then, ElectricPe maps the public network around your home, your office and the routes you drive most, and for owners setting up their own point, ElectricPe also sells home chargers.",
      ],
    },
    {
      heading: "Chandigarh's EV policy advantage",
      body: [
        "Chandigarh's charging push is anchored in a deliberate plan to become a model electric-mobility city, run by the UT's renewable-energy agency. The policy aims for electric vehicles to make up the large majority of new registrations by the end of its period, waives road tax and registration fees for eligible EVs, issues green number plates, and layers its own purchase incentives on top of national support across scooters, e-cycles, autos, goods carriers and cars.",
        "On infrastructure, the policy targets public charging across every sector with a point in each major parking, reimburses costs for early fast-charging and swapping equipment, and grants electricity-duty exemption to public charging and swapping stations. For a driver, that means a denser network and lower ownership costs. ElectricPe complements all of it by unifying access to those chargers in one app, so the policy's growth actually translates into an easier daily experience.",
      ],
    },
    {
      heading: "Charging on longer trips, and why ElectricPe is the easy answer",
      body: [
        "Chandigarh is a popular starting point for drives into the hills and across the plains, and EV charging on these routes is improving steadily. The climb toward Shimla, the run to the Kasauli foothills, and the busy expressway corridor down to Delhi are all gaining fast chargers at fuel stops and highway plazas. Before a longer drive, mapping your charging stops in advance keeps range anxiety out of the picture.",
        "Whether you are topping up across the sectors or heading to the mountains for the weekend, the value is the same: one free app that shows live availability across 60+ networks, gives turn-by-turn navigation to the point you pick, and lets you pay from a single wallet. That is the difference between hunting for a charger and simply driving to one.",
      ],
    },
  ],
};
