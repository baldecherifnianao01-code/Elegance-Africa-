import { Product, BlogPost, DbTable, UmlClass, UmlUseCase } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Grand Boubou Prestige en Bazin Riche',
    description: 'Boubou traditionnel de haute couture brodé main sur tissu bazin teinté artisanalement. Une pièce historique d\'une élégance inégalée pour les grandes occasions.',
    price: 349,
    category: 'hommes',
    images: ['/src/assets/images/elegance_black_gold_1781364251280.jpg'], // Elegant black and gold couple look
    fabric: 'autre',
    stock: 5,
    sizes: ['M', 'L', 'XL', 'XXL'],
    features: ['100% Bazin Riche authentique', 'Broderies or réalisées à la main', 'Teinture naturelle antiallergique', 'Nettoyage à sec uniquement']
  },
  {
    id: 'prod-2',
    name: 'Robe Impératrice en Wax Royal',
    description: 'Une superbe robe longue et ajustée qui épouse élégamment la silhouette, finie par des volants volumineux. Fabriquée dans un Wax Hollandais pur coton de qualité supérieure.',
    price: 189,
    category: 'femmes',
    images: ['/src/assets/images/elegance_banner_1_1781364218592.jpg'], // Gorgeous couple with gold/black and tan outfits
    fabric: 'wax',
    stock: 7,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['100% Coton Wax Hollandais', 'Couleurs vibrantes longue durée', 'Fermeture éclair invisible au dos', 'Doublure intérieure en satin souple']
  },
  {
    id: 'prod-3',
    name: 'Veste Croisée en Kenté Impérial',
    description: 'Blazer moderne ajusté pour hommes, rehaussé de revers et de poches en tissage Kenté traditionnel fait main au Ghana. Une fusion parfaite de tradition et de modernité.',
    price: 220,
    category: 'hommes',
    images: ['/src/assets/images/elegance_white_prestige_1781364265136.jpg'], // Elegant male model in prestigious white embroidered traditional attire
    fabric: 'kente',
    stock: 8,
    sizes: ['M', 'L', 'XL'],
    features: ['Tissu Kenté authentique tissé à la main', 'Coupe ajustée premium', 'Poches intérieures doublées', 'Boutons en nacre fine']
  },
  {
    id: 'prod-4',
    name: 'Manteau d\'Artiste en Bogolan du Mali',
    description: 'Manteau long mi-saison en tissu Bogolan authentique, décoré de symboles géométriques traditionnels tracés à l\'argile fermentée selon les techniques ancestrales.',
    price: 275,
    category: 'femmes',
    images: ['/src/assets/images/elegance_banner_2_1781364238702.jpg'], // Elegant group of 4 models
    fabric: 'bogolan',
    stock: 4,
    sizes: ['S', 'M', 'L'],
    features: ['Bogolan authentique du Mali', 'Teinture artisanale terre et feuilles de bouleau africain', 'Motifs géométriques symboliques', 'Poches latérales confortables']
  },
  {
    id: 'prod-5',
    name: 'Robe de Cérémonie en Wax Royal Doré',
    description: 'Une somptueuse robe évasée ornée de motifs royaux floraux et d’élégantes finitions à l’or fin. Conçue spécialement pour sublimer les silhouettes lors de réceptions prestigieuses.',
    price: 199,
    category: 'femmes',
    images: ['/src/assets/images/elegance_banner_1_1781364218592.jpg'], // Gorgeous couple with gold/black and tan outfits
    fabric: 'wax',
    stock: 12,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: ['Tissu Wax soyeux de grande qualité', 'Détails brodés à l’or fin', 'Coupe ajustée confortable', 'Nettoyage professionnel recommandé']
  },
  {
    id: 'prod-6',
    name: 'Chemise Légère motif Dashiki',
    description: 'Chemise décontractée à col mao pour hommes et femmes, arborant les ornements floraux géométriques caractéristiques du Dashiki. Très agréable en été ou climat chaud.',
    price: 85,
    category: 'hommes', // Unisex but under men category primarily
    images: ['/src/assets/images/elegance_banner_2_1781364238702.jpg'], // Prestige group of 4 models in elegant African luxury wear
    fabric: 'dashiki',
    stock: 15,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Tissu Dashiki léger et respirant', 'Fermeture boutons discrets', 'Col officier classique', 'Idéal pour un style chic et relax']
  },
  {
    id: 'prod-7',
    name: 'Parure de Bijoux Impériaux en Or',
    description: 'Ensemble collier d\'art et ornements dorés d’or fin, inspiré par l\'esthétique raffinée des cours impériales africaines. Une création de joaillerie royale par excellence.',
    price: 110,
    category: 'accessoires',
    images: ['/src/assets/images/elegance_black_gold_1781364251280.jpg'], // Luxurious design details
    fabric: 'autre',
    stock: 6,
    sizes: ['Unique'],
    features: ['Finition dorée brillante haute qualité', 'Attaches hypoallergéniques sécurisées', 'Inspiré d\'ornements d\'apparat traditionnels', 'Fait main à Casablanca']
  },
  {
    id: 'prod-8',
    name: 'Pochette de Soirée Prestige en Cuir & Broderie',
    description: 'Une somptueuse pochette de bal confectionnée en cuir pleine fleur, mise en beauté par une fine broderie au fil de soie or et des motifs traditionnels discrets.',
    price: 195,
    category: 'accessoires',
    images: ['/src/assets/images/elegance_white_prestige_1781364265136.jpg'], // High fashion accessory style look
    fabric: 'autre',
    stock: 4,
    sizes: ['Moyen (32x20cm)'],
    features: ['Cuir pleine fleur d\'une grande souplesse', 'Broderies or réalisées à la main', 'Chaînette de transport dorée amovible', 'Intérieur doublé satin noir de jais']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'L\'odyssée du Wax : Du Batik javanais aux cours de stylisme africain',
    summary: 'Découvrez comment une technique d\'impression hollandaise inspirée de l\'art javanais a conquis le cœur de l\'Afrique de l\'Ouest pour en devenir l\'emblème textile suprême.',
    content: `Le tissu Wax, aujourd'hui symbole incontournable de la mode et de l'identité africaine, possède une histoire fascinante et hautement cosmopolite.\n\n### Origines : Le voyage des Indes\nÀ l'origine, les colons hollandais se sont inspirés de la technique du batik artisanal de l'île de Java (Indonésie) au milieu du XIXe siècle. Désirant industrialiser et commercialiser ce procédé de réserve à la cire (wax), ils créent des usines de production mécanisée en Hollande. Le succès n'est pas immédiat en Asie, mais la mayonnaise prend de façon fulgurante sur les côtes africaines.\n\n### L'ancrage ouest-africain\nLorsqu'il débarque dans les ports de l'Afrique de l'Ouest (notamment à Accra et Lomé), le wax rencontre un enthousiasme immédiat. Les femmes commerçantes, affectueusement appelées les "Nana Benz", flairent la tendance et négocient les monopoles de vente. Elles attribuent des noms uniques et poétiques à chaque motif ("Si tu sors, je sors", "Mon mari est capable", "L'œil de ma rivale"), transformant ce produit en un langage visuel puissant, vecteur d'affirmation sociale, matrimoniale et politique.\n\n### Un levier d'expression contemporain\nAujourd'hui, le Wax se réinvente. S'il demeure le pagne des cérémonies, les jeunes designers africains et de la diaspora (comme Imane Ayissi ou Lamine Kouyaté) le déstructurent pour en faire des blazers, des robes de grand couturier et du prêt-à-porter urbain de prestige, l'imposant sur les podiums de Paris, Milan et New York.`,
    image: '/src/assets/images/elegance_banner_1_1781364218592.jpg', // Gorgeous couple with gold/black and tan outfits
    category: 'Histoire',
    date: '10 juin 2026',
    author: 'Amara Diop',
    readingTime: '5 min'
  },
  {
    id: 'blog-2',
    title: 'La toile Kente : Le tissage de la royauté ghanéenne',
    summary: 'Chaque ligne, chaque couleur raconte un proverbe. Plongez dans les secrets de fabrication du tissu des rois Ashantis.',
    content: `Le Kenté est un tissu royal ghanéen fabriqué par le peuple Ashanti et Ewe. Tissé à partir de bandes de soie et de coton sur des métiers à tisser manuels traditionnels, il n'était porté à l'origine que par les rois et les dignitaires importants de l'État pour des rituels solennels.\n\n### Le sens profond des couleurs\nContrairement à d'autres imprimés, le Kente n'est pas dessiné mais structurellement tissé. Le choix des pigments revêt une dimension spirituelle :\n- **L'Or / Jaune** : Symbolise la richesse matérielle, la royauté, l'élévation spirituelle et la fertilité.\n- **Le Noir** : Représente la maturité spirituelle, le lien avec les ancêtres et les forces occultes bénéfiques.\n- **Le Rouge** : Évoque le sang des ancêtres, les sacrifices des guerriers et la force politique.\n- **Le Vert** : Signifie la croissance, l'harmonie, la terre fertile et le renouveau.\n\n### Une technique d'une complexité extrême\nLe tisserand accompli manipule ses navettes avec une agilité hypnotique. Il faut parfois plusieurs mois à un artisan pour tisser une seule pièce de Kente digne d'un chef d'État. Aujourd'hui, le Kente est vénéré internationalement comme l'icône du panafricanisme et de l'excellence intellectuelle – il est d'ailleurs fièrement déposé sur les épaules des diplômés d'universités occidentales et africaines lors des cérémonies de remise des prix.`,
    image: '/src/assets/images/elegance_banner_2_1781364238702.jpg', // Prestige group of 4 models in elegant African luxury wear
    category: 'Artisanat',
    date: '5 juin 2026',
    author: 'Kwame Mensah',
    readingTime: '7 min'
  },
  {
    id: 'blog-3',
    title: 'Le Bogolanfini malien : Le secret de la peinture sur terre fermentée',
    summary: 'Découvrez comment les artisans du Mali utilisent la boue enrichie et l\'extrait de feuilles d\'arbres pour dessiner des symboles géométriques protecteurs.',
    content: `Originaire du Mali, plus particulièrement de la communauté Bamana, le Bogolanfini (mieux connu sous le nom générique de "Bogolan") signifie littéralement "fait avec de la terre" en langue bambara.\n\n### La chimie naturelle de la forêt\nLe processus de création du Bogolan est un miracle de chimie naturelle et d'observation écologique :\n1. **Le Tissage** : Des bandes de coton écru filé main sont assemblées pour former une grande pièce de tissu.\n2. **La Décoction** : Le tissu est trempé dans une feuille de bouleaux africains ("n\'galama") broyées et bouillies. Cette étape confère au tissu une belle couleur jaune foncé et agit comme un mordant chimique naturel.\n3. **La Peinture à l'Argile** : L'artisan dessine des motifs complexes avec de la boue fermentée de couleur sombre tirée du lit des rivières. Une réaction chimique s'opère entre l'acide tannique fixé par le n'galama et l'oxyde de fer de l'argile, créant une splendide couleur noire indélébile.\n4. **Le Blanchiment** : Le jaune excédentaire est rincé ou décoloré au savon de Marseille ou au chlore doux pour révéler des dessins blancs d'une précision mathématique sur fond noir sombre.\n\n### Les symboles : Code moral et social\nL'analyse des formes montre qu'elles ne sont pas seulement esthétiques. Chaque flèche, chaque point, chaque damier représente un code de conduite, une mise en garde ou une bénédiction pour la femme enceinte, le chasseur ou le jeune marié qui le porte. Le bogolan s'adresse ainsi à l'esprit autant qu'à l'œil de celui qui l'observe.`,
    image: '/src/assets/images/elegance_black_gold_1781364251280.jpg', // Elegant black and gold couple look
    category: 'Éco-Mode',
    date: '28 mai 2026',
    author: 'Fanta Keïta',
    readingTime: '6 min'
  }
];

