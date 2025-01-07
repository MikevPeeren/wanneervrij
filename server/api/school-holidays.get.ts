import { defineEventHandler } from "h3";

interface VacationRegion {
  region: string;
  startdate: string;
  enddate: string;
}

interface Vacation {
  type: string;
  regions: VacationRegion[];
  schoolyear: string;
}

interface HolidayData {
  content: [
    {
      vacations: Vacation[];
    },
  ];
}

let cachedData: HolidayData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export default defineEventHandler(async () => {
  const currentTime = Date.now();

  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return cachedData;
  }

  try {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Fetch data for both school years
    const [currentYearData, nextYearData] = await Promise.all([
      fetch(
        `https://opendata.rijksoverheid.nl/v1/infotypes/schoolholidays/schoolyear/${currentYear - 1}-${currentYear}?output=json`,
      ).then((res) => res.json()),
      fetch(
        `https://opendata.rijksoverheid.nl/v1/infotypes/schoolholidays/schoolyear/${currentYear}-${currentYear + 1}?output=json`,
      ).then((res) => res.json()),
    ]);

    // Combine the vacation data
    const combinedData: HolidayData = {
      content: [
        {
          vacations: [
            ...currentYearData.content[0].vacations,
            ...nextYearData.content[0].vacations,
          ] as Vacation[],
        },
      ],
    };

    cachedData = combinedData;
    lastFetchTime = currentTime;

    return combinedData;
  } catch (error) {
    console.log("error", error);
  }
});
