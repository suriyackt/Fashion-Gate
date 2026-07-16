const fs = require('fs');
const path = require('path');

// Pure Node.js env parser to avoid external dependencies
try {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.substring(0, index).trim();
        const val = trimmed.substring(index + 1).trim().replace(/^['"]|['"]$/g, '');
        process.env[key] = val;
      }
    });
  }
} catch (e) {
  console.log('Skipped loading .env.local file');
}

// Initialize Sanity Client
const { createClient } = require('@sanity/client');
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4y6hfnze';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-03';
const token = process.env.SANITY_WRITE_TOKEN;

// 1. Core Seed Data for Vilamore Restaurant
const vilamoreSeed = {
  _id: 'vilamore',
  _type: 'restaurantPage',
  restaurantId: 'vilamore',
  title: 'Vilamore Syrian Restaurant & Café',
  headerLinks: [
    { _key: 'link1', title: { en: 'Back to Mall Home', ar: 'العودة للرئيسية' }, linkType: 'url', urlPath: '/en' },
    { _key: 'link2', title: { en: 'Restaurant Home', ar: 'بداية الصفحة' }, linkType: 'anchor', anchorSection: 'hero' },
    { _key: 'link3', title: { en: 'Our Story & Jasmine', ar: 'قصتنا وعراقتنا' }, linkType: 'anchor', anchorSection: 'about' },
    { _key: 'link4', title: { en: 'Our Tasting Menu', ar: 'قائمة التذوق' }, linkType: 'anchor', anchorSection: 'menu' },
    { _key: 'link5', title: { en: 'Ambiance Space', ar: 'الجلسات والأجواء' }, linkType: 'anchor', anchorSection: 'gallery' },
    { _key: 'link6', title: { en: 'Location & Contact', ar: 'الموقع والاتصال' }, linkType: 'anchor', anchorSection: 'location' }
  ],
  
  // Hero Section
  heroTitle: { en: 'WELCOME TO VILAMORE', ar: 'مرحباً بكم في فيلامور' },
  heroSub: { en: 'Your Premier Dining Destination in the Boulevard, Damascus', ar: 'وجهتكم الأولى لتناول الطعام الفاخر في بوليفارد دمشق' },
  heroQuote: { en: '“An immersive journey across Levantine heritage and embers.”', ar: '«رحلة غامرة عبر التراث الشامي وجمر النكهات الأصيلة.»' },
  heroBgType: 'image',
  
  // About Section
  aboutTitle: { en: 'Discover Vilamore', ar: 'اكتشف فيلامور' },
  aboutSubtitle: { en: 'A Story of Jasmine & Embers', ar: 'قصة الياسمين والجمر' },
  aboutQuote: { en: '“An immersive journey across Levantine heritage and embers.”', ar: '«رحلة غامرة عبر التراث الشامي وجمر النكهات الأصيلة.»' },
  aboutDesc: {
    en: 'Under the golden vaults of Fashion Gate Syria, Vilamore welcomes you to a refined journey of flavors. We marry traditional Levantine ingredients with ancestral clay-oven baking and slow-roasted Turkish grills to curate a dining story meant to be shared.',
    ar: 'تحت القباب الذهبية لمعرض فاشن غيت سوريا، يرحب بكم فيلامور في رحلة طهي راقية. نمزج المكونات الشامية التقليدية مع الخبز في أفران الطين القديمة والمشاوي التركية المحضرة على جمر هادئ، لنقدم قصة طعام فريدة خُلقت لتشاركوها مع من تحبون.'
  },

  // Highlight Panels
  panels: [
    {
      _key: 'panel1',
      label: { en: 'Our Food', ar: 'مأكولاتنا' },
      title: { en: 'A Tantalizing Mix of Levantine Grills', ar: 'مزيج يداعب الحواس من المشاوي الشامية' },
      desc: { en: 'Enjoy our signature spiced kebabs, seasoned with authentic Levantine spices and grilled over cherry-wood charcoal embers, served with hot clay-oven flatbread.', ar: 'استمتع بأسياخ الكباب المتبلة ببهارات الشام العريقة، والمشوية على جمر خشب الكرز، تقدم مع خبز التنور الساخن مباشرة من فرن الطين.' },
      btnText: { en: 'Explore Menu', ar: 'استكشف القائمة' }
    },
    {
      _key: 'panel2',
      label: { en: 'Our Courtyard', ar: 'تراس فيلامور' },
      title: { en: 'Stunning Arches, Captivating Courtyard Ambiance', ar: 'عراقة العقود وأجواء التراس الساحرة' },
      desc: { en: 'Located on the Grand Promenade, our open-air courtyard offers a truly spectacular experience with aromatic jasmine arches, sound of water, and an atmosphere that perfectly matches your gathering.', ar: 'يقع تراسنا الخارجي في الممشى الرئيسي ليقدم تجربة استثنائية مع أقراص الياسمين الدمشقي الفواح، خرير المياه العذب، وأجواء عائلية راقية تلائم جميع مناسباتكم.' },
      btnText: { en: 'Explore Courtyard', ar: 'اكتشف الجلسات' }
    },
    {
      _key: 'panel3',
      label: { en: 'Elite & Prestige', ar: 'النخبة والتميز' },
      title: { en: 'Preferred by Celebrities and the Elite', ar: 'ملتقى النخبة والمشاهير في قلب دمشق' },
      desc: { en: 'Renowned for its exceptional dining atmosphere and traditional luxury, Vilamore attracts distinguished guests, offering a perfect blend of exquisite Levant hospitality, heritage, and sophistication.', ar: 'يشتهر فيلامور بضيافته الرفيعة وفخامته الأصيلة، حيث يستقطب كبار الزوار والشخصيات المرموقة، ليقدم لهم مزيجاً ساحراً من حسن الاستقبال السوري العريق والرقي المعاصر.' },
      btnText: { en: 'Learn More', ar: 'اقرأ المزيد' }
    }
  ],

  // Tasting Menu Settings
  menuHeader: { en: 'Our Culinary Menu', ar: 'قائمتنا الشامية العريقة' },
  menuTabs: [
    { en: 'Breakfast & Bakery', ar: 'الفطور والمخبوزات' },
    { en: 'Cold Mezza', ar: 'المقبلات الباردة' },
    { en: 'Hot Mezza & Pastries', ar: 'المقبلات الساخنة والمعجنات' },
    { en: 'Charcoal Grills & Mains', ar: 'المشاوي والوجبات الرئيسية' },
    { en: 'Levantine Desserts', ar: 'الحلويات الشامية' }
  ],

  // 30 Syrian Dishes
  menus: [
    // Breakfast & Bakery (categoryIndex: 0)
    {
      categoryIndex: 0,
      name: { en: 'Fatteh Hammas with Ghee', ar: 'فتة حمص بالسمنة البلدية' },
      desc: { en: 'Local boiled chickpeas layered with toasted flatbread, garlic-infused yogurt, finished with sizzling ghee and pine nuts.', ar: 'حمص مسلوق متبل بالثوم والليمون، مغطى بطبقة من الخبز المحمص واللبن الغني بالثوم، ومزيّن بالسمنة البلدية الساخنة والصنوبر المحمص.' },
      price: 'TBC',
      tag: { en: 'Signature', ar: 'طبق توقيع' },
      note: { en: 'A weekend staple in old Damascus homes.', ar: 'طبق الفطور الدمشقي الأهم في صباح كل جمعة.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'Shakshuka Shamiyeh', ar: 'شكشوكة شامية بالخضار' },
      desc: { en: 'Organic eggs poached in a rich, spiced tomato sauce with sweet bell peppers, onions, and Syrian herbs.', ar: 'بيض طازج مطهو ببطء في صلصة طماطم غنية متبلة بالفلفل الحلو والبصل والأعشاب البرية السورية.' },
      price: 'TBC',
      tag: { en: 'Hot Pan', ar: 'مقلاة ساخنة' },
      note: { en: 'Slow-simmered in clay pots for authentic flavor.', ar: 'تطهى ببطء في فخاريات تقليدية للحفاظ على المذاق الأصيل.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'Manakeesh Za\'atar & Olive Oil', ar: 'مناقيش زعتر بري وزيت زيتون' },
      desc: { en: 'Freshly baked clay-oven flatbread topped with wild thyme, sumac, toasted sesame seeds, and extra virgin olive oil.', ar: 'فطيرة مخبوزة طازجة في فرن الطين، مغطاة بالزعتر البري الشامي، السماق، السمسم المحمص، وزيت الزيتون البكر الممتاز.' },
      price: 'TBC',
      tag: { en: 'Vegan', ar: 'نباتي' },
      note: { en: 'Baked over cherry-wood fire for smoky aroma.', ar: 'تخبز على نار حطب الكرز للحصول على نكهة مدخنة مميزة.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'Syrian Mamounia with Cream', ar: 'المأمونية الحلبية بالقشطة' },
      desc: { en: 'Warm semolina pudding toasted in butter, infused with cinnamon syrup, topped with fresh qashta cream.', ar: 'حلوى السميد الساخنة المحمصة بالزبدة، المعطرة بالقرفة وماء الزهر، تعلوها القشطة البلدية الطازجة.' },
      price: 'TBC',
      tag: { en: 'Sweet Start', ar: 'بداية حلوة' },
      note: { en: 'A traditional Aleppo recipe celebrating sweet mornings.', ar: 'وصفة حلبية عريقة تفتتح بها الصباحات السعيدة.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'Nabulsi Cheese Plate', ar: 'جبنة نابلسية مغلية بالحبهان' },
      desc: { en: 'Boiled salty white cheese infused with mastic and black cumin seeds, served warm with cucumbers.', ar: 'شرائح الجبن الأبيض النابلسي المغلي بالمستكة وحبة البركة، يقدم دافئاً مع شرائح الخيار الطازج والنعناع.' },
      price: 'TBC',
      tag: { en: 'Warm Cheese', ar: 'أجبان دافئة' },
      note: { en: 'Sourced directly from local pastoral dairies.', ar: 'تُجلب خصيصاً من مزارع ريف دمشق التقليدية.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'Damascene Foul Mudammas', ar: 'فول مدمس بالخلطة الشامية' },
      desc: { en: 'Fava beans boiled with garlic, lemon juice, cumin, topped with chopped tomatoes, parsley, and olive oil.', ar: 'فول بلدي مسلوق متبل بالثوم، عصير الليمون، والكمون، مغطى بنعومة الطحينة والطماطم المفرومة والزيت.' },
      price: 'TBC',
      tag: { en: 'Hearty', ar: 'فطور غني' },
      note: { en: 'Drizzled with olive oil pressed in local stone mills.', ar: 'يغرق بزيت الزيتون المعصور على البارد في معاصر حجرية.' }
    },

    // Cold Mezza (categoryIndex: 1)
    {
      categoryIndex: 1,
      name: { en: 'Hummus Bil-Tahini', ar: 'حمص شامخ بالطحينة البلدية' },
      desc: { en: 'Silky puréed chickpeas blended with tahini, garlic, and fresh lemon juice, finished with virgin olive oil.', ar: 'حمص ناعم مخفوق مع الطحينة السمراء، الليمون الطازج، والثوم، يقدم مغطى بخيوط زيت الزيتون البكر.' },
      price: 'TBC',
      tag: { en: 'Classic', ar: 'مقبلات عريقة' },
      note: { en: 'Ground on stone mills to achieve unmatched silkiness.', ar: 'يطحن على حجر الصوان للحصول على ملمس مخملي فريد.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Baba Ghanouj Shami', ar: 'بابا غنوج متبل بالرمان' },
      desc: { en: 'Smoky fire-roasted eggplant mashed with tahini, walnuts, pomegranate molasses, and fresh mint.', ar: 'باذنجان مشوي على اللهب المباشر، مهروس مع الطحينة، الجوز المفروم، دبس الرمان، والنعناع الطازج.' },
      price: 'TBC',
      tag: { en: 'Smoky', ar: 'مذاق مدخن' },
      note: { en: 'Charred over natural wood embers for rustic depth.', ar: 'يشوى على جمر الخشب الطبيعي لاكتساب طعم ريفي غني.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Authentic Tabbouleh', ar: 'تبولة بالبقدونس والنعناع الشامي' },
      desc: { en: 'Finely chopped parsley, mint, tomatoes, onions, tossed with fine bulgur, lemon juice, and olive oil.', ar: 'بقدونس ناعم، نعناع أخضر، طماطم مفرومة وبصل، ممزوجة مع البرغل الناعم وعصير الليمون وزيت الزيتون.' },
      price: 'TBC',
      tag: { en: 'Fresh', ar: 'منعش' },
      note: { en: 'Chopped by hand with razor-sharp blades daily.', ar: 'تفرم يدوياً بسكاكين حادة جداً لضمان نضارة الخضار.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Yalanji (Stuffed Grape Leaves)', ar: 'يالنجي ورق عنب بالزيت' },
      desc: { en: 'Grape leaves rolled and stuffed with spiced rice, tomatoes, parsley, slow-cooked in olive oil.', ar: 'ورق عنب محشو بالأرز المتبل، الطماطم، البقدونس، والنعناع، مطهو ببطء بزيت الزيتون وعصير الليمون.' },
      price: 'TBC',
      tag: { en: 'Delicacy', ar: 'فن المطبخ الشامي' },
      note: { en: 'Cooked with whole garlic cloves and green apples.', ar: 'يطهى ببطء مع فصوص الثوم الكاملة وشرائح التفاح الأخضر للحموضة.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Muhammara with Walnuts', ar: 'محمرة حلبية بالجوز ودبس الرمان' },
      desc: { en: 'Spiced red pepper dip blended with crushed walnuts, breadcrumbs, cumin, and sweet pomegranate molasses.', ar: 'غموس الفلفل الأحمر الحلبي المشوي الممزوج مع الجوز المطحون، بقسماط الخبز، الكمون، ودبس الرمان الحلو.' },
      price: 'TBC',
      tag: { en: 'Spiced', ar: 'متبل ولذيذ' },
      note: { en: 'Features authentic sun-dried Aleppo pepper flakes.', ar: 'تعتمد على رقائق الفلفل الأحمر المجفف تحت شمس حلب.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Shami Labneh bil-Thoum', ar: 'لبنة بلدية بالثوم والنعناع اليابس' },
      desc: { en: 'Strained local yogurt mixed with crushed garlic, dried mint, swimming in virgin olive oil.', ar: 'لبنة ماعز بلدية مكثفة ممزوجة بالثوم المهروس والنعناع المجفف، تعلوها طبقة من زيت الزيتون البكر.' },
      price: 'TBC',
      tag: { en: 'Creamy', ar: 'كريمي غني' },
      note: { en: 'Strained overnight in traditional cotton bags.', ar: 'تصفى طوال الليل في أكياس قماشية بيضاء تقليدية.' }
    },

    // Hot Mezza & Pastries (categoryIndex: 2)
    {
      categoryIndex: 2,
      name: { en: 'Crispy Kibbeh Meatballs', ar: 'كبة مقلية باللحم والصنوبر' },
      desc: { en: 'Golden bulgur shells stuffed with spiced minced lamb, onions, toasted pine nuts, deep-fried to perfection.', ar: 'أقراص البرغل الذهبية المقرمشة المحشوة باللحم المفروم المتبل، البصل، والصنوبر المحمص والبهارات الشامية.' },
      price: 'TBC',
      tag: { en: 'Signature', ar: 'طبق توقيع' },
      note: { en: 'Features seven authentic spices from Damascus spice souks.', ar: 'متبلة بالسبع بهارات الدمشقية الأصلية من سوق البزورية.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Cheese Sambousek', ar: 'سمبوسك بالجبنة والعكاوي' },
      desc: { en: 'Crispy pastry parcels stuffed with a blend of melted Nabulsi, Akkawi cheese, and wild herbs.', ar: 'رقائق عجين مقرمشة محشوة بمزيج من أجبان العكاوي والنابلسي الفاخرة الممزوجة بالبقدونس وحبة البركة.' },
      price: 'TBC',
      tag: { en: 'Crispy', ar: 'مقرمشات' },
      note: { en: 'Hand-folded in half-moon shapes daily.', ar: 'تُلف وتُطوى يدوياً على شكل هلال وتُقلى طازجة عند الطلب.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Savory Meat Safiha', ar: 'صفيحة شامية باللحم ودبس الرمان' },
      desc: { en: 'Minicrust pastry topped with minced lamb, tomatoes, pine nuts, and pomegranate molasses, baked in stone oven.', ar: 'فطائر صغيرة مفتوحة تعلوها طبقة من اللحم المفروم المخلوط بالطماطم والصنوبر ودبس الرمان، مخبوزة في فرن الحجر.' },
      price: 'TBC',
      tag: { en: 'Stone Oven', ar: 'فرن الحجر' },
      note: { en: 'Traditional Damascus recipe with crispy thin edges.', ar: 'وصفة دمشقية أصيلة تتميز بأطراف العجين المقرمشة.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Spicy Potato (Batata Harra)', ar: 'بطاطا حرة بالكزبرة والثوم' },
      desc: { en: 'Golden cubed potatoes sautéed with coriander, crushed garlic, and mild Aleppo chili flakes.', ar: 'مكعبات البطاطا الذهبية المقلية، والمقلبة مع الكزبرة الخضراء، الثوم المهروس، ورقائق الفلفل الحار.' },
      price: 'TBC',
      tag: { en: 'Spicy', ar: 'متبل حار' },
      note: { en: 'Finished with a squeeze of fresh lemon juice.', ar: 'تُسقى بعصير الليمون الطازج فور خروجها من المقلاة.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Sujuk Rolls', ar: 'سجق شامي بالثوم ودبس الرمان' },
      desc: { en: 'Spiced Syrian lamb sausages pan-seared with fresh tomatoes, garlic, green peppers, and pomegranate glaze.', ar: 'نقانق السجق الشامية المتبلة تُطهى في المقلاة مع الطماطم، الثوم، الفلفل الأخضر ودبس الرمان.' },
      price: 'TBC',
      tag: { en: 'Sizzling', ar: 'صوت الطشة' },
      note: { en: 'Sausage casings prepared in-house by our butchers.', ar: 'تُحضر خلطة السجق يدوياً في ملحمتنا الخاصة.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Fried Kibbeh Sajieh', ar: 'كبة صاجية على السيخ' },
      desc: { en: 'Large dome-shaped kibbeh stuffed with minced meat, animal fat, pomegranate seeds, walnuts, and chili paste.', ar: 'أقراص الكبة الصاجية الكبيرة المحشوة باللحم المفروم، الدهن البلدي، حب الرمان، الجوز، ودبس الفليفلة.' },
      price: 'TBC',
      tag: { en: 'Levant Specialty', ar: 'تخصص شامي' },
      note: { en: 'Grilled over charcoal for a rich, smoky interior.', ar: 'تشوى على الفحم الهادئ لتكتسب نكهة دخان الشواء الفريدة.' }
    },

    // Charcoal Grills & Mains (categoryIndex: 3)
    {
      categoryIndex: 3,
      name: { en: 'Vilamore Kebab bil-Karaz', ar: 'كباب بالكرز فيلامور' },
      desc: { en: 'Charcoal-grilled minced lamb kebabs simmered in a sweet and sour St. John\'s cherry reduction sauce.', ar: 'أسياخ من كباب اللحم المفروم المشوي على الفحم، والمطهو ببطء في صلصة الكرز البري الحلوة والحامضة.' },
      price: 'TBC',
      tag: { en: 'House Specialty', ar: 'تخصص فيلامور' },
      note: { en: 'Prepared with wild St. John cherries harvested from Madaya.', ar: 'يُحضر باستخدام الكرز البري المزروع في جبال مضايا وبلودان.' }
    },
    {
      categoryIndex: 3,
      name: { en: 'Halabi Shish Taouk', ar: 'شيش طاووق حلبي بالزعفران' },
      desc: { en: 'Skewers of chicken breast marinated in yogurt, garlic, lemon, saffron, grilled over open flames.', ar: 'مكعبات صدر الدجاج المتبلة باللبن، الثوم، الليمون، خيوط الزعفران، والمشوية على لهب الفحم المفتوح.' },
      price: 'TBC',
      tag: { en: 'Charcoal', ar: 'على الجمر' },
      note: { en: 'Served with our signature garlic whip sauce.', ar: 'يقدم مع ثومية فيلامور المخفوقة بالزيت والليمون.' }
    },
    {
      categoryIndex: 3,
      name: { en: 'Premium Lamb Chops', ar: 'ريش غنم بلدي مشوية' },
      desc: { en: 'Tender local lamb chops marinated with rosemary, garlic, pepper, seared over cherry-wood embers.', ar: 'قطع ريش الغنم البلدي الطرية المتبلة بإكليل الجبل، الثوم، والفلفل الأسود، والمشوية على جمر خشب الكرز.' },
      price: 'TBC',
      tag: { en: 'Elite Cut', ar: 'قطع فاخرة' },
      note: { en: 'Aged for 48 hours to ensure premium tenderness.', ar: 'تُعتق اللحوم لمدة 48 ساعة لضمان ليونة وذوبان النسيج.' }
    },
    {
      categoryIndex: 3,
      name: { en: 'Spiced Shish Kebab', ar: 'كباب شامي متبل بالكزبرة' },
      desc: { en: 'Minced lamb blended with onions, fresh parsley, and our house blend of spices, grilled on steel skewers.', ar: 'كباب اللحم المفروم المخلوط بالبصل، البقدونس المفروم، والبهارات الشامية الخاصة، مشوي على أسياخ حديدية.' },
      price: 'TBC',
      tag: { en: 'Classic Grill', ar: 'مشاوي كلاسيكية' },
      note: { en: 'Features lamb sourced exclusively from Awassi sheep.', ar: 'يُحضر اللحم من خراف العواس البلدية المغذاة طبيعياً.' }
    },
    {
      categoryIndex: 3,
      name: { en: 'Old City Mansaf', ar: 'منسف لحم بلدي بالأرز المخلوط' },
      desc: { en: 'Slow-cooked lamb shank served over a bed of spiced rice, toasted almonds, pine nuts, and laban yogurt sauce.', ar: 'موزات لحم الغنم المطهوة ببطء حتى الذوبان، تقدم على سرير من الأرز المتبل، الصنوبر واللوز المحمص، مع المرق واللبن.' },
      price: 'TBC',
      tag: { en: 'Heritage Main', ar: 'وجبة تراثية' },
      note: { en: 'Melt-in-your-mouth shank meat slow-cooked for 6 hours.', ar: 'تطهى الموزات لمدة 6 ساعات كاملة للحصول على نضج فائق.' }
    },
    {
      categoryIndex: 3,
      name: { en: 'Fattoush with Grilled Halloumi', ar: 'فتوش بالنعناع والجبن الحلوم المشوي' },
      desc: { en: 'Crisp romaine, purslane, radishes, tomatoes, sumac flatbread chips, topped with warm grilled halloumi cheese.', ar: 'أوراق الخس، البقلة، الفجل، الطماطم، الخبز المحمص بالسماق، يعلوها الجبن الحلوم البلدي المشوي على الجمر.' },
      price: 'TBC',
      tag: { en: 'Fresh & Warm', ar: 'منعش ودافئ' },
      note: { en: 'Drizzled with our signature olive oil sumac dressing.', ar: 'يُتبل بصلصة زيت الزيتون البكر، السماق البري وعصير الليمون.' }
    },

    // Levantine Desserts (categoryIndex: 4)
    {
      categoryIndex: 4,
      name: { en: 'Golden Kunafa Nabulsiyeh', ar: 'كنافة نابلسية بالجبن الفاخر' },
      desc: { en: 'Shredded pastry baked with a layer of sweet Nabulsi cheese, soaked in orange blossom water syrup, topped with pistachios.', ar: 'خيوط كنافة مقرمشة مخبوزة بطبقة من الجبن النابلسي المحلى، تسقى بالقطر المعطر بماء الزهر، وتزين بالفستق الحلبي.' },
      price: 'TBC',
      tag: { en: 'House Favorite', ar: 'محبوبة الجماهير' },
      note: { en: 'Baked fresh in copper pans over charcoal embers.', ar: 'تُحضر طازجة في صواني النحاس الأصلية على جمر الفحم.' }
    },
    {
      categoryIndex: 4,
      name: { en: 'Baked Um Ali Pudding', ar: 'أم علي بالكرواسان والقشطة' },
      desc: { en: 'Baked pastry layers soaked in sweet milk, vanilla, loaded with raisins, pistachios, coconut, topped with clotted cream.', ar: 'رقائق عجين مخبوزة منقوعة بالحليب المحلى والفانيليا، محشوة بالزبيب، الفستق الحلبي، وتغطى بطبقة من القشطة البلدية.' },
      price: 'TBC',
      tag: { en: 'Warm Pot', ar: 'فخارية ساخنة' },
      note: { en: 'Baked in clay pots for caramelized crust.', ar: 'تُخبز في أوانٍ فخارية للحصول على سطح مكرمل مقرمش وغني.' }
    },
    {
      categoryIndex: 4,
      name: { en: 'Syrian Pistachio Baklava', ar: 'بقلاوة شامية بالفستق الحلبي' },
      desc: { en: 'Flaky layers of phyllo pastry filled with crushed premium Aleppo pistachios, sweetened with light blossom syrup.', ar: 'رقائق عجين البقلاوة الهشة المحشوة بالفستق الحلبي الأخضر المفروم، محلاة بقطر ماء الزهر الخفيف.' },
      price: 'TBC',
      tag: { en: 'Crispy Sweet', ar: 'مقرمشة وحلوة' },
      note: { en: 'Features over 40 micro-thin pastry layers.', ar: 'تتكون من أكثر من 40 طبقة عجين رقيقة جداً لضمان الهشاشة.' }
    },
    {
      categoryIndex: 4,
      name: { en: 'Mhalabiyeh bil-Mastic', ar: 'مهلبية دمشقية بالمستكة وماء الورد' },
      desc: { en: 'Silky milk pudding infused with natural mastic resin, orange blossom water, topped with ground pistachios.', ar: 'بودينغ الحليب والنشا الشامي المطيب بدموع المستكة اليونانية وماء الورد، يزين بالفستق الحلبي المطحون.' },
      price: 'TBC',
      tag: { en: 'Cold Dessert', ar: 'حلوى باردة' },
      note: { en: 'Served cold in crystal cups with rose petals.', ar: 'تقدم باردة في كؤوس كريستال مزينة بأوراق الورد الجوري.' }
    },
    {
      categoryIndex: 4,
      name: { en: 'Asafeer Qatayef', ar: 'قطايف عصافيري بالقشطة البلدية' },
      desc: { en: 'Mini pancakes folded and stuffed with fresh qashta cream, dipped in ground pistachios, served with honey.', ar: 'فطائر قطايف صغيرة مفتوحة ومحشوة بالقشطة البلدية الطازجة، تغمس بالفستق الحلبي وتُسقى بالعسل الطبيعي.' },
      price: 'TBC',
      tag: { en: 'Delicate', ar: 'حلوى تراثية' },
      note: { en: 'Poured on hot steel grates fresh daily.', ar: 'تُصب أقراص العجين على الصاج الساخن يدوياً وتُحشى يومياً.' }
    },
    {
      categoryIndex: 4,
      name: { en: 'Shami Ghazal Al-Banat', ar: 'غزل البنات الشامي بالقشطة' },
      desc: { en: 'Traditional Arabic cotton candy served over fresh clotted cream and topped with crushed pistachios.', ar: 'حلوى شعر البنات الدمشقية التقليدية البيضاء تقدم مع القشطة البلدية الطازجة وتغطى بالفستق الحلبي.' },
      price: 'TBC',
      tag: { en: 'Unique', ar: 'حلوى استثنائية' },
      note: { en: 'Hand-pulled using ancient copper spinning rods.', ar: 'تُغزل خيوط الحلوى يدوياً بطرق عريقة بمضارب النحاس.' }
    }
  ],

  // Gallery Section
  galleryTitle: { en: 'Terrace & Courtyard Ambiance', ar: 'أجواء التراس والفناء الخارجي' },
  gallerySubtitle: { en: 'Capture moments of jasmine and light', ar: 'التقط لحظات الياسمين والضوء الشامي الدافئ' },
  galleryImages: [
    { _key: 'g1', title: { en: 'Sunlit Archways', ar: 'عقود دمشقية مضيئة' }, subtitle: { en: 'The geometry of daylight', ar: 'هندسة الضوء الطبيعي' } },
    { _key: 'g2', title: { en: 'Jasmine Fragrance', ar: 'عبير الياسمين الفواح' }, subtitle: { en: 'Aromatic open courtyards', ar: 'فناء خارجي يعبق بالعطر' } },
    { _key: 'g3', title: { en: 'Authentic Embers', ar: 'جمر الشواء الأصيل' }, subtitle: { en: 'Slow roasted gastronomy', ar: 'مشاوي شامية على نار هادئة' } }
  ],

  // Location & Contact Section
  locationHeader: { en: 'Location & Hours', ar: 'الموقع وأوقات العمل' },
  hoursTitle: { en: 'Operating Hours', ar: 'ساعات العمل' },
  hoursVal: { en: 'Daily 8:00 AM - 12:00 AM', ar: 'يومياً من 8:00 صباحاً حتى 12:00 منتصف الليل' },
  contactTitle: { en: 'Direct Line', ar: 'الخط المباشر' },
  contactVal: { en: '+963 11 9988 (Ext. Vilamore)', ar: '+963 11 9988 (تحويلة فيلامور)' },
  addressVal: { en: 'Fashion Gate, Damascus, Syria', ar: 'فاشن غيت، دمشق، سوريا' }
};

// 2. Core Seed Data for Arto Coffee
const artoSeed = {
  _id: 'arto-coffee',
  _type: 'restaurantPage',
  restaurantId: 'arto-coffee',
  title: 'Arto Coffee Roasters Page',
  headerLinks: [
    { _key: 'link1', title: { en: 'Back to Mall Home', ar: 'العودة للرئيسية' }, linkType: 'url', urlPath: '/en' },
    { _key: 'link2', title: { en: 'Café Home', ar: 'بداية الصفحة' }, linkType: 'anchor', anchorSection: 'hero' },
    { _key: 'link3', title: { en: 'Our Roastery Standards', ar: 'معايير التحميص' }, linkType: 'anchor', anchorSection: 'about' },
    { _key: 'link4', title: { en: 'Our Brew Menu', ar: 'قائمة القهوة' }, linkType: 'anchor', anchorSection: 'menu' },
    { _key: 'link5', title: { en: 'Ambiance Space', ar: 'الأجواء والتقطير' }, linkType: 'anchor', anchorSection: 'gallery' },
    { _key: 'link6', title: { en: 'Location & Hours', ar: 'الموقع والتفاصيل' }, linkType: 'anchor', anchorSection: 'location' }
  ],
  
  // Hero Section
  heroTitle: { en: 'THE ART OF BREWING', ar: 'فن تحضير القهوة' },
  heroSub: { en: 'Precision roasting and extraction from bean to cup.', ar: 'دقة التحميص والاستخلاص من الحبة إلى الفنجان.' },
  heroQuote: { en: '“Coffee is a language in itself, extracted carefully to gather souls.”', ar: '«القهوة ليست مجرد شراب، بل هي لغة قائمة بذاتها تُقرب المسافات»' },
  heroBgType: 'image',
  
  // About Section
  aboutTitle: { en: 'Specialty Roasting Standards', ar: 'معايير التحميص المختصة' },
  aboutSubtitle: { en: 'THE PURSUIT OF COFFEE SYMMETRY', ar: 'شغف الاستخلاص المتوازن' },
  aboutQuote: { en: '“Coffee is a language in itself, extracted carefully to gather souls.”', ar: '«القهوة ليست مجرد شراب، بل هي لغة قائمة بذاتها تُقرب المسافات»' },
  aboutDesc: {
    en: 'Sourced directly from Dubai roasters, Arto Coffee represents the absolute pinnacle of premium coffee culture in Syria. Our beans are selected from micro-lots in Brazil, Ethiopia, and Colombia, roasted to highlight rich cocoa and floral notes, and brewed with state-of-the-art temperature controls.',
    ar: 'تستورد قهوة آرتو مباشرة من المحامص الفاخرة في دبي، لتمثل الذروة الحقيقية لثقافة القهوة الفاخرة في سوريا. يتم اختيار حبوبنا بعناية من مزارع صغيرة في البرازيل وإثيوبيا وكولومبيا، وتحميصها لتبرز النكهات العميقة للشوكولاتة والأزهار.'
  },

  // Highlight Panels
  panels: [
    {
      _key: 'panel1',
      label: { en: 'Precision Brew', ar: 'تقطير دقيق' },
      title: { en: 'A Tantalizing Mix of Coffee Chemistry', ar: 'كيمياء استخلاص القهوة المتوازنة' },
      desc: { en: 'Enjoy our signature pour-overs, seasoned with beans from premium micro-lots and dripped over slow filters, served with artisanal pastries.', ar: 'استمتع بالتقطير اليدوي الفاخر لحبوب البن المنتقاة بعناية والمحضرة ببطء لإبراز نكهاتها الكاملة.' },
      btnText: { en: 'Explore Brews', ar: 'استكشف مشروباتنا' }
    }
  ],

  // Menu Settings
  menuHeader: { en: 'THE BREW LIST', ar: 'قائمة المشروبات والمخبوزات' },
  menuTabs: [
    { en: 'Specialty Coffee', ar: 'القهوة المختصة' },
    { en: 'Specialty Beverages', ar: 'المشروبات المميزة' },
    { en: 'Decadent Desserts', ar: 'الحلويات الفاخرة' }
  ],

  // Coffee Menu Items
  menus: [
    // Specialty Coffee (categoryIndex: 0)
    {
      categoryIndex: 0,
      name: { en: 'Specialty Flat White', ar: 'فلات وايت متميز' },
      desc: { en: 'Double shot of espresso extracted from single-origin Brazilian beans, mixed with steamed velvety microfoam milk.', ar: 'جرعة مزدوجة من إسبريسو حبوب البن البرازيلي الأحادي المنشأ، ممزوج بالحليب الدافئ ذي الرغوة المخملية الناعمة.' },
      price: 'TBC',
      tag: { en: 'Popular', ar: 'الأكثر طلباً' },
      note: { en: 'Features full-bodied chocolate notes.', ar: 'حبوب بن برازيلية ذات نكهة شوكولاتية غنية وجسم كامل.' }
    },
    {
      categoryIndex: 0,
      name: { en: 'V60 Drip Over Ice', ar: 'قهوة V60 المقطرة باردة' },
      desc: { en: 'Artisanal filter pour-over capturing the bright citrus, honey, and cocoa flavor notes of our specialty roasted beans.', ar: 'تقطير بارد للبن الفاخر يبرز نكهات الحمضيات والأزهار المنعشة لحبوب البن الخاصة بنا.' },
      price: 'TBC',
      tag: { en: 'Specialty', ar: 'قهوة مختصة' },
      note: { en: 'Single-origin Ethiopian Yirgacheffe.', ar: 'حبوب بن إثيوبية يورغاشيفي ذات نكهة زهرية منعشة.' }
    },
    
    // Specialty Beverages (categoryIndex: 1)
    {
      categoryIndex: 1,
      name: { en: 'Saffron & Cardamom Latte', ar: 'لاتيه الزعفران المميز بالهيل' },
      desc: { en: 'Premium espresso blended with warm milk infused with wild saffron strands and organic mountain honey.', ar: 'إسبريسو فاخر يمتزج مع الحليب الدافئ المنقوع بخيوط الزعفران البري وعسل الجبال الطبيعي.' },
      price: 'TBC',
      tag: { en: 'Aromatic', ar: 'عطري' },
      note: { en: 'Warm cardamoms freshly crushed.', ar: 'نكهة الهل الأخضر الطازج المطحون محلياً.' }
    },
    {
      categoryIndex: 1,
      name: { en: 'Iced Pistachio Frappé', ar: 'فرابيه الفستق الحلبي المثلج' },
      desc: { en: 'Chilled espresso whipped with roasted Aleppo pistachio paste, cocoa syrup, milk, topped with fresh cream.', ar: 'إسبريسو بارد مخفوق مع كريمة الفستق الحلبي المحمصة، صلصة الكاكاو والحليب، مغطى بالكريمة.' },
      price: 'TBC',
      tag: { en: 'Iced Sweet', ar: 'فرابيه بارد' },
      note: { en: 'Aleppo pistachio roasted in-house.', ar: 'كريمة فستق حلبي طبيعية 100% دون نكهات صناعية.' }
    },

    // Decadent Desserts (categoryIndex: 2)
    {
      categoryIndex: 2,
      name: { en: 'San Sebastian Cheesecake', ar: 'تشيز كيك سان سيباستيان' },
      desc: { en: 'Crustless creamy baked cheesecake with a dark caramelized top, served with warm Belgian milk chocolate pour.', ar: 'تشيز كيك كريمية مخبوزة بدون أطراف مع سطح مكرمل داكن، تقدم مع صبّة من الشوكولاتة البلجيكية الساخنة.' },
      price: 'TBC',
      tag: { en: 'Best Seller', ar: 'الأكثر مبيعاً' },
      note: { en: 'Baked fresh daily in our ovens.', ar: 'تخبز طازجة يومياً في أفراننا لنضمن قوامها الذائب.' }
    },
    {
      categoryIndex: 2,
      name: { en: 'Honey Pistachio Sponge Cake', ar: 'كعكة العسل بالفستق الحلبي' },
      desc: { en: 'Light honey sponge cake layered with natural forest honey, filled with a rich green pistachio pastry cream.', ar: 'كعكة إسفنجية خفيفة مشبعة بعسل الغابات الطبيعي، ومحشوة بكريمة الفستق الحلبي الأخضر الغنية.' },
      price: 'TBC',
      tag: { en: 'Signature Cake', ar: 'كعكة التوقيع' },
      note: { en: 'Garnished with wild honeycomb.', ar: 'تزين بقطعة صغيرة من شمع عسل النحل البري.' }
    }
  ],

  // Ambiance / Gallery
  galleryTitle: { en: 'Terrace & Courtyard Ambiance', ar: 'أجواء التراس والفناء الخارجي' },
  gallerySubtitle: { en: 'Capture moments of jasmine and light', ar: 'التقط لحظات الياسمين والضوء الشامي الدافئ' },
  
  // Location & Contact Section
  locationHeader: { en: 'FIND US', ar: 'تفضل بزيارتنا' },
  hoursTitle: { en: 'Operating Hours', ar: 'ساعات العمل' },
  hoursVal: { en: 'Daily 8:00 AM - 12:00 AM', ar: 'يومياً من 8:00 صباحاً حتى 12:00 منتصف الليل' },
  contactTitle: { en: 'Direct Line', ar: 'الخط المباشر' },
  contactVal: { en: '+963 11 9988 (Ext. Arto)', ar: '+963 11 9988 (تحويلة آرتو)' },
  addressVal: { en: 'Fashion Gate, Damascus, Syria', ar: 'فاشن غيت، دمشق، سوريا' }
};

// 3. Write data to sanity-seed-data.json for backup CLI import
const jsonSeedPath = path.join(__dirname, '../sanity-seed-data.json');
fs.writeFileSync(jsonSeedPath, JSON.stringify([vilamoreSeed, artoSeed], null, 2), 'utf8');
console.log(`JSON seed file written to: ${jsonSeedPath}`);

// 4. Try to write directly to Sanity if token is present
if (token) {
  const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false
  });

  async function seed() {
    console.log('Starting Sanity dataset seed...');
    try {
      await sanityClient.createOrReplace(vilamoreSeed);
      console.log('Successfully seeded Vilamore Restaurant document!');
      await sanityClient.createOrReplace(artoSeed);
      console.log('Successfully seeded Arto Cafe document!');
      console.log('Sanity database seeded successfully!');
    } catch (err) {
      console.error('Failed to seed directly to Sanity API:', err.message);
      console.log('\nYou can import the generated "sanity-seed-data.json" file using the Sanity CLI:');
      console.log('  npx sanity dataset import sanity-seed-data.json production');
    }
  }

  seed();
} else {
  console.log('\nNo SANITY_WRITE_TOKEN environment variable found in .env.local.');
  console.log('Direct Sanity API write skipped.');
  console.log('\nTo seed your database, run:');
  console.log('  npx sanity dataset import sanity-seed-data.json production');
}
