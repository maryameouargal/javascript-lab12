// PARTIE 1— Introduction à la POO et aux classes
console.log("=== Partie 1 ==="); 

//Exercice 1.1
console.log("Exercice 1.1 :");
class Personne {
  constructor(prenom, nom) {
    this.prenom = prenom;  
    this.nom = nom;
  }
  
  nomComplet() {  
    return `${this.prenom} ${this.nom}`;
  }
}


const p1 = new Personne("Lina", "Durand");
const p2 = new Personne("Amar", "Kaci");

console.log(p1.nomComplet()); 
console.log(p2.nomComplet()); 

//Exercice 1.2
console.log("Exercice 1.2 :");
class Compteur {
  static nbInstances = 0; 
  #val = 0;                 
  
  constructor(initial = 0) {
    this.#val = initial;
    Compteur.nbInstances++;  
  }
  
  inc() { 
    this.#val++; 
  }
  

  get valeur() { 
    return this.#val; 
  }
  
 
  set valeur(v) { 
    if (Number.isInteger(v)) this.#val = v; 
  }
}

const c1 = new Compteur(1);
const c2 = new Compteur();

c1.inc();
console.log(c1.valeur);          
console.log(Compteur.nbInstances);

//Partie 2 — Principes POO (E, A, H, P)
console.log("=== Partie 2 ===");

//Exercice 2.1
console.log("Exercice 2.1 :");

class CompteBancaire {
  #solde = 0;  
  
  constructor(soldeInitial = 0) {

    if (soldeInitial < 0) throw new Error("Solde initial invalide");
    this.#solde = soldeInitial;
  }
  
  
  crediter(montant) { 
    if (montant > 0) this.#solde += montant; 
  }
  
  debiter(montant) {
    
    if (montant <= 0) return;
    if (montant > this.#solde) throw new Error("Fonds insuffisants");
    this.#solde -= montant;
  }
  
  
  get solde() { 
    return this.#solde; 
  }
}


const cb = new CompteBancaire(100);
cb.debiter(30);
console.log(cb.solde); 

// Partie 3 — Constructeurs et paramètres par défaut
console.log("=== Partie 3 ===");

//Exercice 3.1 
console.log("Exercice 3.1 :");

class Article {
  
  constructor({ titre = "(Sans titre)", prix = 0, stock = 0 } = {}) {
    
    if (prix < 0 || stock < 0) throw new Error("Valeurs invalides");
    
    this.titre = titre;
    this.prix = prix;
    this.stock = stock;
  }
  
  enStock() { 
    return this.stock > 0; 
  }
}

// Le 'r' a été supprimé ici
const a = new Article({ 
  titre: "Stylo", 
  prix: 1.2, 
  stock: 10 
});

const b = new Article();  
const c = new Article({ titre: "Cahier" });  
const d = new Article({ titre: "Gomme", prix: 0.5 });  

console.log(a.enStock());  
console.log(b.titre);      
console.log(b.enStock());  
console.log(c);

// Partie 4 — Héritage et polymorphisme
console.log("=== Partie 4 ===");

//Exercice 4.1
console.log("Exercice 4.1 ");


class Animal {
  constructor(nom) { 
    this.nom = nom; 
  }
  
  parler() { 
    return `${this.nom} fait un bruit.`; 
  }
}

// Sous-classe Chien qui hérite d'Animal
class Chien extends Animal {
  parler() { 
    return `${this.nom} aboie.`; 
  }
}

// Sous-classe Chat qui hérite d'Animal
class Chat extends Animal {
  parler() { 
    return `${this.nom} miaule.`; 
  }
}

const animaux = [
  new Chien("Rex"), 
  new Chat("Mina"),
  new Chien("Max"),
  new Chat("Félix")
];

for (const a of animaux) {
  console.log(a.parler());  // Chaque animal parle à sa façon
}

// Exercice 4.2
console.log("Exercice 4.2 :");

class Vehicule {
  constructor(marque) { 
    this.marque = marque; 
  }
  
  info() { 
    return `Véhicule ${this.marque}`; 
  }
}

class Voiture extends Vehicule {
  constructor(marque, portes = 4) {
    super(marque);
    this.portes = portes;
  }
  
