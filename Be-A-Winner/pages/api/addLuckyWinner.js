 // api endpoint to add lucky winner, also grabs selectedNumber from the request body
  
import { luckyWinner } from '../../lib/luckynumbers';

export default async function handler(req, res) {
    const { selectedNumber } = req.body;

  try {
    await luckyWinner(req, selectedNumber);
    res.status(200).json({ message: 'Raffle added successfully' });
  } catch (error) {
    console.error('An error occurred while adding the raffle:', error);
    res.status(500).json({ error: 'An error occurred while adding the raffle' });
  }
}