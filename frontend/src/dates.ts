import { format } from "date-fns";
import es from "date-fns/locale/es";

export function getLocalDate(dateToConvert: Date) {
  const date = new Date(dateToConvert);
  const offset = 6;
  const dateWithOffset = new Date(date.getTime() + offset * 60 * 60 * 1000);
  return dateWithOffset;
}

export function formatDateToReadable(dateToFormat: Date) {
  const dateWithOffset = getLocalDate(dateToFormat);
  const formattedDate = format(
    dateWithOffset,
    "EEEE, do MMMM 'de' yyyy, hh:mm a",
    {
      locale: es,
    }
  ).replace("º", "");
  return formattedDate;
}
