import { defineEventHandler, readBody } from "h3";
import { getAuthenticatedClient } from "#imports";

export default defineEventHandler(async (event) => {
  const { range, values, dupColIdx, dupRowIdx } = await readBody(event);
  const sheets = await getAuthenticatedClient();

  try {
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
    });

    const existingValues = existingData.data.values || [];

    const newValues = values[dupColIdx].filter((value: string) =>
      !existingValues.some(row => row[dupRowIdx] === value)
    );

    // If there are no new values, return early
    if (newValues.length === 0) {
      return {
        statusCode: 400,
        message: "Sorry, you cannot register more than once.",
      };
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { majorDimension: "COLUMNS", values: values },
    });

    return {
      statusCode: 200,
      message: response.data.updates
    }

  } catch (error: any) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }
});
