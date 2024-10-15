import express from 'express';
import { rooms } from '../data/rooms.mjs';
import { players } from '../data/players.mjs';  // Import shared players array

const router = express.Router();

// Dragon challenge route
router.get('/', (req, res) => {
    const playerName = req.query.player;  // Get player name from the query parameter
    const player = players.find(p => p.name === playerName);

    if (!player) {
        return res.status(400).send('Player not found.');
    }

    const room = rooms[2];  // Dragon's Lair
    res.render('dragon', { 
        title: 'Facing the Dragon', 
        message: room.description,
        player: playerName  // Pass the player's name to the view for the links
    });
});

// Defeat dragon route (using weapon power)
router.get('/defeat', (req, res) => {
    const playerName = req.query.player;
    const playerIndex = players.findIndex(p => p.name === playerName);

    if (playerIndex === -1) {
        return res.status(400).send('Player not found.');
    }

    const player = players[playerIndex];  // Get the updated player

    // Log the player's data to check if the weapon exists
    console.log(`Player's data in /dragon/defeat:`, player);

    // Check if the player has a weapon and if it is strong enough
    if (player.weapon && player.weapon.power >= 20) {
        res.render('victory', { 
            title: 'Victory!', 
            message: `With your ${player.weapon.name}, you bravely defeated the dragon and saved the kingdom!`,
            inventory: player.inventory.map(item => `<li>${item.name}: ${item.description}</li>`).join('') 
        });
    } else {
        res.render('defeat', { 
            title: 'Defeat...', 
            message: 'Your weapon was not strong enough to defeat the dragon. Perhaps next time you will find a stronger weapon.',
            inventory: player.inventory.map(item => `<li>${item.name}: ${item.description}</li>`).join('')
        });
    }
});

// Lose to dragon route
router.get('/lose', (req, res) => {
    const playerName = req.query.player;
    res.render('defeat', { 
        title: 'Defeat...', 
        message: 'The dragon overpowered you. Perhaps another time you will succeed.' 
    });
});

export default router;
