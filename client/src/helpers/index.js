export const apiUrl = "/api"

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