import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');

// 47都道府県のコードと名前
const PREFECTURES = [
  { code: '01', name: 'hokkaido', nameJa: '北海道' },
  { code: '02', name: 'aomori', nameJa: '青森県' },
  { code: '03', name: 'iwate', nameJa: '岩手県' },
  { code: '04', name: 'miyagi', nameJa: '宮城県' },
  { code: '05', name: 'akita', nameJa: '秋田県' },
  { code: '06', name: 'yamagata', nameJa: '山形県' },
  { code: '07', name: 'fukushima', nameJa: '福島県' },
  { code: '08', name: 'ibaraki', nameJa: '茨城県' },
  { code: '09', name: 'tochigi', nameJa: '栃木県' },
  { code: '10', name: 'gunma', nameJa: '群馬県' },
  { code: '11', name: 'saitama', nameJa: '埼玉県' },
  { code: '12', name: 'chiba', nameJa: '千葉県' },
  { code: '13', name: 'tokyo', nameJa: '東京都' },
  { code: '14', name: 'kanagawa', nameJa: '神奈川県' },
  { code: '15', name: 'niigata', nameJa: '新潟県' },
  { code: '16', name: 'toyama', nameJa: '富山県' },
  { code: '17', name: 'ishikawa', nameJa: '石川県' },
  { code: '18', name: 'fukui', nameJa: '福井県' },
  { code: '19', name: 'yamanashi', nameJa: '山梨県' },
  { code: '20', name: 'nagano', nameJa: '長野県' },
  { code: '21', name: 'gifu', nameJa: '岐阜県' },
  { code: '22', name: 'shizuoka', nameJa: '静岡県' },
  { code: '23', name: 'aichi', nameJa: '愛知県' },
  { code: '24', name: 'mie', nameJa: '三重県' },
  { code: '25', name: 'shiga', nameJa: '滋賀県' },
  { code: '26', name: 'kyoto', nameJa: '京都府' },
  { code: '27', name: 'osaka', nameJa: '大阪府' },
  { code: '28', name: 'hyogo', nameJa: '兵庫県' },
  { code: '29', name: 'nara', nameJa: '奈良県' },
  { code: '30', name: 'wakayama', nameJa: '和歌山県' },
  { code: '31', name: 'tottori', nameJa: '鳥取県' },
  { code: '32', name: 'shimane', nameJa: '島根県' },
  { code: '33', name: 'okayama', nameJa: '岡山県' },
  { code: '34', name: 'hiroshima', nameJa: '広島県' },
  { code: '35', name: 'yamaguchi', nameJa: '山口県' },
  { code: '36', name: 'tokushima', nameJa: '徳島県' },
  { code: '37', name: 'kagawa', nameJa: '香川県' },
  { code: '38', name: 'ehime', nameJa: '愛媛県' },
  { code: '39', name: 'kochi', nameJa: '高知県' },
  { code: '40', name: 'fukuoka', nameJa: '福岡県' },
  { code: '41', name: 'saga', nameJa: '佐賀県' },
  { code: '42', name: 'nagasaki', nameJa: '長崎県' },
  { code: '43', name: 'kumamoto', nameJa: '熊本県' },
  { code: '44', name: 'oita', nameJa: '大分県' },
  { code: '45', name: 'miyazaki', nameJa: '宮崎県' },
  { code: '46', name: 'kagoshima', nameJa: '鹿児島県' },
  { code: '47', name: 'okinawa', nameJa: '沖縄県' }
];

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function fetchNounsForPrefecture(browser, prefCode) {
  console.log(`Fetching data for prefecture code: ${prefCode}`);
  
  const page = await browser.newPage();
  
  try {
    // Local Nounsのリストページにアクセス
    const url = `https://jp.local-nouns.wtf/list/${parseInt(prefCode)}`;
    console.log(`Navigating to: ${url}`);
    
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });

    // ページが完全に読み込まれるまで待機
    await page.waitForTimeout(3000);

    // NFTの画像とメタデータを取得
    const nouns = await page.evaluate(() => {
      const results = [];
      
      // 画像要素を取得（Local Nounsのセレクタに合わせて調整が必要な場合があります）
      const images = document.querySelectorAll('img[src*="ipfs"], img[src*="local-nouns"]');
      
      images.forEach((img, index) => {
        const src = img.src;
        if (src && src.includes('ipfs')) {
          // tokenIdを画像のalt属性やdata属性から取得を試行
          let tokenId = null;
          
          // 親要素からtokenIdを探す
          let parent = img.parentElement;
          while (parent && !tokenId) {
            const text = parent.textContent || '';
            const match = text.match(/#(\d+)/);
            if (match) {
              tokenId = parseInt(match[1]);
              break;
            }
            parent = parent.parentElement;
          }
          
          if (!tokenId) {
            tokenId = 1000 + index; // フォールバック
          }

          results.push({
            tokenId: tokenId,
            image: src,
            head: '', // デフォルト値
            body: ''  // デフォルト値
          });
        }
      });
      
      return results;
    });

    console.log(`Found ${nouns.length} NFTs for prefecture ${prefCode}`);
    return nouns;

  } catch (error) {
    console.error(`Error fetching data for prefecture ${prefCode}:`, error);
    return [];
  } finally {
    await page.close();
  }
}

async function loadExistingData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function main() {
  console.log('Starting Local Nouns data fetch...');
  
  await ensureDataDir();
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const prefecture of PREFECTURES) {
      const fileName = `${prefecture.code}_${prefecture.name}.json`;
      const filePath = path.join(DATA_DIR, fileName);
      
      // 既存データを読み込み
      const existingData = await loadExistingData(filePath);
      
      // 新しいデータを取得
      const newData = await fetchNounsForPrefecture(browser, prefecture.code);
      
      // 新しいNFTがあるかチェック
      const existingIds = new Set(existingData.map(item => item.tokenId));
      const newItems = newData.filter(item => !existingIds.has(item.tokenId));
      
      if (newItems.length > 0) {
        console.log(`Found ${newItems.length} new NFTs for ${prefecture.nameJa}`);
        const updatedData = [...existingData, ...newItems];
        await saveData(filePath, updatedData);
      } else {
        console.log(`No new NFTs found for ${prefecture.nameJa}`);
        // データが空の場合は初期データとして保存
        if (existingData.length === 0 && newData.length > 0) {
          await saveData(filePath, newData);
        }
      }
      
      // レート制限を避けるため少し待機
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } finally {
    await browser.close();
  }
  
  console.log('Data fetch completed!');
}

// ESモジュールの場合の実行チェック
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}