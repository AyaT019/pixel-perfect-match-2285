// ============================================================
// INFORMATIONS DE L'ENTREPRISE — à personnaliser ici uniquement
// ============================================================
import demoPanel from "@/assets/demo-panel.jpg";
import demoWiring from "@/assets/demo-wiring.jpg";
import demoLighting from "@/assets/demo-lighting.jpg";
import heroImg from "@/assets/hero.jpg";

export const business = {
  name: "Ahmed Zouari",
  tagline: "Électricité bâtiment en Tunisie",
  // Numéro affiché (laisser "" pour afficher un avertissement de configuration)
  phoneDisplay: "+216 50 405 403",
  // Format international sans "+" ni espaces, ex : "21620123456"
  whatsapp: "21650405403",
  email: "ahmed0404@gmail.com",
  address: "Cité Riadh, Kélibia 8090, Tunisie",
  serviceArea: "Kélibia (8090) et sa région, Tunisie",
  // Page Facebook : coller ici le lien exact de la page (facebook.com/…)
  facebookUrl: "",
  whatsappMessage:
    "Bonjour, je vous contacte depuis votre site web pour demander un devis en électricité bâtiment.",
};

export const hasPhone = () => business.phoneDisplay.trim() !== "";
export const hasWhatsapp = () => /^\d{8,15}$/.test(business.whatsapp);
export const hasFacebook = () => /^https?:\/\/([\w-]+\.)*facebook\.com\//i.test(business.facebookUrl.trim());
export const whatsappLink = (message = business.whatsappMessage) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;

export type IconName = "home" | "panel" | "cable" | "light" | "renovation" | "repair";

// Supprimez les services non proposés
export const services: { icon: IconName; title: string; description: string }[] = [
  { icon: "home", title: "Installation électrique résidentielle", description: "Installations complètes pour maisons, villas et appartements, pensées pour votre confort et votre sécurité." },
  { icon: "panel", title: "Tableaux électriques et distribution", description: "Pose, mise en conformité et organisation claire de vos tableaux et circuits de distribution." },
  { icon: "cable", title: "Câblage et raccordements", description: "Passage de câbles, raccordements et prises réalisés avec soin et selon les bonnes pratiques." },
  { icon: "light", title: "Éclairage intérieur et extérieur", description: "Mise en valeur de vos espaces : spots encastrés, rubans LED, appliques et éclairage de jardin." },
  { icon: "renovation", title: "Rénovation électrique", description: "Remise à neuf d'installations anciennes pour un logement plus sûr et adapté à vos usages actuels." },
  { icon: "repair", title: "Dépannage électrique", description: "Diagnostic et intervention en cas de panne, coupure ou dysfonctionnement de votre installation." },
];

// Projets de DÉMONSTRATION — remplacez par les vraies photos et descriptions
export const projects = [
  { image: demoPanel, title: "Tableau électrique d'appartement", category: "Tableaux électriques", location: "[Ville]", description: "Exemple de présentation : organisation d'un tableau avec circuits identifiés.", demo: true, tall: false },
  { image: demoLighting, title: "Éclairage d'un salon", category: "Éclairage", location: "[Ville]", description: "Exemple de présentation : éclairage indirect et spots encastrés.", demo: true, tall: true },
  { image: demoWiring, title: "Raccordements en rénovation", category: "Câblage", location: "[Ville]", description: "Exemple de présentation : raccordements dans une boîte de dérivation.", demo: true, tall: false },
  { image: heroImg, title: "Mise en place d'une distribution", category: "Installation résidentielle", location: "[Ville]", description: "Exemple de présentation : câblage d'une armoire de distribution.", demo: true, tall: false },
];