export const UML_USE_CASES: UmlUseCase[] = [
  {
    actor: 'Utilisateur / Client',
    useCases: [
      'Consulter la vitrine de la marque élégante',
      'Parcourir et filtrer le catalogue (catégories, tissus)',
      'Consulter les fiches produits détaillées',
      'Ajouter des articles stylisés au panier d\'achat',
      'Consulter le Blog mode & culture',
      'Discuter avec le conseiller en style IA',
      'Passer une commande simulée (Paiement sécurisé)',
      'S\'inscrire / S\'authentifier au site'
    ]
  },
  {
    actor: 'Administrateur',
    useCases: [
      'Gérer le catalogue (Créer, Lire, Mettre à jour, Supprimer les produits)',
      'Suivre, modifier et valider les commandes clients',
      'Visualiser l\'état du stock et les transactions du site',
      'Consulter la liste générale des utilisateurs enregistrés'
    ]
  }
];

export const UML_CLASSES: UmlClass[] = [
  {
    name: 'Utilisateur',
    attributes: [
      'id: String',
      'nom: String',
      'email: String',
      'motDePasseHash: String',
      'telephone: String',
      'role: Enum {Client, Admin}'
    ],
    methods: [
      'creerCompte()',
      'seConnecter()',
      'mettreAjourProfil()'
    ]
  },
  {
    name: 'Produit',
    attributes: [
      'id: String',
      'nom: String',
      'description: String',
      'prix: Decimal',
      'categorie: String',
      'tissu: String',
      'tailleDisponibles: List<String>',
      'stock: Integer',
      'imageUrls: List<String>'
    ],
    methods: [
      'calculerPrixReduit()',
      'retirerDuStock(qte: Integer)',
      'ajouterAuStock(qte: Integer)'
    ]
  },
  {
    name: 'Commande',
    attributes: [
      'id: String',
      'client_id: StringKey',
      'montantTotal: Decimal',
      'adresseLivraison: String',
      'moyenPaiement: String',
      'statusEffectif: String',
      'dateCreation: DateTime'
    ],
    methods: [
      'validerPaiement()',
      'genererFacture()',
      'changerStatus(nouveauStatus: String)'
    ]
  },
  {
    name: 'LigneCommande',
    attributes: [
      'id: String',
      'commande_id: StringKey',
      'produit_id: StringKey',
      'quantiteCommande: Integer',
      'prixUnitaire: Decimal',
      'tailleSelectionnee: String'
    ],
    methods: [
      'calculerSousTotal(): Decimal'
    ]
  }
];

