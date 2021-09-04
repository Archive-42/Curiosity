<!-- Create 3 new wizards and make sure you can view their name, house, and patronus information. -->

mutation {
  first: addWizard(name: "Bigger Chungus", houseId:1, patronusId: 4) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  },
  second: addWizard(name: "Biggest Chungus", houseId:2, patronusId: 4) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  },
  third: addWizard(name: "Biggerest Chungus", houseId:4, patronusId: 4) {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}

<!-- Edit the name of a wizard and verify that no other value has changed on that wizard. -->

mutation {
  updateWizard(id: 22, name: "Large Chungus") {
    id,
    name,
    house {
      name
    },
    patronus {
      form
    }
  }
}

<!-- Edit the house id and patronus id of a wizard and verify their name did not change. (You'll need to provide an id for the wizard you'd like to mutate). -->

mutation {
  updateWizard(id: 22, houseId: 2, patronusId: 9) {
    id,
    name,
    house {
      id,
      name
    },
    patronus {
      id,
      form
    }
  }
}

<!-- Delete two wizards (just make sure you are deleting wizards who exist! You can query the wizards root type for a list of all wizards.) -->

mutation {
  first: deleteWizard(id: 19) {
    name  <!-- returns null -->
  },
  second: deleteWizard(id: 16) {
    name <!-- returns null -->
  }
}