// api endpoint to add raffle, also grabs prize id from the request body
import { addRaffle } from '../../lib/prize';

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await addRaffle(req, id);
    res.status(200).json({ message: 'Raffle added successfully' });
  } catch (error) {
    console.error('An error occurred while adding the raffle:', error);
    res.status(500).json({ error: 'An error occurred while adding the raffle' });
  }
}