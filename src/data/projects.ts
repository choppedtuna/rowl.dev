export type Project = {
  gameId?: string;
  name: string;
  company: string;
  companyIcon: string;
  companyWebsite: string;
  keyStats: string[];
  gameIcon?: string;
  gameUrl?: string;
  
  // New properties for FakeCard
  isFakeCard?: boolean;
  manualVisits?: number;
};

const projects: Project[] = [
  {
    gameId: '6149941304',
    name: 'Chicken Life',
    company: 'Talewind Studio',
    companyIcon: '/images/companies/talewind.webp',
    companyWebsite: 'https://www.talewind.co.uk/',
    keyStats: [
      'Increased Spend by 20x through improved Shop surfacing & content updates',
      'Created a comprehensive building system',
      'Peak of 10K concurrent players'
    ],
  },
  {
    gameId: '15432848623',
    name: 'Netflix NextWorld',
    company: 'Buoy Studio',
    companyIcon: '/images/companies/buoy.png',
    companyWebsite: 'https://www.buoy.studio/',
    keyStats: [
      'Over 10 IP activations launched (including Squid Game and NFL)',
      'Improved UGC strategy leading to a sustained increase in player engagement',
      'Peak of 7K concurrent players'
    ],
    gameIcon: '/games/nextworld.png'
  },
  {
    gameId: '16164895787',
    name: 'Netflix One Piece',
    company: 'Buoy Studio',
    companyIcon: '/images/companies/buoy.png',
    companyWebsite: 'https://www.buoy.studio/',
    keyStats: [
      'Created a responsive and energetic combat & enemy system',
      'Pushing the limits of ROBLOX constraints - over 300 enemies on screen at once',
      'Peak of 5K concurrent players'
    ],
  },
  {
	name: "LEGO Creators Portal",
	company: "Sparko Studio",
	companyIcon: "/images/companies/sparko.jpeg",
	companyWebsite: "https://sparko.studio/",
	keyStats: [
		"Created a simulated LEGO building experience",
		"Users engaged in a building contest",
		"Portal Activation hosted in Club ROBLOX and Twilight Daycare"
	],
	isFakeCard: true,
	manualVisits: 13000000, // This will show as "120K visits"
	gameIcon: "/games/lego.jpeg",
  }
];

export default projects; 