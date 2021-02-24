import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const statusCode = 404
  res.statusCode = statusCode;

  if (statusCode > 200) {
    res.json(
      { message: "FromApi" },
    )
  } else {
    res.json(
      [{ name: "FromApi" }]
    )
  }
}