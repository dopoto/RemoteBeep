# Remote Beep

A demo for playing sounds remotely, using .NET 6, SignalR, Angular and NGRX.

## Setting up a local environment

### Prerequisities

- Visual Studio 2022

### Set up environment-specific variables

This is optional, and only needed in case you want to enable logging to Azure Application Insights from your dev environment. 
In Visual Studio, right-click on the Backend project and choose Manage User Secrets.

```
{
  "ApplicationInsightsConnectionString": "InstrumentationKey=[your key here];IngestionEndpoint=[your endpoint here]",
  "ApplicationInsightsInstrumentationKey": "[your intrumentation key here]"
}
```


