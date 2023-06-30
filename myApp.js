require('dotenv').config();
let mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI'];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let jhonDoe = new Person({
    name: "Jhon Doe",
    age: 22,
    favoriteFoods: ["Arroz con pollo"]
  })
  jhonDoe.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
    }, function(err, data){
      if (err) return console.error(err);
      done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, function(err, data){
      if (err) return console.error(err);
      done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId
  , function(err, data){
      if (err) return console.error(err);
      done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId
  , function(err, person){
      if (err) return console.error(err);

      person.favoriteFoods.push(foodToAdd);

      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        done(null, updatedPerson);
      });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  }, {
    age: ageToSet
  }, {
    new: true
  }, function(err, updatedPerson){
    if (err) return console.err(err);
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, 
    function(err, deletedPerson){
      if (err) return console.err(err);
      done(null, deletedPerson);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}
    , function(err, removedPersons){
      if (err) return console.err(err);
      done(null, removedPersons);
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({
    favoriteFoods: foodToSearch
  })
  .sort({
    name: 1
  })
  .limit(2)
  .select({
    age: 0
  })
  .exec(function(err, selectedPersons){
    if (err) return console.err(err);
    done(null, selectedPersons);
  })
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
