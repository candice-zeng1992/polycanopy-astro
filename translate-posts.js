import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ==================== 🛠️ ES Module 路径兼容重构 ====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== 🔑 核心参数配置 ====================
const API_KEY = 'sk-22f7e1419a26498bb49d79fa38683485';
const BASE_URL = 'https://api.deepseek.com/chat/completions';

const INPUT_FILE = path.join(__dirname, 'src/i18n/posts/en.json');
const OUTPUT_DIR = path.join(__dirname, 'src/i18n/posts');

// 🌟 核心扩容：追加全量新语种，自动排除 en（原语）和已经做好的 zh, ar
const targetLanguages = [
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'fr', name: 'French' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' }
];

// ==================== 🤖 DeepSeek 核心高精度翻译驱动 ====================
async function translatePost(payload, targetLangName) {
  const prompt = `You are an expert architectural and materials engineering translator specializing in high-end polycarbonate roofing/canopy systems, aluminum structure engineering, and global B2B building material specifications.

Translate the following JSON data fields into professional, fluent, and business-grade ${targetLangName} suitable for corporate enterprise buyers, industrial procurers, and commercial engineers.

CRITICAL RULES FOR HIGH-FIDELITY TRANSLATION:
1. Return your response STRICTLY as a valid JSON object matching the exact keys provided.
2. DO NOT wrap the output in markdown code blocks (e.g. do not use \`\`\`json or \`\`\`). Output pure raw text JSON.
3. Keep ALL HTML structures, class names, tailwind tags, and structural nodes (e.g., <a>, <img>, <p>, <strong>, <ul>, <li>, <div>, <section>) completely intact inside contentHtml.
4. ONLY translate the visible user-facing text content inside HTML tags. NEVER translate URLs, href paths, image source attributes, class styling words, or asset IDs.
5. 🌟 SPECIAL INSTRUCTION: You MUST translate the "category" field. It is a user-facing blog directory name, NOT a technical parameter or URL.
6. 🏭 INDUSTRIAL TERMINOLOGY GLOSSARY (Strictly enforce localized professional equivalents):
   - Polycarbonate Corrugated sheet/board MUST be translated into professional local engineering terms equivalent to "Wave Tile" / "Wave Profile" (e.g., in ZH: "波浪瓦").
   - Polycarbonate Sunlight/Multiwall sheet MUST be equivalent to "Hollow Board" (e.g., in ZH: "中空板").
   - "Temp-control board" or thermo-regulating panels MUST be equivalent to "Intelligent Temperature-Control Board" (e.g., in ZH: "智能调温板").
   - Maintain extreme technical precision for technical industrial parameters (e.g., "50μm UV co-extrusion protection layer", "impact load resistance", "thermal insulation").

Data payload to translate:
${JSON.stringify(payload, null, 2)}`;

  try {
    const response = await axios.post(BASE_URL, {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a rigid machine translation interface that outputs nothing but clean, unformatted raw JSON matching the requested keys perfectly. Never include introductory remarks, notes, or markdown backticks." },
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 90000
    });

    const resultText = response.data.choices[0].message.content.trim();
    return JSON.parse(resultText);
  } catch (e) {
    console.error(`❌ DeepSeek API 在处理 [${payload.title.substring(0, 20)}...] 时发生中断:`, e.message);
    return null;
  }
}

// ==================== 🚀 自动化运行主链路 ====================
async function runTranslation() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ 错误：未能在路径 ${INPUT_FILE} 下找到英文原生 en.json 文件。`);
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  const isNested = !Array.isArray(rawData) && rawData.Posts;
  const postsArray = Array.isArray(rawData) ? rawData : (rawData.Posts || []);

  if (postsArray.length === 0) {
    console.log('⚠️ 英文数据源中没有找到合法的文章列表数组。');
    return;
  }

  console.log(`🚀 发现 ${postsArray.length} 篇文章，开始执行 Astro 自动化多语言翻译、内链、语境标志与目录翻译重构...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const lang of targetLanguages) {
    console.log(`\n==================================================`);
    console.log(`🌐 正在处理目标语言: [${lang.code.toUpperCase()}] - ${lang.name}`);
    console.log(`==================================================`);

    const langFilePath = path.join(OUTPUT_DIR, `${lang.code}.json`);

    let currentLangList = [];
    if (fs.existsSync(langFilePath)) {
      try {
        const fileContent = fs.readFileSync(langFilePath, 'utf-8');
        const parsedContent = JSON.parse(fileContent);
        currentLangList = Array.isArray(parsedContent) ? parsedContent : (parsedContent.Posts || []);
      } catch (e) {
        console.log(`⚠️ 无法解析已存在的 ${lang.code}.json，将重新初始化该文件。`);
        currentLangList = [];
      }
    }

    for (const postObj of postsArray) {
      const slug = postObj.slug || 'unknown';
      
      // 🌟 精准断点续传判定：只有当 title、lang 和 category 全部就位且正确时才跳过
      const existingPost = currentLangList.find(p => p.slug === slug);
      if (existingPost && existingPost.title && existingPost.lang === lang.code && existingPost.category === postObj.category) {
        console.log(`⏭️  跳过已完成项: [${slug}]`);
        continue;
      }

      console.log(`⏳ 正在发送至 DeepSeek 翻译长文 + SEO + 目录字段: [${slug}] ...`);

      const payload = {
        title: postObj.title || '',
        seoTitle: postObj.seoTitle || '',
        seoDesc: postObj.seoDesc || '',
        category: postObj.category || '',
        excerpt: postObj.excerpt || '',
        contentHtml: postObj.contentHtml || ''
      };

      const translatedPayload = await translatePost(payload, lang.name);

      if (translatedPayload) {
        let finalExcerpt = translatedPayload.excerpt || postObj.excerpt || '';
        let finalContentHtml = translatedPayload.contentHtml || postObj.contentHtml || '';

        // 🌟 自动把 HTML 内链中的旧语境 /en/ 动态替换为当前的 /de/、/es/ 等
        finalExcerpt = finalExcerpt.replace(/\/en\//g, `/${lang.code}/`);
        finalContentHtml = finalContentHtml.replace(/\/en\//g, `/${lang.code}/`);

        const updatedPost = {
          ...postObj,
          lang: lang.code,
          title: translatedPayload.title || postObj.title,
          seoTitle: translatedPayload.seoTitle || postObj.seoTitle,
          seoDesc: translatedPayload.seoDesc || postObj.seoDesc,
          category: translatedPayload.category || postObj.category, // 完美归位当地专业建材类目
          excerpt: finalExcerpt,
          contentHtml: finalContentHtml
        };

        const existingIndex = currentLangList.findIndex(p => p.slug === slug);
        if (existingIndex > -1) {
          currentLangList[existingIndex] = updatedPost;
        } else {
          currentLangList.push(updatedPost);
        }

        const finalOutputData = isNested ? { Posts: currentLangList } : currentLangList;
        fs.writeFileSync(langFilePath, JSON.stringify(finalOutputData, null, 2), 'utf-8');
        console.log(`✅ 成功保存全要素数组项: [${slug}] -> ${lang.code}.json`);
      } else {
        console.log(`❌ 失败跳过: [${slug}]，稍后重新运行即可自动补全。`);
      }

      // 🌟 给 API 留出 1.5 秒温柔的喘息缓冲，防止触发并发频率限制
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log('\n🎉 [PolyCanopy] 11国全语种博客文章库自动化翻译重构已全部执行完毕！');
}

runTranslation();