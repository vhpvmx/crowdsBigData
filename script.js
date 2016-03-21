#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');


var INPUT_PATH = process.argv[2];
INPUT_PATH += "/part-r-00000"; 

var OUTPUT_PATH = process.argv[3];
OUTPUT_PATH += ".czml";

//console.log(OUTPUT_PATH);

const rl = readline.createInterface({
  input: fs.createReadStream(INPUT_PATH) 
}); 

rl.on('line', function (line) {

    var user  = JSON.parse(line);
    var czml = UserToCZML(user);
/*
    czml[0] = {
        "id": "document",
        "name": "CZML Point",
        "version": "1.0"
    };
*/

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(czml));

});





/*
*   Transforms a user type to CZML
 */

function UserToCZML(user) {

    var agents = [];

    for(var i=0; i < user.trayectories.length; i++) {

        var agent = CZMLAgent();
        var trayectory = user.trayectories[i];

        agent.id   = "agent" + user.id;
        agent.name = "User " + user.id;
        agent.type = trayectory.transportationMode;
        agent.availability = trayectory.startTime + "/" + trayectory.endTime;
        agent.position.epoch = trayectory.startTime;

        for(var j=0; j < trayectory.points.length; j++) {

            var coordinate = trayectory.points[j];

            agent.position.cartographicDegrees.push(coordinate.timestamp);
            agent.position.cartographicDegrees.push(coordinate.longitude);
            agent.position.cartographicDegrees.push(coordinate.latitude);
            agent.position.cartographicDegrees.push(coordinate.altitude);

        } // for

        agents.push(agent);

    } // for

    return agents;

} // func



function CZMLAgent() {

    return {
        "id": "",
        "name": "",
        "type": "",
        "availability": "",
        "position": {
            "epoch": "",
            "cartographicDegrees": []
        },
        "point": {
            "color": {
                "rgba": [100, 0, 200, 255]
            },
            "outlineColor": {
                "rgba": [200, 0, 200, 255]
            },
            "pixelSize": {
                "number": 100
            }
        }
    };

} // func
