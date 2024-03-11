
import { getLuckyNumbers } from "../../lib/luckynumbers";

export default async function luckyNumbers(req, res) {
  if (req.method === 'GET') {
    try {
      const luckyNumbers = await getLuckyNumbers();
      console.log('API luckynumbers:', luckyNumbers); // Add this log
      res.status(200).json(luckyNumbers);
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