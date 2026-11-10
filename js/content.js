/* =====================================================================
   SITE CONTENT: edit this file to update the website.
   ---------------------------------------------------------------------
   • Text, links and email live in SITE (top).
   • Projects: copy one { ... } block inside `projects`, change the
     slug/text/images, and it appears on the home page AND gets its own
     case-study page automatically (work.html?p=<slug>).
   • Images go in assets/img/<project>/, videos in assets/video/.
   ===================================================================== */

window.SITE = {
  name: 'shikha',
  role: 'Creative director & brand designer',
  email: 'shikhalogue@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/shikha-j/',
    instagram: 'https://www.instagram.com/shikhalogue/',
    instagramHandle: '@shikhalogue',
    studio: 'https://nirmanocreativestudio.framer.website/',
  },

  hero: {
    title: ['Brands that feel like something.', 'For soulful brands that want to be felt, not just seen.'],
    text: 'I’m a creative director and brand designer building calm, multi-sensory brand worlds, from identity to imagery to story.',
    label: 'creative director & brand designer',
  },

  // The three statements that appear one by one on the dark scroll section
  statements: [
    'Why should a brand feel like something?',
    'People forget what they saw. They remember how it made them feel.',
    'A brand isn’t just a logo. It’s a world people want to step into.',
  ],

  about: {
    lead: 'I’m Shikha, a creative director and brand designer. I build calm, soulful brand worlds where identity, imagery and story speak the same language, so every touchpoint feels like it belongs.',
    portrait: { src: 'assets/img/me/graduation-seated.jpg', alt: 'Shikha in a black graduation gown, sitting on a white studio floor holding her cap', w: 1066, h: 1600 },
    facts: [
      { label: 'Currently', value: 'Founder & creative director of Nirmano Creative Studio' },
      { label: 'Background', value: 'Graphic design graduate' },
      { label: 'Disciplines', value: 'Brand identity, creative direction, packaging, photography & film, social content, soundscape curation' },
      { label: 'Tools', value: 'Adobe Illustrator, Premiere Pro, Affinity, Framer' },
      { label: 'Open to', value: 'Full-time roles, freelance projects & collaborations' },
    ],
    photos: [
      { src: 'assets/img/me/graduation-peace.jpg', alt: 'Shikha in a graduation gown holding up her cap and making a peace sign', caption: 'Graduation day', w: 1066, h: 1600 },
      { src: 'assets/img/me/dubai.jpg', alt: 'Shikha smiling by the water in front of a city skyline in Dubai', caption: 'Dubai', w: 1600, h: 900 },
      { src: 'assets/img/me/behind-the-lens.jpg', alt: 'Shikha with a camera around her neck and a backpack, outdoors under a blue sky', caption: 'Behind the lens', w: 1280, h: 1600 },
    ],
  },

  services: [
    {
      title: 'Brand Identity',
      text: 'Vision, strategy, logo, typography, colour and guidelines: foundations that evoke serenity, emotional depth and connection.',
      media: { src: 'assets/img/mockups/ipad.jpg', alt: 'A brand guideline open on an iPad resting on textured fabric' },
    },
    {
      title: 'Creative Direction',
      text: 'One clear vision across shoots, campaigns and seasons, so a brand’s emotional tone stays consistent and grounded.',
      media: { src: 'assets/img/mockups/macbook-hands.jpg', alt: 'Hands on a MacBook Pro showing a nirmano brand layout' },
    },
    {
      title: 'Social & Digital',
      text: 'Instagram, reels and digital touchpoints designed as part of the same world, never as an afterthought.',
      media: { src: 'assets/img/mockups/iphone-hand.jpg', alt: 'A hand holding an iPhone showing a nirmano Instagram feed at a desk' },
    },
    {
      title: 'Web & Launch',
      text: 'Pitch decks, landing pages and launch moments, from a studio website to an exhibition that brings the brand into a room.',
      media: { src: 'assets/img/mockups/macbook-table.jpg', alt: 'A MacBook Pro on a wooden table beside a plant, showing the nirmano website' },
    },
    {
      title: 'Photography & Film',
      text: 'Self-portrait series, ethnographic film and brand imagery, shot and directed with the same calm eye.',
      media: { video: 'assets/video/asra-hover.mp4', src: 'assets/img/asra/photo-3.jpg', alt: 'A maintenance worker painting a white line on a clay tennis court' },
    },
  ],
  servicesNote: {
    strong: 'One creative direction, from first idea to final frame.',
    text: 'Founders often juggle a designer, a photographer and a content creator with no shared soul. I bring it all under one vision, so every touchpoint feels like the same calm, cohesive world.',
  },

  faq: [
    {
      q: 'Are you open to new roles?',
      a: 'Yes. I’m open to full-time, freelance and contract work in brand design, creative direction and art direction, in a studio or remotely. The quickest way to reach me is email or LinkedIn.',
    },
    {
      q: 'What does working together look like?',
      a: 'It starts with the brand’s essence: who it’s for, how it should feel and what it stands for. From there I build the identity, extend it into a full world of imagery, content and touchpoints, and finish with a guideline so it stays consistent.',
    },
    {
      q: 'What can you deliver?',
      a: 'Brand identity foundations (strategy, logo, typography, colour, guidelines), multi-sensory world-building across photo, video, sound and digital, and ongoing creative direction for social media, campaigns and seasonal shoots.',
    },
    {
      q: 'Do you work on photography and film too?',
      a: 'Yes. From the Becoming Mata Ambika self-portrait series to an ethnographic film shot at the Lusaka Club in Zambia, image-making is part of how I build brands, not an add-on.',
    },
    {
      q: 'Which tools do you use?',
      a: 'Adobe Illustrator and Premiere Pro, Affinity and Framer, plus a camera for anything that needs to be shot rather than designed.',
    },
    {
      q: 'Who do you love working with?',
      a: 'Soulful brands and the people behind them: boutique hospitality, lodges, eco-retreats, and craft-led businesses that value introspection, emotional depth and long-term thinking.',
    },
  ],

  /* ------------------------------------------------------------------
     PROJECTS
     cover   : image on the home grid (and top of the case study)
     hero    : optional wide image for the top of the case study
     hover   : { video: '...' } or { images: [...] } plays on hover
     featured: false  moves a project into the smaller "Other projects" list
     blocks  : the case-study page, top to bottom. Types:
               full  { src, alt, caption?, w?, h? }
               pair  { items: [{src, alt, caption?}, {...}], ratio? }
               text  { title, body }
               quote { text, cite? }
               video { src, poster?, caption? }
               reels { items: [{src | video, alt}], caption? }  (tall/phone items)
     ------------------------------------------------------------------ */
  projects: [
    {
      slug: 'nirmano',
      title: 'Nirmano Creative Studio',
      year: '2025 – 2026',
      role: 'Founder & creative director',
      context: 'Final-year project & studio launch',
      tags: ['Brand Identity', 'Creative Direction', 'Strategy'],
      summary: 'My own boutique, creative-direction-led studio for soulful brands. Identity system, 49-page brand guideline, pitch deck, launch content and an exhibition.',
      cover: { src: 'assets/img/nirmano/cover.jpg', alt: 'The nirmano arch logomark over soft desert dunes', position: '35% 50%' },
      hero: { src: 'assets/img/nirmano/exhibition.jpg', alt: 'Shikha presenting the nirmano creative studio exhibition stand with arched panels', position: '50% 45%' },
      hover: { video: 'assets/video/nirmano-reel.mp4' },
      link: { label: 'Visit the studio', url: 'https://nirmanocreativestudio.framer.website/' },
      intro: 'nirmano is a multi-sensory, creative-direction-led studio for emotionally resonant, soulful brands, sitting at the bridge between inspiration and introspection. I built it end to end: the identity system and brand guideline, the business plan and pitch deck, the first social content, and an exhibition to introduce the studio in person.',
      blocks: [
        { type: 'full', src: 'assets/img/nirmano/guide-01.jpg', alt: 'Cover of the nirmano brand identity guideline', caption: 'Brand identity guideline, 49 pages' },
        { type: 'text', title: 'The essence', body: 'nirmano helps brands look beautiful and feel deeply aligned. Every brand world it builds is multi-sensory, emotional and calm: visual systems that invite serenity, balance and presence. The studio’s own identity had to live up to that promise first.' },
        { type: 'pair', items: [
          { src: 'assets/img/nirmano/guide-14.jpg', alt: 'The nirmano logomark on a cream background' },
          { src: 'assets/img/nirmano/guide-20.jpg', alt: 'The nirmano logo lockup with wordmark' },
        ] },
        { type: 'full', src: 'assets/img/nirmano/guide-27.jpg', alt: 'nirmano colour system page with sand, brown and gold swatches', caption: 'Colour system' },
        { type: 'pair', items: [
          { src: 'assets/img/nirmano/guide-28.jpg', alt: 'nirmano colour swatches with values' },
          { src: 'assets/img/nirmano/guide-31.jpg', alt: 'nirmano typography specimen' },
        ] },
        { type: 'full', src: 'assets/img/nirmano/guide-36.jpg', alt: 'nirmano brand pattern built from the arch logomark', caption: 'Brand assets' },
        { type: 'pair', items: [
          { src: 'assets/img/nirmano/guide-39.jpg', alt: 'nirmano photography direction: quiet, grounded, gently observational' },
          { src: 'assets/img/nirmano/guide-41.jpg', alt: 'nirmano imagery moodboard of warm, textured photographs' },
        ] },
        { type: 'quote', text: 'We sit at the bridge between inspiration and introspection, helping brands look beautiful and feel deeply aligned.', cite: 'nirmano pitch deck' },
        { type: 'pair', ratio: '4 / 5', items: [
          { src: 'assets/img/mockups/macbook-table.jpg', alt: 'The nirmano website on a MacBook Pro on a wooden table' },
          { src: 'assets/img/mockups/iphone-desk.jpg', alt: 'nirmano on an iPhone standing on a sunlit wooden desk' },
        ] },
        { type: 'reels', caption: 'Launch content: studio reel and the Dzuwa Safari Lodge identity reel', items: [
          { src: 'assets/img/mockups/instagram-light.jpg', alt: 'nirmanocreativestudio Instagram profile in light mode' },
          { video: 'assets/video/nirmano-reel.mp4', alt: 'nirmano studio reel: soft linen curtains moving in the light' },
          { video: 'assets/video/dzuwa-reel.mp4', alt: 'Dzuwa Safari Lodge identity reel with impala, colour palette and pattern' },
          { src: 'assets/img/mockups/instagram-dark.jpg', alt: 'nirmanocreativestudio Instagram profile in dark mode' },
        ] },
        { type: 'text', title: 'The business', body: 'Alongside the identity I wrote a full business plan and pitch deck: the problem (founders juggling freelancers with no shared creative soul), the solution (a single creative-direction hub), services and packages, target clients in boutique hospitality, the competitor landscape and a five-year roadmap.' },
        { type: 'pair', items: [
          { src: 'assets/img/nirmano/deck-02.jpg', alt: 'Pitch deck welcome page describing nirmano as a boutique design studio' },
          { src: 'assets/img/nirmano/deck-07.jpg', alt: 'Pitch deck services and packages page' },
        ] },
      ],
    },

    {
      slug: 'chaiyay',
      title: 'Chaiyay',
      year: '2024',
      role: 'Brand identity & packaging design',
      context: 'Graphic design coursework',
      tags: ['Brand Identity', 'Packaging', 'Print'],
      summary: 'A vibrant, eco-conscious chai brand. In Hindi, “Chai chaiyay?” means “Want chai?”. Wordmark, logo, colour, type and a hand-made sustainable packaging range.',
      cover: { src: 'assets/img/chaiyay/pack-10.jpg', alt: 'Chaiyay glass tea jars and a gift box with the red mandala logo', position: '50% 50%' },
      hover: { images: ['assets/img/chaiyay/brand-26.jpg', 'assets/img/chaiyay/pack-09.jpg', 'assets/img/chaiyay/brand-29.jpg', 'assets/img/chaiyay/pack-05.jpg'] },
      intro: 'Chaiyay is a playful mix of “chai” and “yay”, and a play on words: chaiyay means “want” in Hindi, so “Chai chaiyay?” simply asks “Want chai?”. The identity blends tradition with modernity, warmth, community and youthful sophistication, and carries through to a full packaging range built from eco-conscious materials.',
      blocks: [
        { type: 'full', src: 'assets/img/chaiyay/brand-26.jpg', alt: 'Chaiyay shopping bags and takeaway cups' },
        { type: 'text', title: 'Mission', body: 'To create a space where tradition meets modernity through the timeless experience of chai, offering eco-conscious, high-quality blends that inspire joy, warmth and meaningful moments.' },
        { type: 'pair', items: [
          { src: 'assets/img/chaiyay/brand-09.jpg', alt: 'The Chaiyay wordmark' },
          { src: 'assets/img/chaiyay/brand-11.jpg', alt: 'The Chaiyay mandala logo' },
        ] },
        { type: 'full', src: 'assets/img/chaiyay/brand-14.jpg', alt: 'Chaiyay logo and wordmark variations', caption: 'Logo variations' },
        { type: 'pair', items: [
          { src: 'assets/img/chaiyay/brand-17.jpg', alt: 'Chaiyay Pantone colour selection' },
          { src: 'assets/img/chaiyay/brand-18.jpg', alt: 'Chaiyay colour packaging' },
        ] },
        { type: 'full', src: 'assets/img/chaiyay/brand-21.jpg', alt: 'Chaiyay primary typeface specimen', caption: 'Typography' },
        { type: 'pair', items: [
          { src: 'assets/img/chaiyay/brand-25.jpg', alt: 'Chaiyay takeaway cups in use' },
          { src: 'assets/img/chaiyay/brand-28.jpg', alt: 'Chaiyay jar and menu mockup' },
        ] },
        { type: 'full', src: 'assets/img/chaiyay/brand-29.jpg', alt: 'Chaiyay A-board sign and tote bag', caption: 'Brand in action' },
        { type: 'text', title: 'Packaging', body: 'Biodegradable takeaway cups, recyclable boxes, a gift box made from recycled materials with detailing inspired by Indian art, kraft shopping bags and reusable glass jars for loose tea. Every label was printed, cut and glued by hand, with golden accents added in metallic marker for a premium finish.' },
        { type: 'full', src: 'assets/img/chaiyay/pack-09.jpg', alt: 'Chaiyay packaging: gift box, jars and teapot in warm light' },
        { type: 'pair', items: [
          { src: 'assets/img/chaiyay/pack-05.jpg', alt: 'The Chaiyay gift box unboxing experience' },
          { src: 'assets/img/chaiyay/pack-06.jpg', alt: 'Chaiyay reusable kraft shopping bags' },
        ] },
        { type: 'pair', items: [
          { src: 'assets/img/chaiyay/pack-07.jpg', alt: 'Chaiyay glass containers for loose tea' },
          { src: 'assets/img/chaiyay/pack-08.jpg', alt: 'Chaiyay packaging photographed with a teapot' },
        ] },
        { type: 'full', src: 'assets/img/chaiyay/pack-11.jpg', alt: 'The full Chaiyay packaging range' },
      ],
    },

    {
      slug: 'lusaka-tennis-club',
      title: 'Lusaka Tennis Club',
      year: 'May 2025',
      role: 'Photography, film & ethnographic research',
      context: 'ASRA 2025',
      tags: ['Photography', 'Film', 'Ethnography'],
      summary: 'An ethnographic photo series and film following Mr. Alfred and Mr. George, maintenance workers at the Lusaka Club in Zambia, through their daily ritual of preparing the courts.',
      cover: { src: 'assets/img/asra/photo-3.jpg', alt: 'A maintenance worker painting a white line on a clay tennis court', position: '50% 60%' },
      hover: { video: 'assets/video/asra-hover.mp4' },
      intro: 'Tennis Club Section, Lusaka Club, Zambia, 6 May 2025. Maintenance workers Mr. Alfred and Mr. George proceed with their daily ritual of preparing the tennis courts: layering the clay, mixing the paint, painting the lines, and taking a well-earned pause in the breeze.',
      blocks: [
        { type: 'video', src: 'assets/video/asra-excerpt.mp4', poster: 'assets/img/asra/photo-3.jpg', caption: 'Excerpt from the ethnographic film' },
        { type: 'full', src: 'assets/img/asra/photo-1.jpg', alt: 'A worker spreading clay across the tennis court', caption: 'Layering the Court' },
        { type: 'pair', items: [
          { src: 'assets/img/asra/photo-2.jpg', alt: 'Mixing line paint beside the court', caption: 'Mixing the Paint' },
          { src: 'assets/img/asra/photo-3.jpg', alt: 'Painting the white boundary line', caption: 'Painting the Line' },
        ] },
        { type: 'full', src: 'assets/img/asra/photo-4.jpg', alt: 'A worker resting on the green stands in the shade', caption: 'Enjoying the Breeze' },
        { type: 'pair', items: [
          { src: 'assets/img/asra/photo-5.jpg', alt: 'Workers moving on to the next court', caption: 'Onto the Next Court' },
          { src: 'assets/img/asra/photo-6.jpg', alt: 'Two workers sitting together on a bench', caption: 'Chilling on the Bench' },
        ] },
      ],
    },

    {
      slug: 'house-of-ambika',
      featured: false, // shown under "Other projects"
      title: 'House of Ambika',
      year: 'June 2025',
      role: 'Brand identity, art direction & self-portraiture',
      context: 'Ancestor Project',
      tags: ['Brand Identity', 'Art Direction', 'Photography'],
      summary: 'A platform for ancestral remembrance and feminine empowerment, plus Becoming Mata Ambika, a self-portrait series recreating a Kangra painting of the goddess.',
      cover: { src: 'assets/img/ambika/brand-01.jpg', alt: 'House of Ambika cover: Shikha in a pink silk saree against blue and red drapes', position: '62% 25%' },
      hover: { images: ['assets/img/ambika/self-04.jpg', 'assets/img/ambika/brand-08.jpg', 'assets/img/ambika/self-05.jpg'] },
      intro: 'Originally inspired by the mythic discovery of my link to the goddess Ambika, House of Ambika has grown into a sacred creative project: a visual and community platform for ancestral remembrance and feminine empowerment. Through storytelling, ritual and design, it reclaims what was once unknown and passes it forward.',
      blocks: [
        { type: 'full', src: 'assets/img/ambika/brand-07.jpg', alt: 'House of Ambika vision board with palace architecture and the emblem' },
        { type: 'text', title: 'Mission', body: 'To awaken ancestral memory through art, ritual and community, preserving ancient knowledge to empower the women of today and tomorrow. The brand rests on four pillars: remembrance, ritual, radiance and sisterhood.' },
        { type: 'pair', items: [
          { src: 'assets/img/ambika/brand-03.jpg', alt: 'Namaste page with the Ambika Mata painting' },
          { src: 'assets/img/ambika/brand-04.jpg', alt: 'The four pillars of House of Ambika' },
        ] },
        { type: 'full', src: 'assets/img/ambika/brand-05.jpg', alt: 'House of Ambika moodboard of textiles, jewellery and Kangra art', caption: 'Moodboard' },
        { type: 'full', src: 'assets/img/ambika/brand-06.jpg', alt: 'Logo, colour palette and typography for House of Ambika', caption: 'Kangra-art inspired emblem, palette and type' },
        { type: 'text', title: 'Becoming Mata Ambika', body: 'A self-portrait series extending the Ancestor Project. It recreates the painting of Mata Ambika, the divine origin of the Katoch lineage, using light, fabric, gesture and quiet.' },
        { type: 'pair', items: [
          { src: 'assets/img/ambika/self-02.jpg', alt: 'Source image: the Ambika Mata painting', caption: 'Source image' },
          { src: 'assets/img/ambika/self-03.jpg', alt: 'The recreated portrait of Mata Ambika', caption: 'Recreated portrait' },
        ] },
        { type: 'full', src: 'assets/img/ambika/self-04.jpg', alt: 'Three self-portraits of Shikha in a pink saree' },
        { type: 'quote', text: 'This series allowed me to go beyond historical documentation and step into imaginative memory. I used light, fabric, gesture, and quiet to build a bridge between myself and the women I’ll never meet, but still remember.', cite: 'shikha' },
        { type: 'full', src: 'assets/img/ambika/self-05.jpg', alt: 'Self-portrait details: veil, hands, and ritual objects' },
        { type: 'pair', items: [
          { src: 'assets/img/ambika/brand-08.jpg', alt: 'Photo shoot inspired by Ambika Mata, spread one' },
          { src: 'assets/img/ambika/brand-09.jpg', alt: 'Photo shoot inspired by Ambika Mata, spread two' },
        ] },
      ],
    },

    {
      slug: 'liulic',
      featured: false, // shown under "Other projects"
      title: 'Liulic',
      year: '2024',
      role: 'Brand identity & mockups',
      context: 'Graphic design coursework',
      tags: ['Brand Identity', 'Concept', 'Mockups'],
      summary: 'A brand identity for a futuristic florist pioneering bioluminescent flowers, where nature’s beauty meets cutting-edge technology.',
      cover: { src: 'assets/img/liulic/store.jpg', alt: 'A glowing pink Liulic flower store interior', position: '50% 55%' },
      hover: { images: ['assets/img/liulic/bottles.jpg', 'assets/img/liulic/candles.jpg', 'assets/img/liulic/kiosk.jpg', 'assets/img/liulic/vase.jpg'] },
      intro: 'Welcome to the future of floristry. Liulic fuses nature’s beauty with cutting-edge technology as a pioneer in bioluminescent flowers. The identity had to glow: a luminous floral brandmark, a palette of midnight green, Persian green, rose red, white smoke and black, and mockups that imagine the brand in light.',
      blocks: [
        { type: 'full', src: 'assets/img/liulic/page-04.jpg', alt: 'The Liulic wordmark on deep green' },
        { type: 'pair', items: [
          { src: 'assets/img/liulic/page-05.jpg', alt: 'Liulic wordmark colour variations' },
          { src: 'assets/img/liulic/page-08.jpg', alt: 'Liulic floral brandmark variations' },
        ] },
        { type: 'full', src: 'assets/img/liulic/page-07.jpg', alt: 'Construction of the Liulic floral brandmark', caption: 'Brandmark' },
        { type: 'full', src: 'assets/img/liulic/page-10.jpg', alt: 'Liulic colour palette: midnight green, Persian green, rose red, white smoke, black', caption: 'Colour' },
        { type: 'pair', items: [
          { src: 'assets/img/liulic/page-11.jpg', alt: 'Midnight green and Persian green colour notes' },
          { src: 'assets/img/liulic/page-12.jpg', alt: 'Rose red, white smoke and black colour notes' },
        ] },
        { type: 'full', src: 'assets/img/liulic/page-14.jpg', alt: 'Liulic primary typeface specimen', caption: 'Typography' },
        { type: 'text', title: 'In bloom', body: 'Sustainability, creativity and excellence are the cornerstones of the brand. The mockups imagine Liulic in light: a neon-lit flower store, a glass kiosk, perfume bottles and candles that glow like the flowers themselves.' },
        { type: 'pair', ratio: '1 / 1', items: [
          { src: 'assets/img/liulic/store.jpg', alt: 'Round Liulic store interior lit with pink neon' },
          { src: 'assets/img/liulic/kiosk.jpg', alt: 'The Liulic glass flower kiosk on a city street' },
        ] },
        { type: 'pair', ratio: '1 / 1', items: [
          { src: 'assets/img/liulic/bottles.jpg', alt: 'Liulic perfume bottles with glowing flowers inside' },
          { src: 'assets/img/liulic/candles.jpg', alt: 'Liulic glass candles with the floral logo' },
        ] },
        { type: 'pair', items: [
          { src: 'assets/img/liulic/page-17.jpg', alt: 'Frosted acrylic Liulic card mockup' },
          { src: 'assets/img/liulic/page-18.jpg', alt: 'Holographic green Liulic envelope' },
        ] },
        { type: 'full', src: 'assets/img/liulic/page-20.jpg', alt: 'Frosted Liulic shopping bag mockup' },
      ],
    },
  ],
};