  info() { 
    return `${super.info()} avec ${this.portes} portes`; 
  }
}

class Moto extends Vehicule {
  constructor(marque, type = "sportive") {
    super(marque);
    this.type = type;
  }
  
  info() {
    return `${super.info()} de type ${this.type}`;
  }
  

  faireWheelie() {
    return `${this.marque} fait un wheelie !`;
  }
}


const voiture1 = new Voiture("Renault", 5);
const voiture2 = new Voiture("Peugeot");  
const moto1 = new Moto("Yamaha", "custom");
const moto2 = new Moto("Honda"); 

console.log(voiture1.info());  
console.log(voiture2.info());  
console.log(moto1.info());    
console.log(moto2.faireWheelie());

// Partie 5 — Créer, concevoir et composer des classes
console.log("=== Partie 5 ===");

// Exercice 5.1
console.log("Exercice 5.1 ");

class Panier {
  constructor() { 
    this.lignes = [];  
  }
  
  ajouter(article, quantite = 1) {
    const exist = this.lignes.find(l => l.article === article);
    
    if (exist) {
      exist.qte += quantite; 
    } else {
      this.lignes.push({ article, qte: quantite });  
    }
  }
  
  retirer(article, quantite = 1) {
    const index = this.lignes.findIndex(l => l.article === article);
    if (index === -1) return;
    
    if (this.lignes[index].qte <= quantite) {
      this.lignes.splice(index, 1);
    } else {
      this.lignes[index].qte -= quantite;
    }
  }
  
  total() { 
    return this.lignes.reduce((somme, ligne) => 
      somme + (ligne.article.prix * ligne.qte), 0
    );
  }
  
  afficherPanier() {
    if (this.lignes.length === 0) {
      console.log(" Panier vide");
      return;
    }
    
    console.log(" Contenu du panier:");
    this.lignes.forEach(l => {
      console.log(`  • ${l.qte}x ${l.article.titre} = €${(l.article.prix * l.qte).toFixed(2)}`);
    });
    console.log(`  Total: €${this.total().toFixed(2)}`);
  }
}


const stylo = new Article({ titre: "Stylo", prix: 1.2, stock: 10 });
const cahier = new Article({ titre: "Cahier", prix: 2.5, stock: 5 });
const gomme = new Article({ titre: "Gomme", prix: 0.8, stock: 20 });

const panier = new Panier();
panier.ajouter(stylo, 3);
panier.ajouter(cahier, 2);
panier.ajouter(stylo, 1); 

console.log(`Total: €${panier.total()}`); 


panier.retirer(cahier, 1);
panier.retirer(stylo, 2);
panier.afficherPanier();


// Partie 6 — Concevoir un petit programme OO (guide)
console.log("=== Partie 6 ===");

// Exercice 6
console.log("Exercice 6");

// Classe Client 
class Client {
  constructor(nom, email) {
    this.nom = nom;
    this.email = email;
    this.panier = new Panier();
  }
  
  passerCommande() {
    if (this.panier.total() === 0) {
      console.log(" Panier vide, impossible de commander");
      return null;
    }
    
    const commande = new Commande(this, this.panier);
    return commande;
  }
}

// Classe Commande 
class Commande {
  constructor(client, panier) {
    this.client = client;
    this.panier = panier;
    this.date = new Date();
    this.etat = "en attente";
  }
  
  confirmer() {
    // Vérifier le stock
    for (let ligne of this.panier.lignes) {
      if (ligne.article.stock < ligne.qte) {
        console.log('Stock insuffisant pour ${ligne.article.titre}');
        return false;
      }
    }
    
    // Mettre à jour le stock
    for (let ligne of this.panier.lignes) {
      ligne.article.stock -= ligne.qte;
    }
    
    this.etat = "confirmée";
    console.log( 'Commande confirmée pour ${this.client.nom}');
    
    // Vider le panier
    this.panier.lignes = [];
    return true;
  }
  
