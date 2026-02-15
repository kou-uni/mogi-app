import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 シードデータを投入中...');

  // 既存データをクリア
  await prisma.review.deleteMany();
  await prisma.shop.deleteMany();

  // 店舗データを作成
  const ichimaru = await prisma.shop.create({
    data: {
      name: '茂木一〇香本家',
      category: '銘菓',
      address: '茂木町1805',
      description: '中が空洞の不思議な焼菓子「一〇香」の元祖。茂木びわゼリーも名物。全国菓子博覧会受賞。',
      specialty: ['銘菓', '一〇香', 'びわゼリー'],
      sortOrder: 1,
      reviews: {
        create: [
          {
            userName: 'はるか',
            content: '一〇香、中が空洞でびっくり。香ばしくて軽い食感がクセになります。友達に5箱買いました。',
          },
          {
            userName: 'けんた',
            content: 'びわゼリーが最高。茂木産びわがまるごと入ってて贅沢。冷やして食べるのがおすすめ。',
          },
        ],
      },
    },
    include: {
      reviews: true,
    },
  });

  const oron = await prisma.shop.create({
    data: {
      name: 'パンのオロン',
      category: 'パン',
      address: '茂木町2145-2',
      description: '月と海から徒歩5分。朝6:30開店。惣菜パンの具材たっぷり、無料コーヒーあり。火曜定休。',
      specialty: ['パン', '惣菜パン', '朝食'],
      openingHours: '6:30-17:00',
      closedDays: '火曜日',
      sortOrder: 2,
      reviews: {
        create: [
          {
            userName: 'みさき',
            content: 'アボカドとエビのパン、具がはみ出すくらいたっぷり。散歩がてらの朝ごはんに最高でした。',
          },
        ],
      },
    },
    include: {
      reviews: true,
    },
  });

  const tempura = await prisma.shop.create({
    data: {
      name: '茂木のてんぷら屋',
      category: 'てんぷら',
      address: '茂木港周辺',
      description: '港町ならではの魚すり身てんぷら。揚げたてを店頭で。長崎のてんぷらは甘めの味付けが特徴。',
      specialty: ['てんぷら', '揚げたて', '食べ歩き'],
      sortOrder: 3,
    },
  });

  console.log('✅ シードデータの投入が完了しました！');
  console.log(`📍 ${ichimaru.name} (${ichimaru.reviews.length}件の口コミ)`);
  console.log(`📍 ${oron.name} (${oron.reviews.length}件の口コミ)`);
  console.log(`📍 ${tempura.name}`);
}

main()
  .catch((e) => {
    console.error('❌ シード実行中にエラーが発生:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
