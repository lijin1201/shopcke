import * as paypal from "../../../hooks/paypal-api";

export default async function Handler(req: any, res: any) {
  if (req.method != "POST") {
    return res.status(404).json({ success: false, message: "Not Found" });
  }

  if (!req.body.order_price)
    // || !req.body.user_id)
    return res.status(400).json({
      success: false,
      message: "Please Provide order_price And User ID",
    });
  try {
    const order = await paypal.createOrder({
      total_price: req.body.order_price,
    }); // req.body);
    res.json(order);
  } catch (err) {
    res.status(500).send(err);
  }
}