  resumer() {
    console.log('\n COMMANDE pour ${this.client.nom}');
    console.log('Date: ${this.date.toLocaleDateString()}');
    console.log('État: ${this.etat}');
    console.log('Total: €${this.panier.total().toFixed(2)}');
  }
}


// TESTS SIMPLES

console.log("\n--- TESTS ---");

// 1. Vérifier les articles existants
console.log("1. Articles disponibles :");
console.log('  ${stylo.titre} (stock: ${stylo.stock})');
console.log(' ${cahier.titre} (stock: ${cahier.stock}');
console.log('   ${gomme.titre} (stock: ${gomme.stock})\n');

// 2. Créer un client et ajouter au panier
console.log("2. Client fait ses achats :");
const client = new Client("Marie", "marie@email.com");
client.panier.ajouter(stylo, 3);
client.panier.ajouter(cahier, 2);
console.log('${client.nom} a ajouté des articles');
console.log(' Total panier: €${client.panier.total()}\n');

// 3. Passer commande
console.log("3. Passage de commande :");
const commande = client.passerCommande();
if (commande) {
  commande.confirmer();
  commande.resumer();
}

// 4. Vérifier le stock après commande
console.log("\n4. Stock après commande :");
console.log('  Stylo: ${stylo.stock} (était 10)');
console.log('   Cahier: ${cahier.stock} (était 5)');

// 5. Tester avec stock insuffisant
console.log("\n5. Test stock insuffisant :");
const client2 = new Client("Pierre", "pierre@email.com");
client2.panier.ajouter(stylo, 20); 
console.log(`   ${client2.nom} essaie d'acheter 20 stylos (stock restant: ${stylo.stock})`);
const commande2 = client2.passerCommande();
if (commande2) {
  commande2.confirmer();
}

// 6. Panier vide
console.log("\n6. Test panier vide :");
const client3 = new Client("Alice", "alice@email.com");
client3.passerCommande();

console.log("Tests terminés ");

// Partie 7 — Devoir pratique: Mini-système Bibliothèque
console.log("=== Partie 7 ===");

//  Exercice 7
console.log("Exercice 7\n");
console.log("Système de Bibliothèque\n");


// CLASSE LIVRE
class Livre {
  #disponible = true;
  
  constructor({ id, titre, auteur }) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
  }
  
  estDisponible() { 
    return this.#disponible; 
  }
  
  marquerEmprunte() { 
    if (!this.#disponible) throw new Error("Livre deja emprunte"); 
    this.#disponible = false; 
  }
  
  marquerRetour() { 
    this.#disponible = true; 
  }
}

// CLASSE MEMBRE
class Membre {
  constructor({ id, nom }) { 
    this.id = id; 
    this.nom = nom; 
    this.emprunts = []; 
  }
  
  peutEmprunter() { 
    return this.emprunts.filter(e => !e.dateRetour).length < 3; 
  }
  
  nbEmpruntsActifs() {
    return this.emprunts.filter(e => !e.dateRetour).length;
  }
  
  listerEmprunts() {
    console.log(`\nEmprunts de ${this.nom}:`);
    const actifs = this.emprunts.filter(e => !e.dateRetour);
    if (actifs.length === 0) {
      console.log("  Aucun emprunt actif");
    } else {
      actifs.forEach(e => {
        console.log(`  - ${e.livre.titre} (emprunte le ${e.dateEmprunt.toLocaleDateString()})`);
      });
    }
  }
}

// CLASSE EMPRUNT
class Emprunt {
  constructor({ livre, membre, dateEmprunt = new Date(), dateRetour = null }) {
    this.livre = livre;
    this.membre = membre;
    this.dateEmprunt = dateEmprunt;
    this.dateRetour = dateRetour;
  }
  
  retourner() { 
    this.dateRetour = new Date(); 
    this.livre.marquerRetour(); 
  }
}

// CLASSE BIBLIOTHEQUE
class Bibliotheque {
  constructor() { 
    this.livres = []; 
    this.membres = []; 
    this.historique = []; 
  }
  
  ajouterLivre(livre) { 
    this.livres.push(livre); 
    console.log(`Livre ajoute: ${livre.titre}`);
  }
  
  ajouterMembre(membre) { 
    this.membres.push(membre); 
    console.log(`Membre ajoute: ${membre.nom}`);
  }
  
  trouverLivre(id) { 
    return this.livres.find(l => l.id === id); 
  }
  
