# System Architecture

## Brand operating model

The business uses a hub-and-spoke digital structure:

- Main brand channels build the overall SayNinja brand.
- Local accounts support location-specific community activity.
- TikTok, YouTube, and LinkedIn remain centralized.
- Google Business is location-specific.

## Daily media intake architecture

```text
UWS Gym Master --------                        \
66th St Gym Master -----> Location Upload Folders
                        /            ↓
1st Ave Gym Master ----/       Google Drive
                                      ↓
                              Apps Script Check
                                      ↓
                              Google Sheets Tracker
                                      ↓
                           Daily Email Status Summary
                                      ↓
                              Digital/Social Lead
                                      ↓
                         Select → Edit → Publish
```

## Access model

| Actor | Access |
|---|---|
| Gym Master | Editor on own location upload folder only |
| Digital/Social Lead | Central control of system |
| Owner | Viewer on main footage folder |
| Automation | Private operational component |

## Design principle

The architecture intentionally minimizes frontline friction.

Gym Masters do not need to:
- rename files
- categorize content
- create folders
- update tracking sheets
- decide which social platform should receive the content

Those decisions remain centralized.
