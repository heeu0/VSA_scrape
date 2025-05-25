# Eventbrite Attendee Importer for Google Sheets

This project is a Google Apps Script that automatically imports attendee data from an Eventbrite event into Google Sheets. It supports syncing name, email, and answers to custom questions like pronouns, allergies, and accessibility accommodations.

---

## Features

- Pulls **all attendees** via Eventbrite API
- Filters out incomplete or placeholder entries (e.g., "Info Requested", empty entries)
- Syncs attendee details including:
  - Name
  - Email
  - Pronouns
  - Allergies
  - Accommodations
  - etc
- Adds checkbox columns for day-of check-in
- Resets and refreshes the sheet every time it's run

---

## Setup Instructions

1. **Get your Eventbrite Token**
   - Go to [eventbrite.com/platform/api-keys](https://www.eventbrite.com/platform/api-keys)
   - Use your **Private Token** (OAuth token)

2. **Find your Event ID**
   - You can find this in the event URL:  
     `https://www.eventbrite.com/myevent?eid=1309245702139`  
     → My Event ID is `1309245702139`

3. **Open Google Sheets**
   - Go to `Extensions > Apps Script`
   - Paste the `importEventbriteAttendees()` function
   - Replace the token and event ID values at the top

4. **Run the Script**
   - From the Apps Script editor, click the ▶️ button
   - Accept the necessary permissions the first time

---

## 📄 Sheet Format

| Reserved Table? | Arrived? (✅) | Name | Email | Pronouns | Affiliation/Relation | Allergies | Accommodations |
|-----------------|--------------|------|-------|----------|-----------------------|-----------|----------------|
|                 | ⬜           | John Doe | john@example.com | He/Him | UWB VSA | None | Wheelchair seating |

> ✅ You can manually assign table numbers after syncing  
> ✅ “Arrived?” column supports live check-in using checkboxes

---

## Customization

To change which questions are pulled from Eventbrite (e.g., “pronouns”, “allergies”), update the keywords in the `getAnswer()` function inside the script.

You can also adjust the output columns by modifying the `headers` and `row` arrays.


