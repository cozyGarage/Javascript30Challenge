// start with strings, numbers and booleans
console.groupCollapsed(`${'Task-1: strings, numbers and booleans'}`);

console.groupCollapsed(`${'Task-1.1: strings'}`);
let name1 = 'Elena';
let name2 = name1;
console.log('name1:', name1, 'name2:', name2);
name1 = 'Lena';
console.log('name1 was changed');
console.log('Updated name1:', name1, 'Not affected name2:', name2);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-1.2: numbers'}`);
let num1 = 20;
let num2 = num1;
console.log('num1:', num1, 'num2:', num2);
num1 = 30;
console.log('num1 was changed');
console.log('Updated num1:', num1, 'Not affected num2:', num2);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-1.3: booleans'}`);
let boolean1 = 20;
let boolean2 = boolean1;
console.log('boolean1:', boolean1, 'boolean2:', boolean2);
boolean1 = 30;
console.log('boolean1 was changed');
console.log('Updated boolean1:', boolean1, 'Not affected boolean2:', boolean2);
console.groupEnd();

console.groupEnd();

//-----------------------------------

console.groupCollapsed(`${'Task-2: arrays'}`);

console.groupCollapsed(`${'Task-2.0: updating the referenced arrays'}`);
// Let's say we have an array
const names = ['Elena', 'Roman', 'Dima'];
// and we want to make a copy of it.
const family = names;
console.log('arr1:', names);
console.log('arr2:', family);
// You might think we can just do something like this:
family[3] = 'Viktor';
console.log('arr1 was changed');
// however what happens when we update that array?
console.log('Updated arr1:', names);
console.log('Affected arr2:', family);
console.log('Problem: we have edited the original array too!');
console.log("It's because that is an array reference, not an array copy.");
console.log(
    'Solution: split the reference between two arrays and modify them independently of each other',
);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-2.1: option 1 to make a copy'}`);
console.log('Spread operator: newArr =  [...originArr]:');
const originalArray1 = [1, 2, 3, 4, 5];
const newArray1 = [...originalArray1]; // create a copy of the original array
originalArray1[0] = 'changed'; // modify the first value of the original array
console.log('originalArray1', originalArray1); // output: ['changed', 2, 3, 4, 5]
console.log('newArray1', newArray1); // output: [1, 2, 3, 4, 5]
console.log('newArray1 is not affected after originalArray1 is changed');
console.groupEnd();

//---

console.groupCollapsed(`${'Task-2.2: option 2 to make a copy'}`);
console.log('method concat(): newArr = originalArr.concat():');
const originalArray2 = [1, 2, 3, 4, 5];
const newArray2 = originalArray2.concat(); // create a copy of the original array
originalArray2[0] = 'changed'; // modify the first value of the original array
console.log('originalArray2', originalArray2); // output: ['changed', 2, 3, 4, 5]
console.log('newArray2', newArray2); // output: [1, 2, 3, 4, 5]
console.log('newArray2 is not affected after originalArray2 is changed');
console.groupEnd();

//---

console.groupCollapsed(`${'Task-2.3: option 3 to make a copy'}`);
console.log('method slice(): newArr = originalArr.slice():');
const originalArray3 = [1, 2, 3, 4, 5];
const newArray3 = originalArray3.concat(); // create a copy of the original array
originalArray3[0] = 'changed'; // modify the first value of the original array
console.log('originalArray3', originalArray3); // output: ['changed', 2, 3, 4, 5]
console.log('newArray3', newArray3); // output: [1, 2, 3, 4, 5]
console.log('newArray3 is not affected after originalArray3 is changed');
console.groupEnd();

//---

console.groupCollapsed(`${'Task-2.4: option 4 to make a copy'}`);
console.log('newArr = Array.from(originalArr):');
const originalArray4 = [1, 2, 3, 4, 5];
const newArray4 = originalArray4.concat(); // create a copy of the original array
originalArray4[0] = 'changed'; // modify the first value of the original array
console.log('originalArray4', originalArray4); // output: ['changed', 2, 3, 4, 5]
console.log('newArray4', newArray4); // output: [1, 2, 3, 4, 5]
console.log('newArray4 is not affected after originalArray4 is changed');
console.groupEnd();

console.groupEnd();

//-----------------------------------

// The same thing goes for objects, let's say we have a person object
console.groupCollapsed(`${'Task-3: objects'}`);

console.groupCollapsed(`${'Task-3.0: updating the referenced objects'}`);
const person = {
    name: 'Elena Golovanova',
    age: 35,
};
const student = person; // and think we make a copy:
console.log('person:', person);
console.log('student:', student);
student.language = 'javascript';
console.log('student was changed');
console.log('Updated student:', person);
console.log('Affected person:', student);
console.log('Problem: we have edited the original person object too!');
console.log("It's because that is an object reference, not an object copy.");
console.log(
    'Solution: split the reference between two objects and modify them independently of each other',
);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-3.1: option 1 to make a shallow object copy'}`);
console.log('Shallow copy - newObj = Object.assign({}, originalObj) :');
const person1 = {
    name: 'Elena Golovanova',
    age: 35,
};
const student1 = Object.assign({}, person1, {
    name: 'Elena Golovanova',
    age: 35,
}); // and think we make a copy:
console.log('person1:', person1);
console.log('student1:', student1);
student1.language = 'javascript';
console.log('student1 was changed');
console.log('Updated student1:', student1);
console.log('Not affected person1:', person1);
console.log('person1 is not affected after student1 is changed');
console.log(
    'We split the reference between two objects and can modify them independently of each other',
);
console.log('Note: this is only 1 level deep of copying = shallow copy');
console.log(
    'lodash has a cloneDeep method, but you should think twice before using it',
);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-3.2: option 2 to make a shallow object copy'}`);
console.log('Deep copy - newObj = JSON.parse(JSON.stringify(originalObj)):');
const person2 = {
    name: 'Elena Golovanova',
    age: 35,
};
const student2 = JSON.parse(JSON.stringify(person2));
console.log('person2:', person2);
console.log('student2:', student2);
student2.language = 'javascript';
console.log('student2 was changed');
console.log('Updated student2:', student2);
console.log('Not affected person2:', person2);
console.log('person2 is not affected after student2 is changed');
console.log(
    'We split the reference between two objects and can modify them independently of each other',
);
console.log('Note: this method creates a deep copy of the object = deep copy ');
console.log(
    'lodash has a cloneDeep method, but you should think twice before using it',
);
console.groupEnd();

//---

console.groupCollapsed(`${'Task-3.3: limitations of shallow object copy'}`);
console.log('Shallow copy - newObj = Object.assign({}, originalObj):');

const person3 = {
    name: 'Elena Golovanova',
    age: 35,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
    },
};

const student3 = Object.assign({}, person3);
console.log('person3:', person3);
console.log('student3:', student3);
student3.address.street = '456 Elm St'; // Modify the nested object in student2
console.log('student3 was changed');
console.log('Updated student3:', student3);
console.log('Affected person3:', person3);
console.log('person3 is affected after student3 is changed');
console.log(
    'We split the reference between two objects on level 1 of nesting, but still can not modify them independently',
);
console.log('Note: this is only 1 level deep of copying = shallow copy');
console.log(
    'lodash has a cloneDeep method, but you should think twice before using it',
);
console.groupEnd();

console.groupEnd();
