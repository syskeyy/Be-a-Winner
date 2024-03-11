// api endpoint that gets prizes from database
import { getPrizes } from "../../lib/prize";

export default async function prizes(req, res) {
  if (req.method === 'GET') {
    try {
      const prizes = await getPrizes();
      console.log('API Prizes:', prizes); // Add this log
      res.status(200).json(prizes);
    } catch (error) {
      console.error(error);
      res.status(500).end(error.message);
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}