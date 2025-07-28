
# StreamThingy

Use your Spotify Car Thing similar to the base functionality of a StreamDeck within Desk Thing.![StreamThingy running with basic configuration](https://i.imgur.com/vhqGlRI.png)
## Compatibility
This app has only been tested on Arch Linux with Wayland. Mileage may vary on other distributions or operating systems

## Configuration
### Icons
Module Icons are loaded via URLs. If one fails to load, it may be unable to render on the Desk Thing.
### Actions
Action format goes as follows
``` 
type,action
```
#### Types of actions
|cmd  | key |
|--|--|
| Runs a command | Presses a keybind |
|cmd,/usr/bin/firefox |key,control+v|
for CMD, parameters will not function correctly. If a program requires parameters, create a shell script and execute it with a CMD action.

