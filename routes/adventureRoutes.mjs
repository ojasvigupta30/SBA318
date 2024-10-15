import express from 'express';
import { rooms } from '../data/rooms.mjs';
import { inventory } from '../data/inventory.mjs';

const router = express.Router();

// In-memory player data
let players = [];

// Function to find or create a player
const findOrCreatePlayer = (name) => {
  let player = players.find(p => p.name === name);
  if (!player) {
    player = { name, progress: 'start', inventory: [] };
    players.push(player);
  }
  return player;
};

// Home route - prompts player to enter name
router.get('/', (reqs, resp) => {
  resp.render('home', { title: 'Adventure Game', message: 'Enter your name to start your adventure!' });
});

// Handle player creation via POST request
router.post('/start', (reqs, resp) => {
  const playerName = reqs.body.name;
  const player = findOrCreatePlayer(playerName);
  resp.redirect(`/forest?player=${player.name}`);
});

// Forest route
router.get('/forest', (reqs, resp) => {
  const playerName = reqs.query.player;
  const player = players.find(p => p.name === playerName);
  const room = rooms[0]; // First room (Mysterious Forest)
  resp.render('forest', { title: room.name, message: room.description });
});

// Explore deeper into the forest
router.get('/forest/explore', (reqs, resp) => {
  const playerName = reqs.query.player;
  const player = players.find(p => p.name === playerName);
  player.progress = 'exploring';
  const room = rooms[1]; // Second room (Hidden Waterfall)
  resp.render('explore', { title: room.name, message: room.description });
});

// Find an item
router.get('/forest/find-item', (reqs, resp) => {
  const playerName = reqs.query.player;
  const player = players.find(p => p.name === playerName);
  const foundItem = inventory[0];  // Finds the Silver Key
  player.inventory.push(foundItem);
  resp.render('inventory', { title: 'Found an Item!', message: `You found a ${foundItem.name}.`, inventory: player.inventory });
});

export default router;
