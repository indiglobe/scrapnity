import { tryCatch } from "@/utils/try-catch";
import { GOOGLE_SHEET_URL } from "../const";

export async function addCustomerToGoogleSheet(data: {}) {
  const [googleSheetError, googleSheetResponse] = await tryCatch(
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  );

  if (googleSheetError) {
    console.log(`googleSheetError`, googleSheetError);
    throw googleSheetError;
  }

  console.log("Google Apps Script response:", googleSheetResponse);
}
