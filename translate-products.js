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

const INPUT_FILE = path.join(__dirname, 'src/i18n/products/en.json');
const OUTPUT_DIR = path.join(__dirname, 'src/i18n/products');

// 🌟 需要翻译的目标语种
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

// ==================== 🤖 DeepSeek 核心颗粒化翻译驱动 ====================
async function translateSingleProduct(productSlug, productPayload, targetLangName) {
  const prompt = `You are an elite, rigid international B2B architectural engineering localization interface. 
Your single task is to translate the provided product data payload into highly professional ${targetLangName} for corporate procurement managers and architects.

CRITICAL TRANSLATION DIRECTIVES:
1. FORMAT RULE: Return your response STRICTLY as a raw JSON object matching the exact structure of the input. DO NOT wrap the output in markdown code blocks (\`\`\`json).
2. KEY & STRUCTURE LOCK: Return only the product object for the key "${productSlug}". Do NOT add any extra outer nesting keys like "products".
3. PATHWAY LOCK: In the "subtitle" field, MUST keep the structural navigational path keywords "Home » product »" in English exactly as is. Only translate the product name part.
4. LOCALIZATION DEPTH: Translate "title", "desc", "welcome", "tags", features "title"/"desc", and "alt" text with high-quality architectural gravity.

Single product payload:
{
  "${productSlug}": ${JSON.stringify(productPayload, null, 2)}
}`;

  try {
    const response = await axios.post(BASE_URL, {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a rigid machine translation interface that outputs nothing but clean, unformatted raw JSON matching the requested payload keys perfectly. Never include notes or backticks." },
        { role: "user", content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 120000
    });

    const resultText = response.data.choices[0].message.content.trim();
    const parsedResult = JSON.parse(resultText);
    return parsedResult[productSlug] || parsedResult;
  } catch (e) {
    console.error(`❌ DeepSeek 在处理产品 [${productSlug}] -> [${targetLangName}] 时断流或解析失败:`, e.message);
    return null;
  }
}

// ==================== 🚀 自动化运行主链路 ====================
async function runProductsTranslation() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ 错误：未能在路径 ${INPUT_FILE} 下找到英文原生产品字典文件。`);
    return;
  }

  const productsObjectPool = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  const productSlugs = Object.keys(productsObjectPool);
  
  console.log(`🚀 [PolyCanopy] 启动「颗粒化分治」产品翻译引擎。共发现 ${productSlugs.length} 款产品...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const lang of targetLanguages) {
    console.log(`\n🌐 攻坚语种: [${lang.code.toUpperCase()}]`);
    const langFilePath = path.join(OUTPUT_DIR, `${lang.code}.json`);

    let currentLangData = fs.existsSync(langFilePath) 
      ? JSON.parse(fs.readFileSync(langFilePath, 'utf-8')) 
      : {};

    for (const slug of productSlugs) {
      if (currentLangData[slug] && currentLangData[slug].title) {
        console.log(`⏭️  跳过已完成项: [${slug}]`);
        continue;
      }

      console.log(`⏳ 正在发送产品 [${slug}] 至 DeepSeek...`);
      const singleBlock = productsObjectPool[slug];
      const translated = await translateSingleProduct(slug, singleBlock, lang.name);

      if (translated) {
        currentLangData[slug] = translated;
        fs.writeFileSync(langFilePath, JSON.stringify(currentLangData, null, 2), 'utf-8');
        console.log(`✅ [保存] [${slug}] -> ${lang.code}.json`);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  console.log('\n🎉 产品字典翻译已全部完成！');
}

runProductsTranslation();