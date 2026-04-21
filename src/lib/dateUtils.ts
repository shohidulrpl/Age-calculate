import { 
  differenceInYears, 
  differenceInMonths, 
  differenceInDays, 
  addYears, 
  addMonths, 
  intervalToDuration,
  isBefore,
  isValid
} from 'date-fns';

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  zodiac: string;
  zodiacSymbol: string;
}

export function calculateAge(birthDate: Date, targetDate: Date = new Date()): AgeResult | null {
  if (!isValid(birthDate) || !isValid(targetDate)) return null;
  if (isBefore(targetDate, birthDate)) return null;

  const duration = intervalToDuration({
    start: birthDate,
    end: targetDate
  });

  const totalDays = differenceInDays(targetDate, birthDate);

  const { years = 0, months = 0, days = 0 } = duration;
  const zodiacInfo = getZodiacInfo(birthDate);

  return {
    years,
    months,
    days,
    totalDays,
    ...zodiacInfo
  };
}

function getZodiacInfo(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // 1-12

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { zodiac: 'Aries', zodiacSymbol: '♈' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { zodiac: 'Taurus', zodiacSymbol: '♉' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { zodiac: 'Gemini', zodiacSymbol: '♊' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { zodiac: 'Cancer', zodiacSymbol: '♋' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { zodiac: 'Leo', zodiacSymbol: '♌' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { zodiac: 'Virgo', zodiacSymbol: '♍' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { zodiac: 'Libra', zodiacSymbol: '♎' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { zodiac: 'Scorpio', zodiacSymbol: '♏' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { zodiac: 'Sagittarius', zodiacSymbol: '♐' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { zodiac: 'Capricorn', zodiacSymbol: '♑' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { zodiac: 'Aquarius', zodiacSymbol: '♒' };
  return { zodiac: 'Pisces', zodiacSymbol: '♓' };
}
