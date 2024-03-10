import { drawWinner } from "../../lib/prize";

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await drawWinner(req, id);
    res.status(200).json({ message: 'Trying to add winner..' });
  } catch (error) {
    console.error('An error occurred while adding the winner:', error);
    res.status(500).json({ error: 'An error occurred while adding the winner' });
  }
}