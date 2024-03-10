import { claimPrize } from '../../lib/prize';

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await claimPrize(req, id);
    res.status(200).json({ message: 'Prize claimed successfully' });
  } catch (error) {
    console.error('An error occurred while claiming the prize:', error);
    res.status(500).json({ error: 'An error occurred while adding the claim' });
  }
}