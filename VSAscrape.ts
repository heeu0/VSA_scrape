function importEventbriteAttendees() {
  const token = ''; // Your token
  const eventId = '1309245702139'; 
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear();

  const headers = [
    'Reserved Table?', 'Arrived?', 'Name', 'Email',
    'Pronouns', 'Affiliation/Relation', 'Food Allergies', 'Accommodations'
  ];
  sheet.appendRow(headers);

  let url = `https://www.eventbriteapi.com/v3/events/${eventId}/attendees/?status=attending`;
  let options = {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  let attendees = [];
  let hasMore = true;

  while (hasMore) {
    const response = UrlFetchApp.fetch(url, options);
    const data = JSON.parse(response.getContentText());

    attendees = attendees.concat(data.attendees);
    if (data.pagination.has_more_items) {
      url = data.pagination.continuation
        ? `https://www.eventbriteapi.com/v3/events/${eventId}/attendees/?continuation=${data.pagination.continuation}`
        : null;
    } else {
      hasMore = false;
    }
  }

  attendees.forEach(att => {
  const profile = att.profile;
  const answers = att.answers || [];

 
  if (
    !profile.name || profile.name.toLowerCase().includes("info requested") ||
    !profile.email || profile.email.toLowerCase().includes("info requested")
  ) {
    return; // skip if no name/email
  }

  const getAnswer = (question) => {
    const found = answers.find(ans =>
      ans.question.toLowerCase().includes(question.toLowerCase())
    );
    return (found && found.answer !== "Info requested") ? found.answer : '';
  };

  const row = [
    '',
    false,
    profile.name,
    profile.email,
    getAnswer('pronoun'),
    getAnswer('organization') || getAnswer('relation') || '',
    getAnswer('allergies'),
    getAnswer('accommodation')
  ];
  sheet.appendRow(row);
});


  const range = sheet.getRange(2, 2, attendees.length, 1);
  range.insertCheckboxes();
}
