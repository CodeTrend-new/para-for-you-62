export type Category = {
  slug: string;
  name: string;
  description: string;
  emoji: string;
};

export const categories: Category[] = [
  { slug: "visage", name: "Soins Visage", description: "Sérums, crèmes et nettoyants pour une peau éclatante", emoji: "✿" },
  { slug: "corps", name: "Soins Corps", description: "Hydratation, gommages et huiles précieuses", emoji: "❀" },
  { slug: "cheveux", name: "Cheveux", description: "Shampooings, masques et soins capillaires experts", emoji: "✾" },
  { slug: "solaire", name: "Solaire", description: "Protection SPF & after-sun pour toutes peaux", emoji: "☀" },
  { slug: "bebe", name: "Bébé & Maman", description: "Douceur et sécurité pour les plus petits", emoji: "♡" },
  { slug: "complements", name: "Compléments", description: "Vitamines & nutricosmétiques bien-être", emoji: "✦" },
  { slug: "hygiene", name: "Hygiène", description: "Essentiels d'hygiène quotidienne premium", emoji: "✧" },
  { slug: "minceur", name: "Minceur", description: "Programmes silhouette & détox", emoji: "❋" },
];

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: "Nouveau" | "Best-seller" | "Promo" | "Bio";
  description: string;
  ingredients: string;
  usage: string;
  gradient: string;
};

export const products: Product[] = [
  { id: "p1", name: "Sérum Vitamine C Éclat", brand: "La Roche-Posay", category: "visage", price: 289, oldPrice: 349, rating: 4.8, reviews: 142, badge: "Best-seller",
    description: "Un sérum concentré qui illumine le teint et atténue les taches pigmentaires en 4 semaines.",
    ingredients: "Vitamine C 10%, Acide Hyaluronique, Niacinamide, Glycérine végétale.",
    usage: "Appliquer matin et/ou soir sur peau propre avant la crème hydratante.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.85 0.09 25))" },
  { id: "p2", name: "Crème Hydratante Cica", brand: "Avène", category: "visage", price: 189, rating: 4.7, reviews: 98, badge: "Nouveau",
    description: "Réparation intense pour peaux sensibles et irritées, texture fondante.",
    ingredients: "Centella Asiatica, Eau Thermale Avène, Beurre de Karité.",
    usage: "Matin et soir sur visage et cou parfaitement nettoyés.",
    gradient: "linear-gradient(135deg, oklch(0.9 0.05 145), oklch(0.92 0.04 25))" },
  { id: "p3", name: "Huile Précieuse Argan", brand: "Nuxe", category: "corps", price: 320, rating: 4.9, reviews: 215, badge: "Bio",
    description: "Huile sèche multi-usages corps, visage et cheveux à l'argan bio du Maroc.",
    ingredients: "Huile d'Argan Bio, Huile de Macadamia, Vitamine E.",
    usage: "Quelques gouttes sur peau humide ou cheveux pour un effet glow.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.13 80), oklch(0.78 0.1 50))" },
  { id: "p4", name: "Shampooing Réparateur Kératine", brand: "Klorane", category: "cheveux", price: 145, oldPrice: 175, rating: 4.6, reviews: 87, badge: "Promo",
    description: "Restaure la fibre capillaire et apporte brillance dès la première utilisation.",
    ingredients: "Kératine végétale, Quinoa, Huile d'Avocat.",
    usage: "Masser le cuir chevelu, laisser poser 2 minutes, rincer abondamment.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.06 280), oklch(0.88 0.05 320))" },
  { id: "p5", name: "Crème Solaire SPF 50+ Invisible", brand: "Bioderma", category: "solaire", price: 235, rating: 4.8, reviews: 176, badge: "Best-seller",
    description: "Protection très haute, fini invisible, résistante à l'eau et à la sueur.",
    ingredients: "Filtres minéraux + organiques, Vitamine E, Eau thermale.",
    usage: "Appliquer généreusement 20 minutes avant l'exposition, renouveler toutes les 2h.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.1 90), oklch(0.88 0.09 60))" },
  { id: "p6", name: "Liniment Oléo-Calcaire Bio", brand: "Mustela", category: "bebe", price: 98, rating: 4.9, reviews: 312, badge: "Bio",
    description: "Nettoie et protège les fesses de bébé en douceur, certifié bio.",
    ingredients: "Huile d'olive vierge bio, Eau de chaux.",
    usage: "Imbiber un coton, nettoyer les fesses, ne pas rincer.",
    gradient: "linear-gradient(135deg, oklch(0.92 0.04 25), oklch(0.95 0.03 80))" },
  { id: "p7", name: "Collagène Marin Beauté", brand: "Arkopharma", category: "complements", price: 285, oldPrice: 340, rating: 4.5, reviews: 64, badge: "Promo",
    description: "Complément nutricosmétique pour la fermeté de la peau et la brillance des cheveux.",
    ingredients: "Collagène marin hydrolysé 5g, Vitamine C, Zinc, Acide hyaluronique.",
    usage: "1 stick par jour dilué dans un grand verre d'eau, le matin.",
    gradient: "linear-gradient(135deg, oklch(0.85 0.09 25), oklch(0.82 0.08 15))" },
  { id: "p8", name: "Gel Douche Fleur de Coton", brand: "Le Petit Marseillais", category: "hygiene", price: 65, rating: 4.4, reviews: 220,
    description: "Lavant doux pH neutre, parfum délicat fleur de coton, format familial.",
    ingredients: "Extrait de coton, Glycérine, Base lavante douce.",
    usage: "Faire mousser sur peau humide, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.95 0.02 145), oklch(0.92 0.04 25))" },
  { id: "p9", name: "Masque Argile Verte Purifiant", brand: "Cattier", category: "visage", price: 89, rating: 4.7, reviews: 134, badge: "Bio",
    description: "Absorbe l'excès de sébum et resserre les pores en 10 minutes.",
    ingredients: "Argile verte montmorillonite, Aloe vera bio.",
    usage: "Couche fine 1 à 2 fois par semaine, laisser poser 10 min, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.08 145), oklch(0.7 0.07 150))" },
  { id: "p10", name: "Patchs Yeux Rose & Or", brand: "Talika", category: "visage", price: 220, rating: 4.6, reviews: 78, badge: "Nouveau",
    description: "Anti-cernes et anti-poches, action immédiate avec extrait de rose et particules d'or.",
    ingredients: "Extrait de rose, Or colloïdal, Acide hyaluronique.",
    usage: "Appliquer sous les yeux, laisser poser 15 minutes 2-3 fois par semaine.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.08 25), oklch(0.85 0.1 60))" },
  { id: "p11", name: "Brûleur Naturel Thé Vert", brand: "Forté Pharma", category: "minceur", price: 195, rating: 4.3, reviews: 56,
    description: "Action coup de pouce minceur grâce aux actifs végétaux brûle-graisses.",
    ingredients: "Thé vert, Guarana, Caféine naturelle, Chrome.",
    usage: "2 gélules le matin avec un grand verre d'eau pendant 30 jours.",
    gradient: "linear-gradient(135deg, oklch(0.78 0.1 145), oklch(0.7 0.09 130))" },
  { id: "p12", name: "Masque Capillaire Karité Profond", brand: "René Furterer", category: "cheveux", price: 245, rating: 4.8, reviews: 102, badge: "Best-seller",
    description: "Nutrition intense pour cheveux secs et abîmés, brillance miroir.",
    ingredients: "Beurre de Karité, Huile d'Argan, Provitamine B5.",
    usage: "Sur cheveux humides, laisser poser 5 minutes, rincer.",
    gradient: "linear-gradient(135deg, oklch(0.88 0.06 60), oklch(0.85 0.07 40))" },
];

