interface Holiday {
  name: string;
  date: string;
}

interface Holidays {
  [year: number]: Holiday[];
}

export const holidays: Holidays = {
  2025: [
    { name: "Nieuwjaarsdag", date: "1 januari 2025" },
    { name: "Goede Vrijdag", date: "18 april 2025" },
    { name: "Eerste Paasdag", date: "20 april 2025" },
    { name: "Tweede Paasdag", date: "21 april 2025" },
    { name: "Koningsdag", date: "26 april 2025" },
    { name: "Bevrijdingsdag", date: "5 mei 2025" },
    { name: "Hemelvaartsdag", date: "29 mei 2025" },
    { name: "Eerste Pinksterdag", date: "8 juni 2025" },
    { name: "Tweede Pinksterdag", date: "9 juni 2025" },
    { name: "Eerste Kerstdag", date: "25 december 2025" },
    { name: "Tweede Kerstdag", date: "26 december 2025" },
  ],
  2026: [
    { name: "Nieuwjaarsdag", date: "1 januari 2026" },
    { name: "Goede Vrijdag", date: "3 april 2026" },
    { name: "Eerste Paasdag", date: "5 april 2026" },
    { name: "Tweede Paasdag", date: "6 april 2026" },
    { name: "Koningsdag", date: "27 april 2026" },
    { name: "Bevrijdingsdag", date: "5 mei 2026" },
    { name: "Hemelvaartsdag", date: "14 mei 2026" },
    { name: "Eerste Pinksterdag", date: "24 mei 2026" },
    { name: "Tweede Pinksterdag", date: "25 mei 2026" },
    { name: "Eerste Kerstdag", date: "25 december 2026" },
    { name: "Tweede Kerstdag", date: "26 december 2026" },
  ],
};

export function getHolidaysForYear(year: number): Holiday[] {
  // Convert the date format to ISO string format for easier comparison
  return (holidays[year] || []).map((holiday) => ({
    name: holiday.name,
    date: convertToISODate(holiday.date, year),
  }));
}

// Add this new helper function
function convertToISODate(dutchDate: string, year: number): string {
  const [day, month] = dutchDate.split(" ");
  const monthMap: { [key: string]: string } = {
    januari: "01",
    februari: "02",
    maart: "03",
    april: "04",
    mei: "05",
    juni: "06",
    juli: "07",
    augustus: "08",
    september: "09",
    oktober: "10",
    november: "11",
    december: "12",
  };

  const monthNumber = monthMap[month.toLowerCase()];
  const paddedDay = day.padStart(2, "0");
  return `${year}-${monthNumber}-${paddedDay}`;
}
