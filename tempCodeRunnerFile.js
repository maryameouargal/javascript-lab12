//Partie 5 — Créer, concevoir et composer des classes
console.log("=== Partie 5 ===");

// Exercice 5.1
console.log("Exercice 5.1 ");

class Article {
  constructor({ titre = "(Sans titre)", prix = 0, stock = 0 } = {}) {
    if (prix < 0 || stock < 0) throw new Error("Valeurs invalides");
    this.titre = titre;
    this.prix = prix;
    this.stock = stock;
  }
  
  enStock() { return this.stock > 0; }
  

  toString() {
    return `${this.titre} (€${this.prix})`;
  }
}


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
      console.log("🛒 Panier vide");
      return;
    }
    
    console.log("🛒 Contenu du panier:");
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