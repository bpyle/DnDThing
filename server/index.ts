import { DeskThing } from "@deskthing/server";
import { AppSettings, DESKTHING_EVENTS, SETTING_TYPES } from "@deskthing/types";
import { spawn } from 'child_process';
const start = async () => {
  console.log('Server Started!')
  // TODO: Implement settings groups once DeskThing receives functionality
  const settings: AppSettings = {
    color: {
      label: 'App Color',
      id: 'color',
      type: SETTING_TYPES.COLOR,
      value: '#000000'
    },
    buttonColor: {
      label: 'Button Color',
      id: 'btnColor',
      type: SETTING_TYPES.COLOR,
      value: '#A7A6BA'
    },
    icon1: {
      label: "Module 1 Icon",
      id: "icon1",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action1: {
      label: 'Module 1 Action',
      id: "act1",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon2: {
      label: "Module 2 Icon",
      id: "icon2",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action2: {
      label: 'Module 2 Action',
      id: "act2",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon3: {
      label: "Module 3 Icon",
      id: "icon3",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action3: {
      label: 'Module 3 Action',
      id: "act3",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon4: {
      label: "Module 4 Icon",
      id: "icon4",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action4: {
      label: 'Module 4 Action',
      id: "act4",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon5: {
      label: "Module 5 Icon",
      id: "icon5",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action5: {
      label: 'Module 5 Action',
      id: "act5",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon6: {
      label: "Module 6 Icon",
      id: "icon6",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action6: {
      label: 'Module 6 Action',
      id: "act6",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon7: {
      label: "Module 7 Icon",
      id: "icon7",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action7: {
      label: 'Module 7 Action',
      id: "act7",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon8: {
      label: "Module 8 Icon",
      id: "icon8",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action8: {
      label: 'Module 8 Action',
      id: "act8",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon9: {
      label: "Module 9 Icon",
      id: "icon9",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action9: {
      label: 'Module 9 Action',
      id: "act9",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon10: {
      label: "Module 10 Icon",
      id: "icon10",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action10: {
      label: 'Module 10 Action',
      id: "act10",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon11: {
      label: "Module 11 Icon",
      id: "icon11",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action11: {
      label: 'Module 11 Action',
      id: "act11",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon12: {
      label: "Module 12 Icon",
      id: "icon12",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action12: {
      label: 'Module 12 Action',
      id: "act12",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon13: {
      label: "Module 13 Icon",
      id: "icon13",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action13: {
      label: 'Module 13 Action',
      id: "act13",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon14: {
      label: "Module 14 Icon",
      id: "icon14",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action14: {
      label: 'Module 14 Action',
      id: "act14",
      type: SETTING_TYPES.STRING,
      value:''
    },
    icon15: {
      label: "Module 15 Icon",
      id: "icon15",
      type: SETTING_TYPES.STRING,
      value: ''
    },
    action15: {
      label: 'Module 15 Action',
      id: "act15",
      type: SETTING_TYPES.STRING,
      value:''
    }


    
  }

  DeskThing.initSettings(settings)
};

const stop = async () => {
  // Function called when the server is stopped
  console.log('Server Stopped');
};

// Main Entrypoint of the server
DeskThing.on(DESKTHING_EVENTS.START, start);

// Main exit point of the server
DeskThing.on(DESKTHING_EVENTS.STOP, stop);

// Listener for requested commands
DeskThing.on('action', (data) => {
    console.log(data.payload) // the requested desktop action
    const instruction = "" + data.payload
    const index = instruction.indexOf(',');
    const type = instruction.slice(0,index)
    const command = instruction.slice(index+1)
    switch (type) {
		case "cmd": {
			spawn(command, [], { detached: true, stdio: 'ignore', env: {
			  ...process.env,
			  WAYLAND_DISPLAY: 'wayland-0',
			  XDG_RUNTIME_DIR: '/run/user/1000',
			}
			}).unref();

			break;
		}
		case "key": {
			const chain = command.split("+")
			console.log("TODO: Find good global implementation for keystrokes")
			break;
		}
		case "fugitech": {
			console.log("ALERT Fugitech");
			const fugiIP = "127.0.0.1";
			const fugiPort = 3333;
			const fugiCmdArray = command.toLowerCase();

			try {
				

				//Args:
				//0: audioSource
				// (sometimes) Playback
				//1: Command
				//2: dataKey
				//3: dataVal
					fetch(fugiCmdArray, {
						method: 'GET'
					});
				
				} catch (error){
				console.log(error);
			}
			break;
		}
		case "kenkuFM": {		
		
			const kenkuIP = "127.0.0.1";
			const kenkuPort = 3333;
			const kenkuCmdArray = (command.toLowerCase()).split(" ");
			
			try {
				
				console.log("First two kenkuArgs = " + kenkuCmdArray[0] + kenkuCmdArray[1]);
				if(kenkuCmdArray.length < 2 || kenkuCmdArray.length > 5){
					throw "Wrong number of arguments";
				}
				//Args:
				//0: audioSource
				// (sometimes) Playback
				//1: Command
				//2: dataKey
				//3: dataVal
				
				const audioSource = kenkuCmdArray[0];
				console.log("audioSource =" + audioSource);
				var httpString = "http://" + kenkuIP + ":" + kenkuPort + "/v1/" + audioSource;
				console.log("httpString =" + httpString);
				
				var commandType = kenkuCmdArray[1];
				console.log("commandType =" + commandType);
				if(commandType == "playback"){
					httpString = httpString + "/" + commandType + "/";
					commandType = kenkuCmdArray[2];
				}
				
				
				var methodString = "PUT";
				

				if(commandType == "state" || commandType == "get"){
						methodString = "GET";
						fetch(httpString);
						
					console.log("KENKU GET");
				}
				else{
					if(commandType == "next" || commandType == "previous"){
						methodString = "POST";	
					}
					
					if(kenkuCmdArray.length < 4){
						fetch(httpString + commandType, {
						  method: methodString
						});
					}
					else{
						
						console.log("KENKU ELSE");
						let dataKey = (kenkuCmdArray[kenkuCmdArray.length-2]).toLowerCase();
						//const dataKey = 'id';
						const dataValue = kenkuCmdArray[kenkuCmdArray.length-1];
						
						const tester = {
							dataKey: dataValue,
						};
						
						httpString = httpString + "/" + commandType;
										
						var stringifiedData = "";	
						
						switch(dataKey){
							case "id":{
								stringifiedData = JSON.stringify({
									id: dataValue
								  });
							break;
							}
							case "mute":{
								stringifiedData = JSON.stringify({
									mute: dataValue
								  });
							break;
							}
							case "volume":{
								stringifiedData = JSON.stringify({
									volume: dataValue
								  });
							break;
							}
							case "shuffle":{
								stringifiedData = JSON.stringify({
									shuffle: dataValue
								  });
							break;
							}
							case "repeat":{
								stringifiedData = JSON.stringify({
									repeat: dataValue
								  });
							break;
							}
						}
						console.log("stringified =" + stringifiedData);
						fetch(httpString, {
						  method: methodString,
						  headers: {
							"Content-Type": "application/json"
						  },
						  body: stringifiedData
						});
					}
				}
			} catch (error){
				console.log(error);
			}
			break;
		}
        
		default:
			console.log("Unhandled type");
        break;


    }
})

