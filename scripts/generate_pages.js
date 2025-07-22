import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.join(__dirname, '../docs/prefecture/template_fixed.html');
const PREFECTURE_DIR = path.join(__dirname, '../docs/prefecture');

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

async function generatePages() {
  console.log('Generating prefecture pages...');
  
  try {
    // テンプレートを読み込み
    const template = await fs.readFile(TEMPLATE_PATH, 'utf8');
    
    // 各都道府県のページを生成
    for (const prefecture of PREFECTURES) {
      const fileName = `${prefecture.code}_${prefecture.name}.html`;
      const filePath = path.join(PREFECTURE_DIR, fileName);
      
      // テンプレートをそのまま使用（動的にJavaScriptで制御）
      await fs.writeFile(filePath, template, 'utf8');
      console.log(`Generated: ${fileName}`);
    }
    
    console.log(`Successfully generated ${PREFECTURES.length} prefecture pages!`);
    
  } catch (error) {
    console.error('Error generating pages:', error);
    process.exit(1);
  }
}

// 直接実行
generatePages();