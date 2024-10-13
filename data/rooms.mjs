const rooms = {
    foyer: {
      description: 'You are in a dimly lit foyer. The air is cold, and the house creaks. There is a door to the north and stairs leading up.',
      actions: {
        north: 'livingRoom',
        upstairs: 'attic',
        search: 'You found a key!'
      }
    },
    livingRoom: {
      description: 'You are in a dusty living room. Cobwebs cover the furniture. There is a door to the west and a strange noise coming from the ceiling.',
      actions: {
        west: 'kitchen',
        investigate: 'You lost 20 health points!',
        search: 'You found a map!'
      }
    },
    basement: {
      description: 'The basement is damp and dark. The smell of mold fills the air. There’s a faint light at the far end.',
      actions: {
        north: 'kitchen',
        flashlight: 'You found a flashlight!',
        search: 'You lost 10 health points!'
      }
    },
    kitchen: {
      description: 'You are in a filthy kitchen. The smell of rotten food fills the air. There is a door to the east and a rustling sound behind the fridge.',
      actions: {
        east: 'foyer',
        fridge: 'You lost 10 health points!',
        knife: 'You picked up a knife!'
      }
    },
    attic: {
      description: 'You are in a cramped, dusty attic. Broken furniture is scattered everywhere. There’s a faint noise coming from a corner.',
      actions: {
        investigate: 'You lost 20 health points!',
        search: 'You found a rope!',
        downstairs: 'foyer'
      }
    }
  };
  
  export default rooms;
  