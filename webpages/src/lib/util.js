import { getLanguage, version, versionName } from "./extension-api.js";

export const changelogLink = () => {
  const language = getLanguage();
  const localeSlash = language.startsWith("en") ? "" : `${language.split("-")[0]}/`;
  const utm = `utm_source=extension&utm_medium=popup&utm_campaign=v${version}`;
  return `https://scratchaddons.com/${localeSlash}changelog/?${utm}#v${version}`;
};

export const versionLabel = () => {
  const prerelease = versionName.includes("-prerelease");
  const ver = version;
  return prerelease ? ver + "-pre" : ver;
};
