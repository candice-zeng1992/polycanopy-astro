// =========================================================================
// 🌟 1. 纯净引入：11国 全局通用字典 (i18n/*)
// =========================================================================
import en from './en.json';
import zh from './zh.json';
import ar from './ar.json';
import de from './de.json';
import es from './es.json';
import pt from './pt.json';
import fr from './fr.json';
import ru from './ru.json';
import ja from './ja.json';
import it from './it.json';
import ko from './ko.json';

// =========================================================================
// 🌟 2. 纯净引入：11国 产品专属大字典 (i18n/products/*)
// =========================================================================
import enProducts from './products/en.json';
import zhProducts from './products/zh.json';
import arProducts from './products/ar.json';
import deProducts from './products/de.json';
import esProducts from './products/es.json';
import ptProducts from './products/pt.json';
import frProducts from './products/fr.json';
import ruProducts from './products/ru.json';
import jaProducts from './products/ja.json';
import itProducts from './products/it.json';
import koProducts from './products/ko.json';

// =========================================================================
// 🌐 3. 获取全站通用 UI 字典接口
// =========================================================================
export function getDictionary(lang: string): Record<string, any> {
  const dictionaries: Record<string, any> = {
    en,
    zh,
    ar,
    de,
    es,
    pt,
    fr,
    ru,
    ja,
    it,
    ko,
  };
  return dictionaries[lang] || en;
}

// =========================================================================
// 🏭 4. 获取专属产品参数字典接口
// =========================================================================
export function getProductDictionary(lang: string): Record<string, any> {
  const dicts: Record<string, any> = {
    en: enProducts,
    zh: zhProducts,
    ar: arProducts,
    de: deProducts,
    es: esProducts,
    pt: ptProducts,
    fr: frProducts,
    ru: ruProducts,
    ja: jaProducts,
    it: itProducts,
    ko: koProducts,
  };
  return dicts[lang] || enProducts;
}