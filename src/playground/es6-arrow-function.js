// const square = function(x){
//   return x * x;
// };

// // const squareArrow = (x) => {
// //   return x * x;
// // };

// const squareArrow = (x) => x * x;

// console.log(square(8));


const fullName = 'Mike Smith';

const getFirstName = function(fullName){
  return fullName.split(' ')[0];
}

const getFirstNameArrow = (fullName) => fullName.split(' ')[0];

console.log(getFirstName(fullName));
console.log(getFirstNameArrow(fullName));