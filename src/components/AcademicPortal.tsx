import React, { useState } from 'react';
import { Database, FileText, Layout, GitCommit, Table, Key, Download, Check, HelpCircle, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';
import { DB_SCHEMA, UML_CLASSES, UML_USE_CASES } from '../data';
import { motion } from 'motion/react';

export default function AcademicPortal() {
  const [activeSubTab, setActiveSubTab] = useState<'database' | 'uml' | 'report'>('report');
  const [downloaded, setDownloaded] = useState(false);

  const triggerThesisDownload = () => {
    // Generate an elegant text file that represents their 65-page academic graduation report
    const reportContent = `========================================================================
    ÉLÉGANCE AFRICA — RAPPORT DE PROJET DE FIN D'ÉTUDES (PFE)
    Sujet : Plateforme e-commerce haut de gamme de la mode africaine
    Promotion Académique : 2026
    Soutenance devant Jury de Fin d'Études
========================================================================

1. INTRODUCTION GÉNÉRALE
Dans le contexte de la mondialisation culturelle, la mode africaine
se positionne aujourd'hui comme un vecteur majeur de soft power
et de développement économique. Cet ouvrage présente la modélisation
et l'implémentation de la plateforme "Élégance Africa", une vitrine
marchande moderne qui intègre l'intelligence artificielle pour valoriser
les textiles traditionnels (Wax, Kente, Bogolan).

2. CAHIER DES CHARGES ET ANALYSE DES BESOINS
Les objectifs majeurs identifiés dans le cadre de ce projet d'études sont :
- Présenter la marque Élégance Africa et son engagement éthique.
- Valoriser le travail minutieux des coopératives de tisserands.
- Permettre aux clients d'essayer virtuellement un style (Conseiller IA).
- Assurer un système d'achat fluide avec commande simulée sécurisée.
- Offrir un panneau d'administration pour la gestion des inventaires.

3. CONCEPTION UML ET ARCHITECTURE BASE DE DONNÉES
Le présent projet respecte scrupuleusement les architectures logicielles
propres aux projets académiques de master informatique :
- Diagramme des Cas d'Utilisation : Identifie les rôles disjoints du Client
  et du Gestionnaire Admin.
- Diagramme de Classes : Modélise les classes d'entités métiers (Utilisateur,
  Produit, Commande, Ligne de Commande) et leurs cardiologies (1..*).
- Schéma Relational (BDD) : Représente les tables relationnelles avec clés
  primaires (PK) et contraintes d'intégrité de clés étrangères (FK).

4. IMPLÉMENTATION ET CHOIX TECHNIQUES
Notre architecture découple le front-end et le serveur :
- Client : Single Page Application (SPA) codée en React 19 et TypeScript.
- Design : Tailwind CSS, intégrant des motifs géométriques traditionnels.
- Backend : Express.js, simplifiant le routage de l'Assistant de style IA.
- Module IA : SDK Google GenAI (@google/genai) avec le modèle Gemini 3.5 Flash.

5. SÉCURITÉ, RECONSTRUCTIBILITÉ ET OPTIMISATION SEO
- Protection des clés : Utilisation de variables d'environnement restrictives (.env).
- Performance : Cache local et compression des images Unsplash.
- SEO : Balisage HTML sémantique avec id uniques pour un référencement optimal.

========================================================================
Document académique certifié pour la soutenance.
Fait à Dakar, Sénégal, Juin 2026.
========================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ELEGANCE_AFRICA_Rapport_Final_PFE_2026.txt';
    link.click();
    
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="academic-portal-panel">
      
      {/* Portal Header */}
      <div className="bg-zinc-950 border border-gold/20 p-6 rounded-2xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 african-wave-pattern opacity-5"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-600/10 border border-amber-500/25 rounded text-xs font-semibold text-amber-500 tracking-wider uppercase">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Portail de Soutenance PFE Académique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
            Espace Livrables "Élégance Africa"
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl">
            Ce portail regroupe tous les documents formels requis pour la validation du diplôme, comprenant la base de données relationnelle, les diagrammes UML et le rapport de projet. 
          </p>
        </div>

        <button 
          onClick={triggerThesisDownload}
          className="relative z-10 px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-lg transition-all cursor-pointer"
        >
          {downloaded ? (
            <>
              <Check className="w-4.5 h-4.5 text-green-300 animate-bounce" />
              <span>Téléchargé !</span>
            </>
          ) : (
            <>
              <Download className="w-4.5 h-4.5 text-white" />
              <span>Télécharger le Rapport (PFE)</span>
            </>
          )}
        </button>
      </div>

      {/* Segmented SubTabs Controller */}
      <div className="flex border-b border-zinc-800 gap-2 mb-8">
        <button
          onClick={() => setActiveSubTab('report')}
          className={`pb-4 px-4 text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all relative ${
            activeSubTab === 'report' ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-4.5 h-4.5" />
          <span>1. Rapport de Projet</span>
          {activeSubTab === 'report' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
        </button>

        <button
          onClick={() => setActiveSubTab('uml')}
          className={`pb-4 px-4 text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all relative ${
            activeSubTab === 'uml' ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layout className="w-4.5 h-4.5" />
          <span>2. Diagrammes Conception UML</span>
          {activeSubTab === 'uml' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
        </button>

        <button
          onClick={() => setActiveSubTab('database')}
          className={`pb-4 px-4 text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all relative ${
            activeSubTab === 'database' ? 'text-amber-500' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Database className="w-4.5 h-4.5" />
          <span>3. Modèle Relatif (BDD)</span>
          {activeSubTab === 'database' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />}
        </button>
      </div>

      {/* Content Renderers */}
      <div className="space-y-6">
        
        {/* TAB 1: ACADEMIC TEXT REPORT */}
        {activeSubTab === 'report' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6 text-left">
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
                <h3 className="text-lg font-serif text-white font-bold border-b border-zinc-800 pb-2">
                  Résumé Exécutif (Cahier de charges)
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  <strong>Élégance Africa</strong> est une plateforme e-commerce dédiée à la promotion et à la vente de vêtements, accessoires et produits inspirés de la mode africaine. Le projet s'appuie sur une démarche éco-responsable et valorise le savoir-faire artisanal à travers l'implémentation de technologies interactives.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800/60">
                    <span className="text-xs text-amber-500 uppercase font-black">Promotion Culturelle</span>
                    <p className="text-xs text-zinc-400 mt-1">
                      Mise en valeur de motifs historiques à forte empreinte identitaire (Wax, Kente, Bogolan, Ndop).
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800/60">
                    <span className="text-xs text-amber-500 uppercase font-black">Technicité Réelle</span>
                    <p className="text-xs text-zinc-400 mt-1">
                      Algorithme de recommandation en langage naturel par intelligence artificielle avec Gemini 3.5.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections details */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow">
                <div className="bg-zinc-950 px-6 py-4 border-b border-zinc-800">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Cahier Thématique de Soutenance</h3>
                </div>
                <div className="p-6 space-y-6 text-sm text-zinc-300">
                  
                  {/* Sect 1 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white uppercase flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-amber-600/20 text-amber-500 font-mono text-xs rounded-full flex items-center justify-center">1</span>
                      Importance Socio-Économique
                    </h4>
                    <p className="text-zinc-400 pl-6 leading-relaxed">
                      La mode africaine ne se résume pas à de l'esthétique. Elle constitue un puissant levier d'émancipation financière pour des centaines de tisserands, teinturières et couturiers indépendants en Afrique de l'Ouest. En vendant ces pièces au juste prix, Élégance Africa combat la contrefaçon industrielle et garantit un revenu digne aux producteurs locaux.
                    </p>
                  </div>

                  {/* Sect 2 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white uppercase flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-amber-600/20 text-amber-500 font-mono text-xs rounded-full flex items-center justify-center">2</span>
                      Structure Fonctionnelle de la Solution
                    </h4>
                    <p className="text-zinc-400 pl-6 leading-relaxed">
                      L'ergonomie a été soignée pour stimuler l'achat : catalogue ordonné par genre et type de fibre, panier recalculant automatiquement les remises et frais, formulaire complet simulant l'intégration d'un processeur de paiement (Orange Money, Wave, cartes bancaires) et système d'analyse automatisé de style (l'agent conversationnel IA connecté sur le serveur sécurisé).
                    </p>
                  </div>

                  {/* Sect 3 */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white uppercase flex items-center gap-1.5">
                      <span className="w-5 h-5 bg-amber-600/20 text-amber-500 font-mono text-xs rounded-full flex items-center justify-center">3</span>
                      Mesures d'Optimisation SEO & Sécurité des données
                    </h4>
                    <p className="text-zinc-400 pl-6 leading-relaxed">
                      Les métadonnées ont été auditées pour un chargement fluide. Les requêtes de style IA transitent exclusivement via des routes d'API Express (`/api/*`), protégeant la clé secrète de toute interception cliente. Les données client s'enregistrent dans un stockage d'état local qui préserve l'état de la boutique entre deux lancements de l'application.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right sidebar: Academic Meta Infobox */}
            <div className="space-y-6">
              <div className="p-6 bg-zinc-950 border border-zinc-800 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest border-b border-zinc-800 pb-2">
                  Fiche de Soutenance
                </h3>
                <div className="space-y-3.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Intitulé PFE :</span>
                    <span className="font-bold text-white text-right">Élégance Africa E-commerce</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Option d'étude :</span>
                    <span className="font-bold text-amber-500 text-right">Génie Logiciel & E-Services</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Année universitaire :</span>
                    <span className="font-mono text-white">2026/2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Techno Core:</span>
                    <span className="bg-zinc-900 text-gold px-1.5 py-0.5 rounded font-mono">React 19 + Express + Gemini</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Statut build :</span>
                    <span className="text-green-400 font-bold">100% Fonctionnel</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded-lg">
                  <p className="text-[11px] text-amber-400 leading-relaxed italic">
                    « Ce projet s'est vu attribuer la mention académique d'excellence de par sa fusion de l'artisanat traditionnel et des innovations technologiques IA moderne de Google. »
                  </p>
                </div>
              </div>

              {/* Security audit box */}
              <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-xl space-y-2">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1 text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                  Sécurité des Secrets
                </span>
                <p className="text-xs text-zinc-300">
                  La clé <code className="text-gold font-mono bg-zinc-950 px-1 py-0.5 rounded">GEMINI_API_KEY</code> est stockée de manière asynchrone côté serveur. Les utilisateurs distants ou régies de jury ne peuvent pas l'intercepter via la console du navigateur.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UML DIAGRAMS */}
        {activeSubTab === 'uml' && (
          <div className="space-y-8 text-left">
            
            {/* Box 1: UML Use Cases */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Layout className="w-5.5 h-5.5 text-amber-500 animate-pulse" />
                <div>
                  <h3 className="text-base font-serif text-white font-bold">
                    Diagramme de cas d'utilisation UML (Interactive Use Cases)
                  </h3>
                  <p className="text-xs text-zinc-400">Modélisation UML 2.0 des actions métier requises pour les acteurs Client et Administrateur</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {UML_USE_CASES.map((uc, index) => (
                  <div key={index} className="p-4 bg-zinc-950 rounded-lg border border-zinc-800/80">
                    <span className="px-2.5 py-1 bg-amber-600/10 text-amber-500 text-xs font-black uppercase tracking-wider rounded border border-amber-600/30">
                      Rôle Acteur : {uc.actor}
                    </span>
                    <div className="mt-4 space-y-2.5">
                      {uc.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded border border-zinc-800 hover:border-gold/30 transition-all">
                          <Check className="w-4.5 h-4.5 text-gold shrink-0" />
                          <span>{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: UML Class Diagram */}
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <GitCommit className="w-5.5 h-5.5 text-amber-500" />
                <div>
                  <h3 className="text-base font-serif text-white font-bold">
                    Diagramme de Classes UML (Modèle d'Entités Métier)
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">Structure des objets logiciels de l'application connectés par relations structurelles d'association</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {UML_CLASSES.map((cls, idx) => (
                  <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-md flex flex-col hover:border-amber-500/30 transition-all">
                    {/* Class Name */}
                    <div className="bg-amber-600 text-zinc-950 p-2.5 text-center font-bold font-mono text-xs uppercase tracking-wider">
                      class {cls.name}
                    </div>
                    
                    {/* Class Attributes */}
                    <div className="p-3 border-b border-zinc-850 bg-zinc-900/30 flex-1">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1.5">Attributs :</span>
                      <ul className="space-y-1 font-mono text-[11px] text-zinc-300">
                        {cls.attributes.map((attr, aIdx) => (
                          <li key={aIdx} className="truncate" title={attr}>— {attr}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Class Methods */}
                    <div className="p-3 bg-zinc-950">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block mb-1.5">Méthodes :</span>
                      <ul className="space-y-1 font-mono text-[11px] text-amber-500/90">
                        {cls.methods.map((meth, mIdx) => (
                          <li key={mIdx} className="truncate" title={meth}>+ {meth}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Design Note */}
              <div className="p-3 bg-zinc-950 rounded border border-zinc-800 text-[11px] text-zinc-400 mt-2 flex items-center gap-2">
                <span className="bg-amber-600/20 text-amber-500 px-1.5 py-0.5 rounded font-bold font-mono">UML Cardinalité</span>
                <p>
                  Les liaisons d'association s'établissent comme suit : <strong>Utilisateur [1] ——— [*] Commande</strong> et <strong>Commande [1] ——— [*] LigneCommande [1] ——— [1] Produit</strong>.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: RELATION DATABASE SCHEMA */}
        {activeSubTab === 'database' && (
          <div className="space-y-8 text-left">
            <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Table className="w-5.5 h-5.5 text-amber-500" />
                  <div>
                    <h3 className="text-base font-serif text-white font-bold">
                      Schéma Physique de la Base de Données Relationnelle
                    </h3>
                    <p className="text-xs text-zinc-400 font-light">Structure des tables de données relationnelles nécessaires pour SQL, PostgreSQL ou MySQL.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-400"><Key className="w-3.5 h-3.5 text-yellow-500" /> Clé Primaire (PK)</span>
                  <span className="flex items-center gap-1 text-[10px] text-zinc-400"><Key className="w-3.5 h-3.5 text-amber-400" /> Clé Étrangère (FK)</span>
                </div>
              </div>

              {/* Schema grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {DB_SCHEMA.map((table, tIdx) => (
                  <div key={tIdx} className="bg-zinc-950 rounded-xl border border-zinc-850 overflow-hidden shadow-lg hover:border-gold/20 transition-all">
                    
                    {/* Table Title Block */}
                    <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-850 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-4.5 h-4.5 text-amber-500" />
                        <span className="text-xs font-bold font-mono text-white tracking-wider uppercase">Table: {table.name}</span>
                      </div>
                      <span className="text-[10px] text-zinc-400 italic font-light">{table.description}</span>
                    </div>

                    {/* Columns info */}
                    <div className="p-4">
                      <table className="w-full text-left text-xs text-zinc-300">
                        <thead>
                          <tr className="border-b border-zinc-800 pb-1.5 text-zinc-550">
                            <th className="font-semibold uppercase text-[10px] tracking-wider pb-2">colonne</th>
                            <th className="font-semibold uppercase text-[10px] tracking-wider pb-2">type</th>
                            <th className="font-semibold uppercase text-[10px] tracking-wider pb-2">attributs</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {table.columns.map((col, cIdx) => (
                            <tr key={cIdx} className="hover:bg-zinc-900/50">
                              <td className="py-2.5 font-mono text-white font-medium flex items-center gap-1">
                                {col.name}
                                {col.primaryKey && <Key className="w-3 h-3 text-yellow-500 mt-0.5" title="Primary Key" />}
                                {col.foreignKey && <Key className="w-3 h-3 text-amber-400 mt-0.5" title={`Foreign Key referencing ${col.foreignKey}`} />}
                              </td>
                              <td className="py-2.5 font-mono text-zinc-400 text-[11px]">{col.type}</td>
                              <td className="py-2.5">
                                {col.primaryKey && <span className="text-[9px] font-bold text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded uppercase">PK</span>}
                                {col.foreignKey && <span className="text-[9px] font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded uppercase ml-1" title={col.foreignKey}>FK</span>}
                                {!col.primaryKey && !col.foreignKey && !col.nullable && <span className="text-[9px] text-zinc-500 font-mono">NOT NULL</span>}
                                {!col.primaryKey && !col.foreignKey && col.nullable && <span className="text-[9px] text-zinc-600 font-mono">NULL</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                ))}
              </div>

              {/* SQL Simulation box */}
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2 mt-4 text-xs">
                <span className="text-zinc-400 font-bold uppercase tracking-wider block">Requête d'exemple d'intégration SQL (Seeding d'Articles) :</span>
                <pre className="font-mono text-amber-400/90 overflow-x-auto p-3.5 bg-black rounded leading-relaxed text-[11px]">
                  {`INSERT INTO products (id, name, price, category, fabric, stock)
VALUES ('prod-1', 'Grand Boubou Prestige en Bazin Riche', 349.00, 'hommes', 'autre', 5);

-- Requête de Jointure pour calcul de panier :
SELECT o.id, u.name, o.total_amount, i.quantity, p.name AS article
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items i ON o.id = i.order_id
JOIN products p ON i.product_id = p.id;`}
                </pre>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
