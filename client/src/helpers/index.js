export const apiUrl = "/api"

export const yearsRange = {
  start: 1950,
  end: new Date().getFullYear()
}

export const isLargeScreen = function(width, height) {
  return width > 600 && height > 400
}

export function t(translations, key, locale) {
  for(let i = 0; i < translations.length; i++) {
    if(translations[i].key == key) {
      let content = translations[i]["content_" + locale];
      return content ? content : "["+ key + "]";
    }
  }
  return "["+ key + "]";
}

export function capitalize(s) {
  if(!s.replace) return ""
    return s.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
}

export function makeMarkerSize(amount) {
  // get a total amount and return a scale factor between 1 and 5
  let size = amount * 0.8
  if (size > 5) size = 5;
  if (size < 1) size = 1;
  return size
}