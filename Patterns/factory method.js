class BmwFactory {
    create(type) {
        if (type === 'X5') {
            return new BMW(type, 8000000, 300)
        }
        if (type === 'X6') {
            return new BMW(type, 10000000, 300)
        }
    }
}


class BMW {
    constructor(model, price, maxSpeed) {
        this.model = model;
        this.price = price;
        this.maxSpeed = maxSpeed;
    }
}

const factory = new BmwFactory();
const x5 = factory.create('X5')
const x6 = factory.create('X6')

console.log(x5)
console.log(x6)

