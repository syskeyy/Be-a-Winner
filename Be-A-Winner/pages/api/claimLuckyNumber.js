import { claimLuckyNumber } from '../../lib/luckynumbers';

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await claimLuckyNumber(req, id);
    res.status(200).json({ message: 'Lucky number claimed successfully' });
  } catch (error) {
    console.error('An error occurred while claiming the lucky number:', error);
    res.status(500).json({ error: 'An error occurred while adding the claim' });
  }
}