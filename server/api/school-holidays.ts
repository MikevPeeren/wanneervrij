import { defineEventHandler } from "h3";

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

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
    const combinedData = {
      content: [
        {
          vacations: [
            ...currentYearData.content[0].vacations,
            ...nextYearData.content[0].vacations,
          ],
        },
      ],
    };

    cachedData = combinedData;
    lastFetchTime = currentTime;

    return combinedData;
  } catch (error) {
    console.log("error", error);
    // ... existing error handling ...
  }
});
