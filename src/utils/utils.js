import { main_app_path_files } from "src/api/instanceAxios";

export function formatMontant(valeur) {
  const value = parseInt(valeur) ?? 0;
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatDateString(date) {
  const newDate = !!date ? new Date(date) : new Date();
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // Formatter la date selon les options
  return new Intl.DateTimeFormat("fr-FR", options).format(newDate);
}

export function capitalizeWords(sentence) {
  if (!sentence) {
    return sentence;
  }
  const wordsLower = sentence?.toLowerCase();
  const words = wordsLower.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  const capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}

export function formatDataToDropdownCodeName(
  data,
  valueKey,
  labelKey,
  isUppercase = false
) {
  if (!data || !!!data?.length) {
    return [];
  }

  const results = data?.map((item) => ({
    code: item[valueKey],
    name: !!isUppercase ? `${item[labelKey]}`.toUpperCase() : item[labelKey],
  }));

  return results;
}

export const formatDateToYearMonthDay = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const imageAdapter = (url = "", addApiUrl = true) => {
  return `${addApiUrl ? main_app_path_files : ""}${url}`;
};

// Calculer la notation
export const calculateRating = ({
  note_proprete = 1,
  note_service_clien = 1,
  note_confort = 1,
  note_localisation = 1,
  note_valeur_argent = 1,
  note_securite = 1,
}) => {
  const noteSomme =
    Number(note_proprete) +
    Number(note_service_clien) +
    Number(note_confort) +
    Number(note_localisation) +
    Number(note_valeur_argent) +
    Number(note_securite);

    const ratingValue = noteSomme / 6;
  const floatSum = parseFloat(ratingValue).toFixed(1);
  return floatSum;
};
