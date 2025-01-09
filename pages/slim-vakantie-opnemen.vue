<template>
  <div class="container mx-auto px-4 py-8 text-text dark:text-gray-100">
    <h1
      class="text-2xl md:text-3xl font-bold mb-6 text-primary dark:text-gray-100"
    >
      Slim Vakantie Opnemen
    </h1>

    <div class="mb-8 space-y-6">
      <p>
        Plan je vakantiedagen slim en profiteer maximaal van je vrije tijd. Met
        onze vakantiedagen planner kun je eenvoudig berekenen hoe je het meeste
        uit je vrije dagen kunt halen.
      </p>

      <form class="space-y-6" @submit.prevent="optimizeVacation">
        <div>
          <label
            for="vacationDays"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Aantal vakantiedagen</label
          >
          <input
            id="vacationDays"
            v-model.number="vacationDays"
            type="number"
            required
            min="1"
            max="365"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
        </div>

        <div>
          <span
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Werkweek</span
          >
          <div class="mt-2 space-x-2">
            <label
              v-for="day in weekDays"
              :key="day"
              class="inline-flex items-center"
            >
              <input
                v-model="workDays"
                type="checkbox"
                :value="day"
                class="rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
              >
              <span class="ml-2 dark:text-gray-300">{{ day }}</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:bg-primary-light dark:text-gray-900 dark:hover:bg-primary"
        >
          Optimaliseer Vakantie
        </button>
      </form>
    </div>

    <div class="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 rounded-lg shadow-md"
      >
        <div class="flex items-center">
          <div
            class="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"
          />
          <span class="text-sm">Weekenden en/of niet werkdagen</span>
        </div>
      </div>
      <div
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 rounded-lg shadow-md"
      >
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full bg-red-500 mr-2"/>
          <span class="text-sm">Feestdagen</span>
        </div>
      </div>
      <div
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 rounded-lg shadow-md"
      >
        <div class="flex items-center">
          <div class="w-6 h-6 rounded-full bg-green-500 mr-2"/>
          <span class="text-sm">Geoptimaliseerde vakantiedagen</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="month in 12"
        :key="month"
        class="bg-primary bg-opacity-10 dark:bg-opacity-20 p-4 rounded-lg shadow-md"
      >
        <h3 class="text-lg font-semibold mb-2 text-primary dark:text-gray-200">
          {{ getMonthName(month - 1) }} {{ currentYear }}
        </h3>
        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="day in 7"
            :key="day"
            class="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {{ getDayName(day - 1).slice(0, 2) }}
          </div>
          <template v-for="date in getDaysInMonth(month - 1)" :key="date">
            <div
              v-if="date === 1"
              :style="{ gridColumnStart: getFirstDayOfMonth(month - 1) + 1 }"
              :class="getDayClass(new Date(currentYear, month - 1, date))"
              class="text-center py-1 text-sm rounded-full"
            >
              {{ date }}
            </div>
            <div
              v-else
              :class="getDayClass(new Date(currentYear, month - 1, date))"
              class="text-center py-1 text-sm rounded-full"
            >
              {{ date }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getHolidaysForYear } from "~/utils/holidays";

const weekDays = ["Ma", "Di", "Wo", "Do", "Vr"];
const vacationDays = ref(25);
const workDays = ref(["Ma", "Di", "Wo", "Do", "Vr"]);
const optimizedDates = ref<string[]>([]);
const currentYear = new Date().getFullYear();

const holidays = computed(() => getHolidaysForYear(currentYear));

function optimizeVacation() {
  const allDates = getAllDatesInYear();
  const streaks = findOptimalStreaks(allDates);
  optimizedDates.value = streaks.flat().slice(0, vacationDays.value);
}

