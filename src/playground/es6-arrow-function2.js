const add = function (a, b){
  console.log(arguments)
  return a + b;
}
console.log(add(55, 1, 1001));

const user = {
  name: 'Andrew', 
  cities: ['Philadelphia', 'New York', 'Dublin'],
  printPlacesLived(){
    return this.cities.map((city) => this.name + ' has lived in ' + city);

    this.cities.forEach((city) => {
      console.log(this.name + ' has lived in ' + city);
    });
  }
};

console.log(user.printPlacesLived());

const multiplier = {
  numbers: [1, 2, 3, 4, 5, 6],
  multiplyBy: 2,
  multiply(){
    return this.numbers.map((x) => x * this.multiplyBy);
  },
};

console.log('Original array: ' + multiplier.numbers + '.Multiplied array: ' + (multiplier.multiply()));
