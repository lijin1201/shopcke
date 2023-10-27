import { NextApiRequest, NextApiResponse } from "next";
import * as paypal from "../../../hooks/paypal-api";

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(404).json({ success: false, message: "Not Found" });
  }

  if (!req.body.orderID) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Order ID" });
  }

  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json({ success: true, captureData });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
