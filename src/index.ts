class Person {
  speak(name?: string) {
    console.log(`Hello ${name?.toUpperCase() ?? 'World'}`);
  }
}

const p = new Person();
p.speak('John');
p.speak();