  trouverMembre(id) { 
    return this.membres.find(m => m.id === id); 
  }
  
  emprunter(idLivre, idMembre) {
    const livre = this.trouverLivre(idLivre);
    const membre = this.trouverMembre(idMembre);
    
    if (!livre || !membre) throw new Error("Livre ou membre introuvable");
    if (!livre.estDisponible()) throw new Error("Livre indisponible");
    if (!membre.peutEmprunter()) throw new Error("Quota atteint (3 livres maximum)");
    
    livre.marquerEmprunte();
    const emprunt = new Emprunt({ livre, membre });
    membre.emprunts.push(emprunt);
    this.historique.push(emprunt);
    
    console.log(`Emprunt: ${livre.titre} -> ${membre.nom}`);
    return emprunt;
  }
  
  retourner(idLivre, idMembre) {
    const membre = this.trouverMembre(idMembre);
    if (!membre) throw new Error("Membre introuvable");
    
    const emprunt = membre.emprunts.find(e => e.livre.id === idLivre && !e.dateRetour);
    if (!emprunt) throw new Error("Emprunt introuvable");
    
    emprunt.retourner();
    console.log(`Retour: ${emprunt.livre.titre}`);
    return emprunt;
  }
  
  livresDisponibles() { 
    const disponibles = this.livres.filter(l => l.estDisponible());
    console.log("\nLivres disponibles:");
    disponibles.forEach(l => console.log(`  - ${l.titre} par ${l.auteur}`));
    return disponibles;
  }
  
  livresEmpruntes() {
    const empruntes = this.livres.filter(l => !l.estDisponible());
    console.log("\nLivres empruntes:");
    empruntes.forEach(l => console.log(`  - ${l.titre} par ${l.auteur}`));
    return empruntes;
  }
  
