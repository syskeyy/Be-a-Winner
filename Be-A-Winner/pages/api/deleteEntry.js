import { deleteEntry } from '../../lib/prize';

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    await deleteEntry(req, id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('An error occurred while deleting the entries:', error);
    res.status(500).json({ error: 'An error occurred while deleting the entries' });
  }
}