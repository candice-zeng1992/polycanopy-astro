// =========================================================================
// 🌟 PolyCanopy 11国全语种博客文章高性能动态加载引擎 (blogLoader.js)
// =========================================================================

// 1. 一口气拉入 11 国全量本地硬盘文章包
import enPosts from '../i18n/posts/en.json';
import zhPosts from '../i18n/posts/zh.json';
import arPosts from '../i18n/posts/ar.json';
import dePosts from '../i18n/posts/de.json';
import esPosts from '../i18n/posts/es.json';
import ptPosts from '../i18n/posts/pt.json';
import frPosts from '../i18n/posts/fr.json';
import ruPosts from '../i18n/posts/ru.json';
import jaPosts from '../i18n/posts/ja.json';
import itPosts from '../i18n/posts/it.json';
import koPosts from '../i18n/posts/ko.json';

// 2. ✅ 清洗干净的纯 JS 原生对象（移除了 : Record<string, any>，彻底消除解析错误）
const POSTS_MAP = {
  en: Array.isArray(enPosts) ? enPosts : Object.values(enPosts),
  zh: Array.isArray(zhPosts) ? zhPosts : Object.values(zhPosts),
  ar: Array.isArray(arPosts) ? arPosts : Object.values(arPosts),
  de: Array.isArray(dePosts) ? dePosts : Object.values(dePosts),
  es: Array.isArray(esPosts) ? esPosts : Object.values(esPosts),
  pt: Array.isArray(ptPosts) ? ptPosts : Object.values(ptPosts),
  fr: Array.isArray(frPosts) ? frPosts : Object.values(frPosts),
  ru: Array.isArray(ruPosts) ? ruPosts : Object.values(ruPosts),
  ja: Array.isArray(jaPosts) ? jaPosts : Object.values(jaPosts),
  it: Array.isArray(itPosts) ? itPosts : Object.values(itPosts),
  ko: Array.isArray(koPosts) ? koPosts : Object.values(koPosts),
};

/**
 * 🎯 核心外导接口：根据传入的 11 国语言代码，秒级返回对应语种的真实翻译文章流
 */
export function getPostsByLang(lang) {
  // 🌟 如果踩中 11 国，直接完美吐出，否则安全落盘回 en 通用池
  const data = POSTS_MAP[lang] || POSTS_MAP['en'];
  
  // 强力确保丢出去供前台循环展示的绝对是一个干净合规的 Array 数组
  return Array.isArray(data) ? data : [];
}