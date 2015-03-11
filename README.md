# WFM Client

Workflow Max API Client

http://www.workflowmax.com/api/overview

## Usage

```js
//Create a new Client
var apiKey     = 'your-api-key';
var accountKey = 'your-account-key';
var WFMClient = require('wfm-client');
var wfm = WFMClient(
  apiKey,
  accountKey
);

//Create a new task on a job
wfm.createTask(
  'J0001', //Job ID
  '944815',  //Task ID (system wide task type)
  'description',
  '30', //estimatedMinutes
  function (err, data) {
    if (err) return console.log(err);
    console.log(data);
    //Prints string of XML data from WFM API
});
```

Use a library such as [xml2json](https://github.com/buglabs/node-xml2json) for processing the WFM response

# API

All API methods take a list of parameters followed by a callback function 'done'. done is called with (err, data) where err is an error if one occurred and data is the string XML response from WFM.

See http://www.workflowmax.com/api/overview

## createTimesheet
`wfm.createTimesheet(jobId, taskId, staffId, date, minutes, note, done)`

## updateTimesheet
`wfm.updateTimesheet(id, jobId, taskId, staffId, date, minutes, note, done)`

## deleteTimesheet
`wfm.deleteTimesheet(id, done)`

## createTask
`wfm.createTask(jobId, taskId, description, estimatedMinutes, done)`

# Development

Library is currently in minimal state for creating tasks and timesheets.

Will be expanded as further API methods are required.