function getAllDatesInYear(): Date[] {
  const dates: Date[] = [];
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  while (startDate <= endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}

function findOptimalStreaks(dates: Date[]) {
  const streaks: { dates: Date[]; score: number }[] = [];
  const selectedDates = new Set<string>();
  let remainingVacationDays = vacationDays.value;

  // First pass: find periods around holidays
  for (let i = 0; i < dates.length - 7; i++) {
    const startDate = dates[i];
    if (remainingVacationDays <= 0) break;

    const nearbyHolidays = countNearbyHolidays(startDate, 5);
    if (nearbyHolidays > 0) {
      const potentialStreak = evaluateVacationPeriod(startDate);
      if (potentialStreak.score > 0) {
        streaks.push(potentialStreak);
      }
    }
  }

  // Second pass: find other good periods if we still have days
  if (streaks.length * 3 < remainingVacationDays) {
    for (let i = 0; i < dates.length - 7; i++) {
      const startDate = dates[i];
      if (remainingVacationDays <= 0) break;

      if (
        isWeekendDay(startDate) ||
        isHoliday(startDate) ||
        !isWorkDay(startDate)
      )
        continue;

      const potentialStreak = evaluateVacationPeriod(startDate);
      if (potentialStreak.score > 0) {
        streaks.push(potentialStreak);
      }
    }
  }

  // Sort streaks by score (best opportunities first)
  streaks.sort((a, b) => b.score - a.score);

  // Select the best streaks until we use all vacation days
  for (const streak of streaks) {
    if (remainingVacationDays <= 0) break;

    for (const date of streak.dates) {
      if (remainingVacationDays <= 0) break;

      const dateString = formatDate(date);
      if (
        isWorkDay(date) &&
        !isWeekendDay(date) &&
        !isHoliday(date) &&
        !selectedDates.has(dateString)
      ) {
        selectedDates.add(dateString);
        remainingVacationDays--;
      }
    }
  }

  return Array.from(selectedDates);
}

function evaluateVacationPeriod(startDate: Date) {
  const period: Date[] = [];
  let score = 0;
  const currentDate = new Date(startDate);
  let consecutiveFreeDays = 0;
  let workingDaysNeeded = 0;
  let hasHoliday = false;

  // Look ahead up to 16 days (covers 3 weekends)
  for (let i = 0; i < 16; i++) {
    const isWeekend = isWeekendDay(currentDate);
    const isHol = isHoliday(currentDate);
    const isWork = isWorkDay(currentDate);

    // Look ahead and behind for nearby holidays
    const nearbyHolidays = countNearbyHolidays(currentDate, 5);

    if (isHol) {
      score += 5;
      consecutiveFreeDays++;
      hasHoliday = true;
    } else if (isWeekend || !isWork) {
      score += 2;
      consecutiveFreeDays++;
    } else {
      if (nearbyHolidays > 0) {
        score += 2; // Bonus for days near holidays
      }
      workingDaysNeeded++;
      consecutiveFreeDays = 0;
    }

    period.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Apply bonuses and penalties
  let finalScore = score * (1 + consecutiveFreeDays * 0.2);

  // Extra bonus for periods containing holidays
  if (hasHoliday) {
    finalScore *= 1.5;
  }

  // Penalty for working days needed, but less severe if near holidays
  finalScore -= workingDaysNeeded * 0.3;

  return {
    dates: period,
    score: finalScore,
  };
}

function countNearbyHolidays(date: Date, daysToCheck: number): number {
  let count = 0;
  const checkDate = new Date(date);

  // Check days before
  for (let i = -daysToCheck; i <= daysToCheck; i++) {
    checkDate.setDate(date.getDate() + i);
    if (isHoliday(checkDate)) {
      // Closer holidays count more
      count += 1 + 1 / Math.abs(i + 1);
    }
  }

  return count;
}

function isHoliday(date: Date): boolean {
  const dateString = date.toISOString().split("T")[0];
  return holidays.value.some((holiday) => holiday.date === dateString);
}

function isWeekendDay(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// Update formatDate to match your holiday data format
function formatDate(date: Date): string {
  const day = date.getDate();
  const month = getMonthName(date.getMonth()).toLowerCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function getMonthName(month: number): string {
  return new Date(currentYear, month, 1).toLocaleString("nl-NL", {
    month: "long",
  });
}

function getDayName(day: number): string {
  return ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"][day];
}

function getDaysInMonth(month: number): number {
  return new Date(currentYear, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number): number {
  return new Date(currentYear, month, 1).getDay();
}

function isWorkDay(date: Date): boolean {
  const dayName = getDayName(date.getDay()).slice(0, 2);
  return workDays.value.includes(dayName);
}

function getDayClass(date: Date): string {
  const classes = [];
  const dateString = formatDate(date);

  if (isHoliday(date)) {
    classes.push("bg-red-500 text-white");
  } else if (optimizedDates.value.includes(dateString)) {
    classes.push("bg-green-500 text-white");
  } else if (isWeekendDay(date) || !isWorkDay(date)) {
    // Add !isWorkDay check
    classes.push(
      "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300",
    );
  } else {
    classes.push("bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300");
  }

  return classes.join(" ");
}
</script>
