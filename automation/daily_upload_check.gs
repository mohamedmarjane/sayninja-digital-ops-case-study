const TIMEZONE = "America/New_York";
const TRACKER_ID = "YOUR_TRACKER_SPREADSHEET_ID";
const NOTIFY_EMAIL = "YOUR_NOTIFICATION_EMAIL";

const LOCATIONS = [
  { name: "Location A", folderId: "FOLDER_ID_A" },
  { name: "Location B", folderId: "FOLDER_ID_B" },
  { name: "Location C", folderId: "FOLDER_ID_C" }
];

function runDailyUploadCheck() {
  const today = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd");
  const spreadsheet = SpreadsheetApp.openById(TRACKER_ID);
  const sheet = spreadsheet.getSheets()[0];

  const results = LOCATIONS.map(location => {
    const folder = DriveApp.getFolderById(location.folderId);
    const files = folder.getFiles();

    let count = 0;
    let latestUpload = null;

    while (files.hasNext()) {
      const file = files.next();
      const created = file.getDateCreated();
      const createdDate = Utilities.formatDate(created, TIMEZONE, "yyyy-MM-dd");

      if (createdDate === today) {
        count++;
        if (!latestUpload || created > latestUpload) latestUpload = created;
      }
    }

    return {
      status: count > 0 ? "Uploaded" : "Missing",
      count,
      latest: latestUpload
        ? Utilities.formatDate(latestUpload, TIMEZONE, "h:mm a")
        : ""
    };
  });

  const row = [
    today,
    results[0].status, results[0].count, results[0].latest,
    results[1].status, results[1].count, results[1].latest,
    results[2].status, results[2].count, results[2].latest,
    ""
  ];

  let targetRow = sheet.getLastRow() + 1;

  if (sheet.getLastRow() >= 2) {
    const dates = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, 1)
      .getDisplayValues()
      .flat();

    const existingIndex = dates.indexOf(today);
    if (existingIndex !== -1) targetRow = existingIndex + 2;
  }

  sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);

  const summary =
    "Daily Footage Check\n\n" +
    LOCATIONS.map((location, index) =>
      location.name + ": " +
      results[index].status + " — " +
      results[index].count + " file(s)"
    ).join("\n");

  MailApp.sendEmail(
    NOTIFY_EMAIL,
    "Daily Footage Check — " + today,
    summary
  );
}

function installDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === "runDailyUploadCheck") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp
    .newTrigger("runDailyUploadCheck")
    .timeBased()
    .atHour(19)
    .everyDays(1)
    .inTimezone(TIMEZONE)
    .create();
}
