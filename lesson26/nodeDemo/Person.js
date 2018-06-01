function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.show = function() {
    console.log("I'm", this.name, ",I'm ", this.age, "years old!")
}
module.exports = Person;