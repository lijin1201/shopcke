// import client from "../../../hooks/paypal";
// import paypal from "@paypal/checkout-server-sdk";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function Handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method != "POST")
//     return res.status(404).json({ success: false, message: "Not Found" });

//   if (!req.body.orderID)
//     return res
//       .status(400)
//       .json({ success: false, message: "Please Provide Order ID" });

//   //Capture order to complete payment
//   const { orderID } = req.body;
//   const PaypalClient = client();
//   const request = new paypal.orders.OrdersCaptureRequest(orderID);
//   request.requestBody({});
//   const response = await PaypalClient.execute(request);
//   if (!response) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Some Error Occured at backend" });
//   }

//   // see: updateOrderData({  in success.tsx

//   // Your Custom Code to Update Order Status
//   // And Other stuff that is related to that order, like wallet
//   // Here I am updateing the wallet and sending it back to frontend to update it on frontend

//   res.status(200).json({ success: true }); //, data: { wallet }
// }
export {};
