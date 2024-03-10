import { createPrize } from "../../lib/prize";

export default async function prize(req, res) {
  try {
    await createPrize(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
