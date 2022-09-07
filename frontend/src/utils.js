import urlJoin from "url-join";
import createSlug from 'speakingurl';
import { themes } from "./config/constants";

export const slugify = label => createSlug(label.trim(), { lang: 'fr', custom: { '.': '.', 'Ǧ': 'g' } });

export const getThemesOptions = () => {
  return themes.map(label => ({ id: urlJoin(process.env.REACT_APP_MIDDLEWARE_URL, 'themes', slugify(label)) , name: label }));
}
