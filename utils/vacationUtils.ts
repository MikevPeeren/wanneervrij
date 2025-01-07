import type { Ref, ComputedRef } from "vue";
import { ref, computed } from "vue";

interface Region {
  startdate: Date;
  enddate: Date;
}

interface Vacation {
  type: string;
  regions: {
    [key: string]: Region;
  };
  earliestStart: number;
  schoolYear: string;
}

interface ApiVacation {
  type: string;
  regions: {
    region: string;
    startdate: string;
    enddate: string;
  }[];
  schoolyear: string;
}

interface ApiResponse {
  content: {
    vacations: ApiVacation[];
  }[];
}

export const useVacations = () => {
  const vacations: Ref<ApiVacation[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const error: Ref<Error | null> = ref(null);

  const groupedAndSortedVacations: ComputedRef<Vacation[]> = computed(() => {
    if (!vacations.value || vacations.value.length === 0) {
      return [];
    }

    const grouped: Vacation[] = vacations.value.map((vacation) => {
      const regions: { [key: string]: Region } = {};

      vacation.regions.forEach((region) => {
        const startDate = new Date(region.startdate);
        const endDate = new Date(region.enddate);

        // Skip past vacations
        if (endDate < new Date()) {
          return;
        }

        regions[region.region.toLowerCase()] = {
          startdate: startDate,
          enddate: endDate,
        };
      });

      return {
        type: vacation.type,
        regions: regions,
        earliestStart: Math.min(
          ...Object.values(regions).map((r) => r.startdate.getTime()),
        ),
        schoolYear: vacation.schoolyear,
      };
    });

    const filtered = grouped.filter(
      (vacation) => Object.keys(vacation.regions).length > 0,
    );

    // Remove duplicates by keeping the latest schoolYear for each vacation type
    const deduped = filtered.reduce<Vacation[]>((acc, current) => {
      const existing = acc.find((v) => v.type === current.type);
      if (!existing || existing.schoolYear < current.schoolYear) {
        acc = acc.filter((v) => v.type !== current.type);
        acc.push(current);
      }
      return acc;
    }, []);

    return deduped.sort((a, b) => a.earliestStart - b.earliestStart);
  });

  const getActiveRegions = (vacation: Vacation): string[] => {
    return ["noord", "midden", "zuid", "heel nederland"].filter(
      (region) => vacation.regions[region],
    );
  };

  const fetchVacations = async (): Promise<void> => {
    try {
      const response = await fetch("/api/school-holidays");
      const data: ApiResponse = await response.json();
      vacations.value = data.content[0].vacations;
      isLoading.value = false;
    } catch (e) {
      console.error("Error fetching vacations:", e);
      error.value =
        e instanceof Error ? e : new Error("Unknown error occurred");
      isLoading.value = false;
    }
  };

  return {
    vacations,
    isLoading,
    error,
    groupedAndSortedVacations,
    getActiveRegions,
    fetchVacations,
  };
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.toLocaleDateString("nl-NL")} - ${end.toLocaleDateString("nl-NL")}`;
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
