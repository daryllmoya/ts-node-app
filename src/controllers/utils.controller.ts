import { format } from "date-fns";
import { Request, Response } from "express";
import fs from "fs";

import { parseAddressData } from "../utils/common.utils";

interface RequestResponsePair {
  requestBody: any;
  response: any;
}

export class UtilsController {
  static formatDate(req: Request, res: Response): void {
    const customFormatDate = (
      dateString: string,
      formatString: string
    ): string => {
      const parsedDate = new Date(dateString);
      return format(parsedDate, formatString);
    };
    res
      .status(200)
      .json({ output: customFormatDate("2023-11-08T12:12:00", "yyyy-MM-dd") });
  }

  static getAddressData(req: Request, res: Response): void {
    const parsedResult = parseAddressData(req.body);
    res.status(200).json({ parsedResult });
  }

  static saveReqRes(req: Request, res: Response): void {
    const filePath = "./saved-files/req-res.json";
    // Ensure that the file exists
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "[]");
    }
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        // Handle the case where req.body is empty
        res.status(400).json({ error: "Request body is empty" });
      }

      // Read the existing content of the file
      let fileContent = fs.readFileSync(filePath, "utf-8");

      // Check if the file content is empty
      if (!fileContent.trim()) {
        fileContent = "[]"; // Set default content if empty
      }

      const requestResponsePairs: RequestResponsePair[] =
        JSON.parse(fileContent);

      // Append the new request-response pair to the array
      const newPair: RequestResponsePair = {
        requestBody: req.body.requestBody,
        response: req.body.response,
      };

      requestResponsePairs.push(newPair);

      // Write the updated content back to the file
      fs.writeFileSync(filePath, JSON.stringify(requestResponsePairs, null, 2));

      res.status(200).json({
        message: "Request-response pair appended and saved successfully.",
      });
    } catch (error) {
      console.error("Error saving request-response pair:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