  afficherStatistiques() {
    console.log("\n--- STATISTIQUES ---");
    console.log(`Total livres: ${this.livres.length}`);
    console.log(`Livres disponibles: ${this.livres.filter(l => l.estDisponible()).length}`);
    console.log(`Livres empruntes: ${this.livres.filter(l => !l.estDisponible()).length}`);
    console.log(`Total membres: ${this.membres.length}`);
    console.log(`Total emprunts: ${this.historique.length}`);
  }
}

// TESTS
console.log("--- CREATION DE LA BIBLIOTHEQUE ---\n");

const bib = new Bibliotheque();

// Ajouter des livres
console.log("1. Ajout des livres:");
const livre1 = new Livre({ id: 1, titre: "Clean Code", auteur: "Robert C. Martin" });
const livre2 = new Livre({ id: 2, titre: "You Dont Know JS", auteur: "Kyle Simpson" });
const livre3 = new Livre({ id: 3, titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupery" });
const livre4 = new Livre({ id: 4, titre: "1984", auteur: "George Orwell" });

bib.ajouterLivre(livre1);
bib.ajouterLivre(livre2);
bib.ajouterLivre(livre3);
bib.ajouterLivre(livre4);

// Ajouter des membres
console.log("\n2. Ajout des membres:");
const membre1 = new Membre({ id: 1, nom: "Marie Dupont" });
const membre2 = new Membre({ id: 2, nom: "Thomas Martin" });
const membre3 = new Membre({ id: 3, nom: "Sophie Bernard" });

bib.ajouterMembre(membre1);
bib.ajouterMembre(membre2);
bib.ajouterMembre(membre3);

// Afficher les livres disponibles
console.log("\n3. Livres disponibles au debut:");
bib.livresDisponibles();

// Emprunter des livres
console.log("\n4. Emprunts:");
bib.emprunter(1, 1);  // Marie emprunte Clean Code
bib.emprunter(2, 1);  // Marie emprunte YDKJS
bib.emprunter(3, 2);  // Thomas emprunte Le Petit Prince

// Afficher les livres apres emprunts
console.log("\n5. Livres disponibles apres emprunts:");
bib.livresDisponibles();

console.log("\n6. Livres empruntes:");
bib.livresEmpruntes();

// Tester le quota (max 3 livres)
console.log("\n7. Test du quota maximum:");
try {
  bib.emprunter(4, 1);  // Marie emprunte 1984 (3eme livre)
  console.log("  Marie a emprunte son 3eme livre");
  bib.emprunter(1, 1);  // Essayer d'emprunter un 4eme (devrait echouer)
} catch (error) {
  console.log(`  Erreur: ${error.message}`);
}

// Retourner un livre
console.log("\n8. Retour de livre:");
bib.retourner(1, 1);  // Marie retourne Clean Code

// Afficher les livres apres retour
console.log("\n9. Livres disponibles apres retour:");
bib.livresDisponibles();

// Emprunter un livre maintenant disponible
console.log("\n10. Nouvel emprunt:");
bib.emprunter(1, 3);  // Sophie emprunte Clean Code

// Lister les emprunts d'un membre
console.log("\n11. Emprunts par membre:");
membre1.listerEmprunts();
membre3.listerEmprunts();

// Tester emprunt de livre indisponible
console.log("\n12. Test emprunt indisponible:");
try {
  bib.emprunter(1, 2);  // Thomas essaie d'emprunter Clean Code (deja pris)
} catch (error) {
  console.log(`  Erreur: ${error.message}`);
}

// Tester retour de livre deja retourne
console.log("\n13. Test double retour:");
try {
  bib.retourner(1, 1);  // Marie essaie de retourner un livre qu'elle n'a plus
} catch (error) {
  console.log(`  Erreur: ${error.message}`);
}

// Afficher les statistiques
console.log("\n14. Statistiques finales:");
bib.afficherStatistiques();

console.log("\n--- FIN DES TESTS ---");

// Partie 8 — Exercices pratiques courts
console.log("=== Partie 8 ===");

// EXERCICE 1: Getters/Setters pour Article
console.log("\n--- EXERCICE 1: Getter/Setter prix ---");


const articleTest = new Article({ titre: "Stylo Test", prix: 1.2, stock: 10 });


Object.defineProperty(articleTest, 'prix', {
  get: function() { return this._prix; },
  set: function(v) { 
    if (v < 0) throw new Error("Prix invalide: ne peut pas être négatif");
    this._prix = v;
  }
});
articleTest._prix = 1.2;

console.log("Test getter/setter prix:");
console.log(`Prix initial: ${articleTest.prix} €`);
articleTest.prix = 1.5;
console.log(`Prix après modification: ${articleTest.prix} €`);

try {
  articleTest.prix = -5;
} catch (error) {
  console.log(`Erreur capturée: ${error.message}`);
}


// EXERCICE 2: Méthode statique fromJSON
console.log("\n--- EXERCICE 2: Méthode statique fromJSON ---");


class LivreAvecFromJSON extends Livre {
  static fromJSON(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    return new LivreAvecFromJSON(data);
  }
  
  toString() {
    return `${this.titre} par ${this.auteur} (${this.estDisponible ? "disponible" : "emprunte"})`;
  }
}

// Test de l'exercice 2
console.log("Test fromJSON:");
const jsonLivre = '{"id": 1, "titre": "Clean Code", "auteur": "Robert Martin", "disponible": true}';
const livreFromJSON = LivreAvecFromJSON.fromJSON(jsonLivre);
console.log(`Livre créé depuis JSON: ${livreFromJSON.toString()}`);

const jsonLivre2 = { id: 2, titre: "1984", auteur: "George Orwell", disponible: false };
const livreFromObj = LivreAvecFromJSON.fromJSON(jsonLivre2);
console.log(`Livre créé depuis objet: ${livreFromObj.toString()}`);

// EXERCICE 3: Polymorphisme avec Paiement
console.log("\n--- EXERCICE 3: Polymorphisme Paiement ---");

// Classe parent
class Paiement {
  constructor(montant) {
    this.montant = montant;
  }
  
  effectuer() {
    console.log(`Paiement de ${this.montant} € effectue`);
  }
}

// Sous-classe PaiementCarte
class PaiementCarte extends Paiement {
  constructor(montant, numeroCarte) {
    super(montant);
    this.numeroCarte = numeroCarte;
  }
  
  effectuer() {
    const derniersChiffres = this.numeroCarte.slice(-4);
    console.log(`Paiement par carte: ${this.montant} € (carte: ${derniersChiffres})`);
  }
}

// Sous-classe PaiementCash
class PaiementCash extends Paiement {
  constructor(montant, especeRecu) {
    super(montant);
    this.especeRecu = especeRecu;
  }
  
  effectuer() {
    const monnaie = this.especeRecu - this.montant;
    console.log(`Paiement en especes: ${this.montant} € recu: ${this.especeRecu} €`);
    if (monnaie > 0) {
      console.log(`  Monnaie a rendre: ${monnaie} €`);
    }
  }
}

// Test de l'exercice 3
console.log("Test polymorphisme:");
const paiements = [
  new Paiement(50),
  new PaiementCarte(75, "1234-5678-9012-3456"),
  new PaiementCash(30, 50)
];

paiements.forEach(p => p.effectuer());


// EXERCICE 4: Composition avec Catalogue
console.log("\n--- EXERCICE 4: Composition Catalogue ---");

class LivreCatalogue {
  constructor({ id, titre, auteur }) {
    this.id = id;
    this.titre = titre;
    this.auteur = auteur;
  }
}

class Catalogue {
  constructor(nom) {
    this.nom = nom;
    this.categories = new Map();
  }
  
  ajouterLivre(livre, categorie) {
    if (!this.categories.has(categorie)) {
      this.categories.set(categorie, []);
    }
    this.categories.get(categorie).push(livre);
    console.log(`Livre "${livre.titre}" ajoute a la categorie "${categorie}"`);
  }
  
  afficherParCategorie() {
    console.log(`\nCatalogue: ${this.nom}`);
    for (let [categorie, livres] of this.categories) {
      console.log(`\n[${categorie}] (${livres.length} livres):`);
      livres.forEach(livre => {
        console.log(`  - ${livre.titre} par ${livre.auteur}`);
      });
    }
  }
  
  trouverParCategorie(categorie) {
    return this.categories.get(categorie) || [];
  }
  
  compterParCategorie() {
    const resultat = {};
    for (let [categorie, livres] of this.categories) {
      resultat[categorie] = livres.length;
    }
    return resultat;
  }
}

// Test de l'exercice 4
console.log("Test composition Catalogue:");

const livreTech1 = new LivreCatalogue({ id: 1, titre: "Clean Code", auteur: "Robert Martin" });
const livreTech2 = new LivreCatalogue({ id: 2, titre: "You Don't Know JS", auteur: "Kyle Simpson" });
const livreRoman1 = new LivreCatalogue({ id: 3, titre: "1984", auteur: "George Orwell" });
const livreRoman2 = new LivreCatalogue({ id: 4, titre: "Le Petit Prince", auteur: "Saint-Exupery" });
const livreScience = new LivreCatalogue({ id: 5, titre: "Une breve histoire du temps", auteur: "Stephen Hawking" });

const catalogue = new Catalogue("Bibliotheque Centrale");

catalogue.ajouterLivre(livreTech1, "Informatique");
catalogue.ajouterLivre(livreTech2, "Informatique");
catalogue.ajouterLivre(livreRoman1, "Roman");
catalogue.ajouterLivre(livreRoman2, "Roman");
catalogue.ajouterLivre(livreScience, "Science");

catalogue.afficherParCategorie();

console.log("\nRecherche dans la categorie 'Informatique':");
const livresInfo = catalogue.trouverParCategorie("Informatique");
livresInfo.forEach(l => console.log(`  - ${l.titre}`));

console.log("\nNombre de livres par categorie:");
const comptage = catalogue.compterParCategorie();
for (let [categorie, nombre] of Object.entries(comptage)) {
  console.log(`  ${categorie}: ${nombre} livre(s)`);
}


// TESTS FINAUX
console.log("\n--- RESUME DES EXERCICES ---");
console.log("1. Getter/Setter prix: OK (validation des valeurs negatives)");
console.log("2. fromJSON: OK (creation depuis JSON et objet)");
console.log("3. Polymorphisme Paiement: OK (Carte et Cash)");
console.log("4. Composition Catalogue: OK (groupement par categories)");

console.log("\n=== FIN DE LA PARTIE 8 ===");