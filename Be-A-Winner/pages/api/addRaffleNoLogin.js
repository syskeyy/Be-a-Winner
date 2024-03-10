import { addRaffleNoLogin } from '../../lib/prize';

export default async function handler(req, res) {
  const { id, email } = req.body;

  try {
    await addRaffleNoLogin(req, id, email);
    res.status(200).json({ message: 'Raffle added successfully' });
  } catch (error) {
    console.error('An error occurred while adding the raffle:', error);
    res.status(500).json({ error: 'An error occurred while adding the raffle' });
  }
}