import express from 'express';
import { rooms } from '../data/rooms.mjs';
import { inventory } from '../data/inventory.mjs';
import { weapons } from '../data/weapons.mjs';
import { players } from '../data/players.mjs';  // Import shared players array

const router = express.Router();

// Function to find or create a player
const findOrCreatePlayer = (name) => {
    let player = players.find(p => p.name === name);
    if (!player) {
        player = { name, progress: 'start', inventory: [], weapon: null };  // Initialize player with empty inventory and no weapon
        players.push(player);
        console.log(`New player created:`, player);
    }
    return player;
};

// Home route
router.get('/', (req, res) => {
    res.render('home', { title: 'Adventure Game', message: 'Enter your name to start your adventure!' });
});

// Start the adventure (post player name)
router.post('/start', (req, res) => {
    const playerName = req.body.name;
    if (!playerName) {
        return res.status(400).send('Player name is required');
    }
    const player = findOrCreatePlayer(playerName);
    console.log(`Player created or found:`, player);

    // Redirect to the forest with the player's name as a query parameter
    res.redirect(`/forest?player=${player.name}`);
});

// Forest route
router.get('/forest', (req, res, next) => {
    try {
        const playerName = req.query.player;
        console.log('Player name from query in /forest:', playerName);  // Log player name

        const player = players.find(p => p.name === playerName);
        if (!player) {
            throw new Error('Player not found');
        }

        const room = rooms[0];  // Mysterious Forest
        res.render('forest', {
            title: 'Mysterious Forest',
            player: playerName,
            message: room.description
        });
    } catch (err) {
        console.error('Error in /forest:', err.message);
        next(err);
    }
});

// Explore deeper into the forest
router.get('/forest/explore', (req, res, next) => {
    try {
        const playerName = req.query.player;
        console.log('Player name from query in /forest/explore:', playerName);  // Log player name

        if (!playerName) {
            throw new Error('No player name found in the query parameter');
        }

        const player = players.find(p => p.name === playerName);
        if (!player) {
            throw new Error('Player not found in /forest/explore');
        }

        player.progress = 'exploring';  // Update progress
        console.log(`Player progress updated:`, player);

        const room = rooms[1];  // Hidden Waterfall
        res.render('explore', {
            title: 'Hidden Waterfall',
            player: playerName,
            message: room.description
        });
    } catch (err) {
        console.error('Error in /forest/explore:', err.message);
        next(err);
    }
});

// Find an item and add it to the player's inventory
router.get('/forest/find-item', (req, res, next) => {
    try {
        const playerName = req.query.player;
        console.log('Player name from query in /forest/find-item:', playerName);  // Log the player name

        const player = players.find(p => p.name === playerName);
        if (!player) {
            throw new Error('Player not found in /forest/find-item');
        }

        // Randomly assign an item from the inventory data
        const foundItem = inventory[Math.floor(Math.random() * inventory.length)];
        player.inventory.push(foundItem);  // Add the item to the player's inventory

        console.log(`Item added to inventory:`, player.inventory);

        res.render('inventory', {
            title: 'Inventory Updated',
            message: `You found a ${foundItem.name}. It is now in your inventory.`,
            inventoryItems: player.inventory.map(item => `<li>${item.name}: ${item.description}</li>`).join('')
        });
    } catch (err) {
        console.error('Error in /forest/find-item:', err.message);
        next(err);
    }
});


// Find a weapon and equip it to the player
router.get('/forest/find-weapon', (req, res, next) => {
    try {
        const playerName = req.query.player;
        const playerIndex = players.findIndex(p => p.name === playerName);

        if (playerIndex === -1) {
            throw new Error('Player not found in /forest/find-weapon');
        }

        // Randomly assign a weapon to the player
        const foundWeapon = weapons[Math.floor(Math.random() * weapons.length)];

        // Check if we found a weapon
        if (foundWeapon) {
            players[playerIndex].weapon = foundWeapon;  // Directly update the player's weapon in the array
            console.log(`Weapon assigned to player ${players[playerIndex].name}:`, players[playerIndex].weapon);
        } else {
            console.log('No weapon found.');
        }

        // Log the entire players array to see if the update persists
        console.log('Updated players array:', players);

        res.render('weapon', {
            title: 'You Found a Weapon!',
            message: `You found a ${foundWeapon.name} (${foundWeapon.description}). It has a power level of ${foundWeapon.power}.`,
            weapon: foundWeapon
        });
    } catch (err) {
        console.error('Error in /forest/find-weapon:', err.message);
        next(err);
    }
});

export default router;
