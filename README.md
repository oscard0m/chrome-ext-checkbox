# Checkbox clicker chrome extension

Chrome extension to automate the check of
* All the checkboxes of the current tab
* Preset a value for all the comboboxes of the current tab. (this value is configurable)
* The user can filter the URL's to apply these autochecks.

## /json/config.json

This is the file the user can configure to setup the desired URL patterns where the plugin will run and the default value for combo-boxes.

### Schema:
```json
{
  "defaultOption": String,
  "urls": Array
}
```

### Parameters
* defaultOption: String with the defaultValue the user wants to check for the current tab's comboboxes. Just works if it's an existing option of the combobox.
* urls: Array of Strings where each String will be compared with current tab's URL.

### Example
```json
{
  "defaultOption": "test",
  "urls": ["potatoe", "reddit.com/r/js"]
}
```
---------------
