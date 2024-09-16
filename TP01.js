// Classe pour gérer le stock de fruits
var FruitStock = /** @class */ (function () {
    function FruitStock() {
        this.stock = [];
        this.nextId = 1; // ID pour le prochain fruit ajouté
    }
    // Ajouter un fruit au stock avec une quantité initiale
    FruitStock.prototype.addFruit = function (fruitName, quantity) {
        var existingFruit = this.findFruit(fruitName);
        if (existingFruit) {
            existingFruit.quantity += quantity;
            console.log("Ajout de ".concat(quantity, " unit\u00E9s de ").concat(fruitName, ". Quantit\u00E9 totale : ").concat(existingFruit.quantity));
        }
        else {
            this.stock.push({ id: this.nextId++, name: fruitName, quantity: quantity });
            console.log("Ajout de ".concat(quantity, " unit\u00E9s de ").concat(fruitName, " au stock."));
        }
    };
    // Méthode pour obtenir les informations d'un fruit par nom ou ID
    FruitStock.prototype.getFruitInfo = function (identifier) {
        var fruit = this.stock.find(function (f) { return f.name === identifier || f.id === identifier; });
        if (fruit) {
            console.log("Fruit: ".concat(fruit.name, ", ID: ").concat(fruit.id, ", Quantit\u00E9: ").concat(fruit.quantity));
        }
        else {
            console.log("Aucun fruit trouv\u00E9 pour l'identifiant: ".concat(identifier));
        }
    };
    // Vendre un fruit et réduire la quantité
    FruitStock.prototype.sellFruit = function (fruitName, quantity) {
        var fruit = this.findFruit(fruitName);
        if (fruit && this.checkAvailability(fruitName, quantity)) {
            fruit.quantity -= quantity;
            console.log("Vente de ".concat(quantity, " unit\u00E9s de ").concat(fruitName, ". Quantit\u00E9 restante : ").concat(fruit.quantity));
        }
        else {
            console.log("La vente n'est pas possible pour ".concat(fruitName, "."));
        }
    };
    // Supprimer un fruit du stock
    FruitStock.prototype.removeFruit = function (fruitName) {
        var index = this.stock.findIndex(function (fruit) { return fruit.name === fruitName; });
        if (index !== -1) {
            this.stock.splice(index, 1);
            console.log("".concat(fruitName, " a \u00E9t\u00E9 retir\u00E9 du stock."));
        }
        else {
            console.log("".concat(fruitName, " n'est pas trouv\u00E9 dans le stock."));
        }
    };
    // Vérifier la disponibilité d'un fruit avant de vendre
    FruitStock.prototype.checkAvailability = function (fruitName, quantity) {
        var fruit = this.findFruit(fruitName);
        if (!fruit) {
            console.log("".concat(fruitName, " n'est pas disponible \u00E0 la vente."));
            return false;
        }
        else if (fruit.quantity < quantity) {
            console.log("Pas assez de ".concat(fruitName, ". Quantit\u00E9 disponible : ").concat(fruit.quantity, ", demand\u00E9e : ").concat(quantity, "."));
            return false;
        }
        return true;
    };
    // Fonction utilitaire pour trouver un fruit dans le stock par son nom
    FruitStock.prototype.findFruit = function (fruitName) {
        return this.stock.find(function (fruit) { return fruit.name === fruitName; });
    };
    // Afficher le stock actuel
    FruitStock.prototype.displayStock = function () {
        if (this.stock.length === 0) {
            console.log('Le stock est vide.');
        }
        else {
            console.log('Stock actuel:');
            this.stock.forEach(function (fruit) {
                console.log("".concat(fruit.name, " (ID: ").concat(fruit.id, "): ").concat(fruit.quantity, " unit\u00E9s"));
            });
        }
    };
    return FruitStock;
}());
// Scénario de test
var myFruitStock = new FruitStock();
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
myFruitStock.getFruitInfo('Pomme'); // Recherche par nom
myFruitStock.getFruitInfo(2); // Recherche par ID (ID 1 correspondant au premier fruit ajouté)
// 7. Affichage du stock
myFruitStock.displayStock();
// 8. Suppression de l'ananas dans le stock
myFruitStock.removeFruit('Ananas');
// 9. Affichage du stock final
myFruitStock.displayStock();
