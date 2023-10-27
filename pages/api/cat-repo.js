import fs from "fs";

//https://jasonwatmore.com/post/2021/08/28/next-js-read-write-data-to-json-files-as-the-database

// https://dev.to/this-is-learning/readwrite-on-local-json-file-with-nextjs-part-51-8gg
// users in JSON file for simplicity, store in a db for production applications
import categoryData from "/public/json/categoryData.json";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Read the existing data from the JSON file

    res.status(200).json(categoryData);
  } else if (req.method === "POST") {
    // Code for POST requests goes here
    //await
    try {
      const { ...data } = req.body;
      console.log(data);
      fs.writeFileSync(
        "public/json/categoryData.json",
        JSON.stringify(data, null, 2)
      );
      res.status(200).json({ message: "Data stored successfully" });
    } catch (error) {
      console.error(error);
      // Send an error response
      res.status(501).json({ message: "Error storing data" });
    }
  }
}