export const brands = [
  "La Roche-Posay", "Avène", "Nuxe", "Bioderma", "Vichy", "Mustela",
  "Klorane", "Caudalie", "Eucerin", "Filorga", "Talika", "René Furterer",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  { slug: "routine-eclat-peau", title: "5 étapes essentielles pour une peau éclatante au naturel", excerpt: "Découvrez la routine experte de nos pharmaciens pour révéler la luminosité de votre teint sans surcharger votre peau.", category: "Visage", readTime: "6 min", date: "12 Avril 2026" },
  { slug: "proteger-soleil-maroc", title: "Protection solaire : nos conseils pour le climat marocain", excerpt: "SPF, textures, gestes : tout ce qu'il faut savoir pour préserver votre peau du soleil méditerranéen.", category: "Solaire", readTime: "4 min", date: "5 Avril 2026" },
  { slug: "huile-argan-bienfaits", title: "L'huile d'argan, l'or liquide du Maroc décrypté", excerpt: "Bienfaits, mode d'emploi et faux amis : notre guide complet de l'ingrédient star.", category: "Corps", readTime: "5 min", date: "28 Mars 2026" },
  { slug: "soin-bebe-douceur", title: "Soin de bébé : choisir des produits sûrs et efficaces", excerpt: "Les critères à connaître absolument et les ingrédients à éviter pour la peau fragile des nourrissons.", category: "Bébé", readTime: "7 min", date: "20 Mars 2026" },
];