export const DB_SCHEMA: DbTable[] = [
  {
    name: 'users',
    description: 'Stocke les comptes des clients et des administrateurs',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', primaryKey: true },
      { name: 'name', type: 'VARCHAR(100)', nullable: false },
      { name: 'email', type: 'VARCHAR(150)', nullable: false },
      { name: 'password_hash', type: 'VARCHAR(255)', nullable: false },
      { name: 'role', type: 'VARCHAR(20)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    name: 'products',
    description: 'Contient l\'inventaire des vêtements, accessoires et produits africains',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', primaryKey: true },
      { name: 'name', type: 'VARCHAR(150)', nullable: false },
      { name: 'description', type: 'TEXT' },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'category', type: 'VARCHAR(50)', nullable: false },
      { name: 'fabric', type: 'VARCHAR(50)' },
      { name: 'stock', type: 'INT', nullable: false },
      { name: 'sizes', type: 'VARCHAR(255)' },
      { name: 'image_urls', type: 'TEXT' }
    ]
  },
  {
    name: 'orders',
    description: 'Enregistre les transactions et détails de livraison',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', primaryKey: true },
      { name: 'user_id', type: 'VARCHAR(50)', foreignKey: 'users.id' },
      { name: 'customer_name', type: 'VARCHAR(100)', nullable: false },
      { name: 'customer_email', type: 'VARCHAR(150)', nullable: false },
      { name: 'shipping_address', type: 'TEXT', nullable: false },
      { name: 'phone', type: 'VARCHAR(25)', nullable: false },
      { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'payment_method', type: 'VARCHAR(50)', nullable: false },
      { name: 'status', type: 'VARCHAR(30)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  },
  {
    name: 'order_items',
    description: 'Table d\'association liant chaque commande aux produits spécifiques et à leurs attributs achetés',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', primaryKey: true },
      { name: 'order_id', type: 'VARCHAR(50)', foreignKey: 'orders.id' },
      { name: 'product_id', type: 'VARCHAR(50)', foreignKey: 'products.id' },
      { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
      { name: 'quantity', type: 'INT', nullable: false },
      { name: 'selected_size', type: 'VARCHAR(10)' }
    ]
  },
  {
    name: 'blog_posts',
    description: 'Contient les publications éducatives sur la culture et les tendances',
    columns: [
      { name: 'id', type: 'VARCHAR(50)', primaryKey: true },
      { name: 'title', type: 'VARCHAR(200)', nullable: false },
      { name: 'summary', type: 'TEXT' },
      { name: 'content', type: 'TEXT', nullable: false },
      { name: 'category', type: 'VARCHAR(50)' },
      { name: 'author', type: 'VARCHAR(100)' },
      { name: 'created_at', type: 'DATE' },
      { name: 'image_url', type: 'VARCHAR(255)' }
    ]
  }
];
