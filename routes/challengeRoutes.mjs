import express from 'express';
import { challenges } from '../data/challenges.mjs';

const router = express.Router();

// In-memory player data
let players = [];

// Function to find player by name
const findPlayer = (name) => players.find(p => p.name === name);

// Dragon challenge route
router.get('/', (reqs, resp) => {
  const playerName = reqs.query.player;
  const player = findPlayer(playerName);
  const challenge = challenges[2]; // Fetch the challenge for the Cave of Wonders
  resp.render('dragon', { title: challenge.description, message: `${challenge.description}, ${player.name}. What will you do?` });
});

// Fight the dragon
router.post('/fight', (reqs, resp) => {
  const playerName = req.body.player;
  const player = findPlayer(playerName);
  if (reqs.body.action === 'fight') {
    player.progress = 'victory';
    resp.render('victory', { title: 'Victory!', message: `${player.name}, you defeated the dragon!` });
  } else {
    player.progress = 'defeat';
    resp.render('defeat', { title: 'Defeated', message: `${player.name}, the dragon overpowered you. Better luck next time.` });
  }
});

// Flee from the dragon
router.get('/flee', (reqs, resp) => {
  const playerName = reqs.query.player;
  const player = findPlayer(playerName);
  player.progress = 'flee';
  resp.render('flee', { title: 'You Fled', message: `${player.name}, you ran away from the dragon, but it might find you again...` });
});

export default router;
