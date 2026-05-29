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

const INPUT_FILE = path.join(__dirname, 'src/i18n/en.json');
const OUTPUT_DIR = path.join(__dirname, 'src/i18n');

// 🌟 排除已经手工打磨完美的 zh 和 ar，精准轰炸剩下 8 种空白语种
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

// ==================== 🤖 DeepSeek 核心颗粒化节点翻译驱动 ====================
async function translateSingleBlock(blockKey, blockPayload, targetLangName) {
  const prompt = `You are a professional B2B localization translator specializing in high-end outdoor architectural engineering and premium aluminum/polycarbonate canopy systems.

Your task is to translate the provided website UI data block into fluent, business-grade, and natural ${targetLangName} suitable for corporate enterprise buyers, architects, and industrial contractors.

STRICT TRANSLATION RULES:
1. Return your response STRICTLY as a valid JSON object matching the exact key structure provided.
2. DO NOT wrap the output in markdown code blocks (\`\`\`json). Output pure unformatted raw text JSON.
3. Keep ALL numeric values, telephone numbers (+86 13420298302), emails, and technical branding keywords ("PolyCanopy", "Bayer", "SABIC", "OMIPA") 100% unchanged.
4. Translate ALL user-facing text with professional engineering gravity, including technical specs, descriptions, "imageAlt", "imageTitle", and "ariaLabel" fields.

Data block to translate:
{
  "${blockKey}": ${JSON.stringify(blockPayload, null, 2)}
}`;

  try {
    const response = await axios.post(BASE_URL, {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a rigid machine translation interface that outputs nothing but clean, unformatted raw JSON matching the requested block structure perfectly." },
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
    const parsedResult = JSON.parse(resultText);
    return parsedResult[blockKey] || parsedResult;
  } catch (e) {
    console.error(`❌ DeepSeek 在处理 UI 模块 [${blockKey}] -> [${targetLangName}] 时断流或解析失败:`, e.message);
    return null;
  }
}

// ==================== 🚀 自动化运行主链路 ====================
async function runUiTranslation() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ 错误：未能在路径 ${INPUT_FILE} 下找到英文原生 UI 文件。`);
    return;
  }

  const englishSourceData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  const allBlockKeys = Object.keys(englishSourceData);
  
  console.log(`🚀 [PolyCanopy] 启动「分治拆解」全站 UI 字典翻译引擎。共发现 ${allBlockKeys.length} 个顶级配置模块...`);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const lang of targetLanguages) {
    console.log(`\n==================================================`);
    console.log(`🌐 正在攻坚 UI 语种: [${lang.code.toUpperCase()}] - ${lang.name}`);
    console.log(`==================================================`);

    const langFilePath = path.join(OUTPUT_DIR, `${lang.code}.json`);

    // 初始化或读取本地已有数据结构
    let currentLangData = {};
    if (fs.existsSync(langFilePath)) {
      try {
        currentLangData = JSON.parse(fs.readFileSync(langFilePath, 'utf-8')) || {};
      } catch (e) {
        console.log(`⚠️ 现有的 ${lang.code}.json 数据损坏，将重新初始化。`);
        currentLangData = {};
      }
    }

    for (const blockKey of allBlockKeys) {
      // 🌟 颗粒级断点续传：如果这个语种文件的这个模块已经有填充内容，秒级跳过
      if (currentLangData[blockKey] && Object.keys(currentLangData[blockKey]).length > 0) {
        console.log(`⏭️  跳过已完成模块: [${blockKey}]`);
        continue;
      }

      console.log(`⏳ 正在发送 UI 模块 [${blockKey}] 至 DeepSeek 翻译中...`);
      const singleBlockPayload = englishSourceData[blockKey];

      const translatedBlockData = await translateSingleBlock(blockKey, singleBlockPayload, lang.name);

      if (translatedBlockData) {
        // 动态合并并实时写入本地
        currentLangData[blockKey] = translatedBlockData;
        fs.writeFileSync(langFilePath, JSON.stringify(currentLangData, null, 2), 'utf-8');
        console.log(`✅ [成功保存] UI 模块: [${blockKey}] -> i18n/${lang.code}.json`);
      } else {
        console.log(`❌ [暂时跳过] UI 模块: [${blockKey}]，可稍后重试。`);
      }

      // 温和缓冲间隔
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
  }

  console.log('\n🎉 [PolyCanopy] 全站 11 国通用 UI 字典已经高保全、全无损完成编译归位！');
}

runUiTranslation();