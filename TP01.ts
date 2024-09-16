// Interface représentant un fruit
interface Fruit {
  id: number; // Ajout d'un ID unique
  name: string;
  quantity: number;
}

// Classe pour gérer le stock de fruits
class FruitStock {
  private stock: Fruit[] = [];
  private nextId: number = 1; // ID pour le prochain fruit ajouté

  // Ajouter un fruit au stock avec une quantité initiale
  addFruit(fruitName: string, quantity: number): void {
    const existingFruit = this.findFruit(fruitName);
    if (existingFruit) {
      existingFruit.quantity += quantity;
      console.log(`Ajout de ${quantity} unités de ${fruitName}. Quantité totale : ${existingFruit.quantity}`);
    } else {
      this.stock.push({ id: this.nextId++, name: fruitName, quantity });
      console.log(`Ajout de ${quantity} unités de ${fruitName} au stock.`);
    }
  }

  // Méthode pour obtenir les informations d'un fruit par nom ou ID
  getFruitInfo(identifier: string | number): void {
    const fruit = this.stock.find(f => f.name === identifier || f.id === identifier);
    if (fruit) {
      console.log(`Fruit: ${fruit.name}, ID: ${fruit.id}, Quantité: ${fruit.quantity}`);
    } else {
      console.log(`Aucun fruit trouvé pour l'identifiant: ${identifier}`);
    }
  }

  // Vendre un fruit et réduire la quantité
  sellFruit(fruitName: string, quantity: number): void {
    const fruit = this.findFruit(fruitName);
    if (fruit && this.checkAvailability(fruitName, quantity)) {
      fruit.quantity -= quantity;
      console.log(`Vente de ${quantity} unités de ${fruitName}. Quantité restante : ${fruit.quantity}`);
    } else {
      console.log(`La vente n'est pas possible pour ${fruitName}.`);
    }
  }

  // Supprimer un fruit du stock
  removeFruit(fruitName: string): void {
    const index = this.stock.findIndex(fruit => fruit.name === fruitName);
    if (index !== -1) {
      this.stock.splice(index, 1);
      console.log(`${fruitName} a été retiré du stock.`);
    } else {
      console.log(`${fruitName} n'est pas trouvé dans le stock.`);
    }
  }

  // Vérifier la disponibilité d'un fruit avant de vendre
  private checkAvailability(fruitName: string, quantity: number): boolean {
    const fruit = this.findFruit(fruitName);
    if (!fruit) {
      console.log(`${fruitName} n'est pas disponible à la vente.`);
      return false;
    } else if (fruit.quantity < quantity) {
      console.log(`Pas assez de ${fruitName}. Quantité disponible : ${fruit.quantity}, demandée : ${quantity}.`);
      return false;
    }
    return true;
  }

  // Fonction utilitaire pour trouver un fruit dans le stock par son nom
  private findFruit(fruitName: string): Fruit | undefined {
    return this.stock.find(fruit => fruit.name === fruitName);
  }

  // Afficher le stock actuel
  displayStock(): void {
    if (this.stock.length === 0) {
      console.log('Le stock est vide.');
    } else {
      console.log('Stock actuel:');
      this.stock.forEach(fruit => {
        console.log(`${fruit.name} (ID: ${fruit.id}): ${fruit.quantity} unités`);
      });
    }
  }
}

// Scénario de test

const myFruitStock = new FruitStock();

// 1. Constitution d'un stock contenant 3 types de fruits
myFruitStock.addFruit('Pomme', 10);
myFruitStock.addFruit('Poire', 5);
myFruitStock.addFruit('Ananas', 8);

// 2. Ajout de 5 pommes
myFruitStock.addFruit('Pomme', 5);

// 3. Ajout de 8 poires
myFruitStock.addFruit('Poire', 8);

// 4. Vente de 2 ananas
myFruitStock.sellFruit('Ananas', 2);

// 5. Premier affichage du stock final
myFruitStock.displayStock();

// 6. Recherche d'informations
myFruitStock.getFruitInfo('Pomme');  // Recherche par nom
myFruitStock.getFruitInfo(2);        // Recherche par ID (ID 1 correspondant au premier fruit ajouté)

// 7. Affichage du stock
myFruitStock.displayStock();

// 8. Suppression de l'ananas dans le stock
myFruitStock.removeFruit('Ananas');

// 9. Affichage du stock final
myFruitStock.displayStock();
