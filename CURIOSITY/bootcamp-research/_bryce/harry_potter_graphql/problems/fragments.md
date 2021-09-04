Practice your query syntax using GraphiQL to get a feel for how schemas are set up in GraphQL. For problems that accept variables make sure to test each answer you come up with with multiple `id`s to make sure they work.

1. Write a query that will return the name, founder, ghost, and animal of Gryffindor (id: 1) and Ravenclaw (id: 4). Remember to alias - then DRY up your query with a fragment!

{
  gryffindor: house(id: 1) {
    ...houseInfo
  },
  ravenclaw: house(id: 4) {
    ...houseInfo
  }
}

fragment houseInfo on House {
    name,
    founder,
    ghost,
    animal
}

2. Write a query that will return the core, length, owner name, and the name of the owner's house for both the wand with the `id` of 7 and the wand with the `id` of 10. Then use a fragment to DRY it up!

{
  firstWand: wand(id: 7) {
    ...wandInfo
  },
  secondWand: wand(id: 10) {
    ...wandInfo
  }
}

fragment wandInfo on Wand {
  core,
    length,
    wizard {
      name,
      house {
        name
      }
    }
}

3. Create a query that will accept an `id` variable and will return the patronus form associated with that `id`.

query formOfPatronus($patronusID: Int) {
  patronus(id: $patronusID) {
    form
  }
}

4. Write a query with the operation name of `FetchWizardandWand` that will accept two variables, one for a wizard to be fetched(`$wizardId`) and one for a wand to be fetched(`$wandId`). For the wizard return their name and house name. For the wand return the core, length, and the wizard's patronus form.

query FetchWizardandWand($wizardId: Int, $wandId: Int) {
  wizard(id: $wizardId) {
    name,
    house {
      name
    }
  },
  wand(id: $wandId) {
    core,
    length,
    wizard {
      patronus {
        form
      }
    }
  }
}

5. Now let's use variables, aliases and fragments! Write a query that will accept the `id` of two patronus. For each patronus return the form of that patronus, along with the name of the wizard that patronus belongs to.

query fetchTwoPatronuses($firstId: Int, $secondId: Int) {
  firstPatronus: patronus(id: $firstId) {
    ...patronusInfo
  },
  secondPatronus: patronus(id: $secondId) {
    ...patronusInfo
  }
}

fragment patronusInfo on Patronus {
  form,
  wizards {
    name
  }
}

6. Write a query that accepts two variables for the `id`s of two houses. For each house return the names of all the wizards of that house along with the core of their wands and their patronus forms. Use a fragment!

query numberSix($firstId: Int, $secondId: Int) {
  firstHouse: house(id: $firstId) {
    ...numberSixInfo
  },
  secondHouse: house(id: $secondId) {
    ...numberSixInfo
  }
}

fragment numberSixInfo on House {
  name,
  wizards{
    name,
    wands {
      core
    },
    patronus {
      form
    }
  }
}

7. Write a query that accepts three variables for the `id` for three separate wizards. For the first wizard return their name, house name and patronus form. For the second wizard return their name, their house name, and their wand core. For the third wizard return their name, their house name, their patronus form, and their wand core. Though you are returning different information for each wizard you are still returning the name and house name of each wizard meaning you could use a fragment to DRY this up!

query numbaSeven($firstId: Int, $secondId: Int, $thirdId: Int) {
  firstWizard: wizard(id: $firstId){
    ...numbaSevenInfo,
    patronus{
      form
    }
  },
  secondWizard: wizard(id: $secondId){
    ...numbaSevenInfo,
    wands{
      core
    }
  },
  thirdWizard: wizard(id: $thirdId){
    ...numbaSevenInfo,
    patronus{
      form
    },
    wands{
      core
    }
  }
}

fragment numbaSevenInfo on Wizard {
  name,
  house{
    name
  }
}

8. Write a query that will accept three variables for a query that can be broken down into three parts. The first variable will be the `id` for a house where you will return the name, founder, and patronus forms of all the wizards in that house. The second variable will be to fetch the length of a particular wand. The third variable will query to find the name, and the patronus form for the wizard with the specified id.

query numbaEight($firstId: Int, $secondId: Int, $thirdId: Int) {
  house(id: $firstId){
    name,
    founder,
    wizards{
      patronus{
        form
      }
    }
  },
  wand(id: $secondId) {
    length
  },
  wizard(id: $thirdId) {
    name,
    patronus{
      form
    }
  }
}