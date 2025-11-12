import {
  cloneDeep as lodashCloneDeep,
  find as lodashFind,
  findIndex as lodashFindIndex,
  flattenDeep as lodashFlattenDeep,
  get as lodashGet,
  isEmpty as lodashIsEmpty,
  isEqual as lodashIsEqual,
  isString as lodashIsString,
  memoize as lodashMemoize,
  parseInt as lodashParseInt,
  remove as lodashRemove,
  size as lodashSize,
  unionBy as lodashUnionBy,
  uniqBy as lodashUniqueBy,
} from 'lodash';

import {
  addMonths as dateAddMonth,
  subMonths as dateSubMonth,
  addDays as dateAddDays,
  addWeeks as dateAddWeeks,
  endOfDay as dateEndOfDay,
  endOfWeek as dateEndOfWeek,
  format as dateFormat,
  getDate as dateGetDate,
  isAfter as dateIsAfter,
  isBefore as dateIsBefore,
  isSameDay as dateIsSameDay,
  startOfWeek as dateStartOfWeek,
  subWeeks as dateSubWeeks,
} from 'date-fns';

import RNRestart from "react-native-restart";
export const isEmpty = lodashIsEmpty;
export const parseInt = lodashParseInt;
export const find = lodashFind;
export const unionBy = lodashUnionBy;
export const get = lodashGet;
export const isString = lodashIsString;
export const isEqual = lodashIsEqual;
export const memoize = lodashMemoize;
export const cloneDeep = lodashCloneDeep;
export const flattenDeep = lodashFlattenDeep;
export const remove = lodashRemove;
export const uniqBy = lodashUniqueBy;
export const findIndex = lodashFindIndex;
export const size = lodashSize;


export const subWeeks = dateSubWeeks;
export const isSameDay = dateIsSameDay;
export const isBefore = dateIsBefore;
export const isAfter = dateIsAfter;
export const format = dateFormat;
export const endOfDay = dateEndOfDay;
export const addWeeks = dateAddWeeks;
export const endOfWeek = dateEndOfWeek;
export const getDate = dateGetDate;
export const startOfWeek = dateStartOfWeek;
export const addDays = dateAddDays;
export const addMonth = dateAddMonth;
export const subMonth = dateSubMonth;

type LanguageState = string | object; 
type DispatchFunction = (...args: any[]) => void;
type SelectLanguageAction = (lang: LanguageState) => any;

export const handlerLanguageChange = (
  appLanguage: LanguageState,
  selectedLanguage: LanguageState,
  selectLanguage: SelectLanguageAction,
  dispatch: DispatchFunction,
) => {
  if (JSON.stringify(selectedLanguage) !== JSON.stringify(appLanguage)) {
    try {
      dispatch(selectLanguage(selectedLanguage));
      // setI18nConfig(selectedLanguage); // Uncomment once I18n is available and typed
      setTimeout(() => {
        RNRestart.Restart();
      }, 1000);
    } catch (e) {
      // 'e' is typed as 'unknown' in modern TypeScript.
      alert((e as Error).message);
    }
  }
};