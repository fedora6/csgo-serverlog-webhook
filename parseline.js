//Base regular expressions, common parts used to make up full regexs
const timestampRgx = /^L\s(\d{2}\/\d{2}\/\d{4})\s-\s(\d{2}:\d{2}:\d{2}):\s?/;
const playerRgx = /"(.+)<\d+><(STEAM.+)>\s?/;
const playerteamRgx = /"(.+)<\d+><(STEAM.+)><([A-Z]+)>"\s?/;
const coordRgx = /\[(-?\d+\s-?\d+\s-?\d+)\]\s?/;
const weapRgx = /with\s"(\w+)"\s?/;
const damageRgx = /\(damage\s"(\d+)"\)\s\(damage_armor\s"(\d+)"\)\s\(health\s"(\d+)"\)\s\(armor\s"(\d+)"\)\s\(hitgroup\s"([a-z]+)"\)$/;
const pistolRgx = /^(glock|usp_silencer|hkp2000|elite|p250|tec9|fiveseven|cz75a|deagle|revolver)$/;

//Object containing regular expressions for every log line
var rgx = {};

rgx.attacked = new RegExp(timestampRgx.source+playerteamRgx.source+coordRgx.source+'attacked '+playerteamRgx.source+coordRgx.source+weapRgx.source+damageRgx.source);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Attacking Player Coords
  7: Receiving Player Name
  8: Receiving Player SteamID
  9: Receiving Player Team
  10: Receiving Player Coords
  11: Weapon used
  12: Damage dealt
  13: Armour damage dealt
  14: Health remaining
  15: Armour remaining
  16: Hitgroup
*/
rgx.killed = new RegExp(timestampRgx.source+playerteamRgx.source+coordRgx.source+'killed '+playerteamRgx.source+coordRgx.source+weapRgx.source+'\\(?(\\w*)\\s?(\\w*)\\)?');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Attacking Player Coords
  7: Receiving Player Name
  8: Receiving Player SteamID
  9: Receiving Player Team
  10: Receiving Player Coords
  11: Weapon used
  12: Headshot
  13: Penetration
*/
rgx.assist = new RegExp(timestampRgx.source+playerteamRgx.source+'assisted killing '+playerteamRgx.source);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Attacking Player Name
  4: Attacking Player SteamID
  5: Attacking Player Team
  6: Receiving Player Name
  7: Receiving Player SteamID
  8: Receiving Player Team
*/
rgx.flashAssist = new RegExp(timestampRgx.source+playerteamRgx.source+'flash-assisted killing '+playerteamRgx.source);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Flash Throwing Player Name
  4: Flash Throwing Player SteamID
  5: Flash Throwing Player Team
  6: Receiving Player Name
  7: Receiving Player SteamID
  8: Receiving Player Team
*/
rgx.flashed = new RegExp(timestampRgx.source+playerteamRgx.source+'blinded for (\\d+\\.\\d+) by '+playerteamRgx.source+'from flashbang entindex (\\d+)');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Blinded Player Name
  4: Blinded Player SteamID
  5: Blinded Player Team
  6: Blind duration
  7: Flash throwing Player Name
  8: Flash throwing Player SteamID
  9: Flash throwing Player Team
  10: entindex
*/
rgx.threw = new RegExp(timestampRgx.source+playerteamRgx.source+'threw (\\w+) '+coordRgx.source+'(?:flashbang entindex (\\d+)\\))?');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Thing thrown
  7: Thing Coords
  8: OPTIONAL: entindex (if flashbang)
*/
rgx.projectile = new RegExp(timestampRgx.source+'Molotov projectile spawned at (-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}), velocity (-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6}\\s-?\\d+\\.\\d{6})');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Coord Vector
  4: Velocity Vector
*/
rgx.buy = new RegExp(timestampRgx.source+playerteamRgx.source+'purchased "(\\w+)"$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Item
*/
rgx.leftbuy = new RegExp(timestampRgx.source+playerteamRgx.source+'left buyzone with \\[ (.*) \\]');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Array of items (space separated)
*/
rgx.roundstart = new RegExp(timestampRgx.source+'World triggered "Round_Start"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.roundend = new RegExp(timestampRgx.source+'World triggered "Round_End"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.freezetime = new RegExp(timestampRgx.source+'Starting Freeze period');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.playertriggered = new RegExp(timestampRgx.source+playerteamRgx.source+'triggered "(\\w+)"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Action
*/
rgx.teamtriggered = new RegExp(timestampRgx.source+'Team "([A-Z]+)" triggered "(\\w+)" \\(CT "(\\d+)"\\) \\(T "(\\d+)"\\)$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team
  4: Action
  5: CT Score
  6: T Score
*/
rgx.teamscored = new RegExp(timestampRgx.source+'Team "([A-Z]+)" scored "(\\d+)" with "(\\d)" players$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team
  4: Score
  5: Players alive
*/
rgx.switchedteam = new RegExp(timestampRgx.source+playerRgx.source+'" switched from team <(\\w+)> to <(\\w+)>$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Source team
  6: Destination team
*/
rgx.say = new RegExp(timestampRgx.source+playerteamRgx.source+'say "(.+)"$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Message
*/
rgx.sayteam = new RegExp(timestampRgx.source+playerteamRgx.source+'say_team "(.+)"$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Message
*/
rgx.killedother = new RegExp(timestampRgx.source+playerteamRgx.source+coordRgx.source+'killed other "(\\w+)<\\d+>" '+coordRgx.source+weapRgx.source);
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Player Coords
  7: Thing killed
  8: Thing Coords
  9: Weapon used
*/
rgx.get5event = new RegExp(timestampRgx.source+'get5_event: (\\{.*\\})$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: get5 event JSON
*/
rgx.connect = new RegExp(timestampRgx.source+playerRgx.source+'<>" connected, address ""$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.enteredgame = new RegExp(timestampRgx.source+playerRgx.source+'<>" entered the game$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.steamvalidated = new RegExp(timestampRgx.source+playerRgx.source+'<>" STEAM USERID validated$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
*/
rgx.disconnect = new RegExp(timestampRgx.source+playerteamRgx.source+'disconnected \\(reason "(\\w+)"\\)$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Player Name
  4: Player SteamID
  5: Player Team
  6: Disconnect reason
*/
rgx.matchstart = new RegExp(timestampRgx.source+'World triggered "Match_Start" on "(\\w+)"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Map name
*/
rgx.teamplaying = new RegExp(timestampRgx.source+'Team playing "([A-Z]+)": (.*)');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Team (side)
  4: Team name
*/
rgx.gameover = new RegExp(timestampRgx.source+'Game Over: [a-z]+ \\w+ (\\w+) score (\\d+):(\\d+) after (\\d+) min$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Map name
  4: CT Score
  5: T Score
  6: Duration (mins)
*/
rgx.rcon = new RegExp(timestampRgx.source+'rcon from "(\\d+\\.\\d+\\.\\d+\\.\\d+:\\d+)": command "(.+)"');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: IP:Port of rcon origin
  4: Command
  5: Argument
*/
rgx.sayconsole = new RegExp(timestampRgx.source+'"Console<0><Console><Console>" say "(.+)"$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
  3: Message
*/
rgx.smpause = new RegExp(timestampRgx.source+'Match pause is enabled - mp_pause_match$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/
rgx.smunpause = new RegExp(timestampRgx.source+'Match pause is disabled - mp_unpause_pause_match$');
/*
  0: Full Match
  1: Date (MM/DD/YYYY)
  2: Time (HH:MM:SS)
*/

//Function that takes in a log line, tests it against all regexs, returns data in event format
var parseLine = function(line) {
  var ev = {type: 'woops', data: {}};
  var match = [];

  switch(true) {
    case rgx.attacked.test(line):
    match = line.match(rgx.attacked);
    ev.type = 'damage';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5],
      coord: match[6]
    };
    ev.data.target = {
      name: match[7],
      steam: match[8],
      team: match[9],
      coord: match[10]
    };
    ev.data.weapon = match[11];
    ev.data.health = {
      dealt: match[12],
      left: match[14]
    };
    ev.data.armour = {
      dealt: match[13],
      left: match[15]
    };
    ev.data.hitgroup = match[16];
    break;
    case rgx.killed.test(line):
    match = line.match(rgx.killed);
    ev.type = 'kill';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5],
      coord: match[6]
    };
    ev.data.target = {
      name: match[7],
      steam: match[8],
      team: match[9],
      coord: match[10]
    };
    ev.data.weapon = match[11];
    ev.data.headshot = match[12];
    ev.data.penetration = match[13];
    break;
    case rgx.assist.test(line):
    match = line.match(rgx.assist);
    ev.type = 'assist';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.target = {
      name: match[6],
      steam: match[7],
      team: match[8]
    };
    break;
    case rgx.flashAssist.test(line):
    match = line.match(rgx.flashAssist);
    ev.type = 'flashassist';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.target = {
      name: match[6],
      steam: match[7],
      team: match[8]
    };
    break;
    case rgx.flashed.test(line):
    match = line.match(rgx.flashed);
    ev.type = 'flashed';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[7],
      steam: match[8],
      team: match[9]
    };
    ev.data.target = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.duration = match[6];
    ev.data.entindex = match[10];
    break;
    case rgx.threw.test(line):
    match = line.match(rgx.threw);
    ev.type = 'throw';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.grenade = {
      type: match[6],
      coord: match[7]
    };
    match[8] ? ev.data.entindex = match[8] : '';
    break;
    case rgx.projectile.test(line):
    match = line.match(rgx.projectile);
    ev.type = 'projectile';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.projectile = {
      coord: match[3],
      velocity: match[4]
    };
    break;
    case rgx.buy.test(line):
    match = line.match(rgx.buy);
    ev.type = 'purchased';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.item = match[6];
    break;
    case rgx.leftbuy.test(line):
    match = line.match(rgx.leftbuy);
    ev.type = 'leftbuyzone';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.items = match[6].split(' ');
    break;
    case rgx.roundstart.test(line):
    match = line.match(rgx.roundstart);
    ev.type = 'roundstart';
    ev.data.date = match[1];
    ev.data.time = match[2];
    break;
    case rgx.roundend.test(line):
    match = line.match(rgx.roundend);
    ev.type = 'roundend';
    ev.data.date = match[1];
    ev.data.time = match[2];
    break;
    case rgx.freezetime.test(line):
    match = line.match(rgx.freezetime);
    ev.type = 'freezetime';
    ev.data.date = match[1];
    ev.data.time = match[2];
    break;
    case rgx.playertriggered.test(line):
    match = line.match(rgx.playertriggered);
    ev.type = 'playertriggered';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.action = match[6];
    break;
    case rgx.teamtriggered.test(line):
    match = line.match(rgx.teamtriggered);
    ev.type = 'teamtriggered';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.team = match[3];
    ev.data.action = match[4];
    ev.data.score = {
      ct: match[5],
      t: match[6]
    };
    break;
    case rgx.teamscored.test(line):
    match = line.match(rgx.teamscored);
    ev.type = 'teamscored';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.team = match[3];
    ev.data.score = match[4];
    ev.data.alive = match[5];
    break;
    case rgx.switchedteam.test(line):
    match = line.match(rgx.switchedteam);
    ev.type = 'switchedteam';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.target = {
      team: match[6]
    };
    break;
    case rgx.say.test(line):
    match = line.match(rgx.say);
    ev.type = 'say';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.message = match[6];
    break;
    case rgx.sayteam.test(line):
    match = line.match(rgx.sayteam);
    ev.type = 'sayteam';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.message = match[6];
    break;
    case rgx.killedother.test(line):
    match = line.match(rgx.killedother);
    ev.type = 'killedother';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5],
      coord: match[6]
    };
    ev.data.target = {
      name: match[7],
      coord: match[8]
    };
    ev.data.weapon = match[9];
    break;
    case rgx.get5event.test(line):
    match = line.match(rgx.get5event);
    var g5ev = JSON.parse(match[3]);
    if (g5ev.hasOwnProperty('params') && g5ev.params.hasOwnProperty('event')) {
      switch (g5ev.params.event) {
        case 'series_start':
        case 'series_end':
        ev.type = 'get5series';
        break;
        case 'map_veto':
        case 'map_pick':
        case 'side_picked':
        ev.type = 'get5veto';
        break;
        case 'knife_start':
        case 'knife_won':
        case 'going_live':
        case 'round_end':
        case 'side_swap':
        case 'map_end':
        ev.type = 'get5map';
        break;
        case 'match_config_load_fail':
        case 'backup_loaded':
        ev.type = 'get5misc';
        break;
        default:
        ev.type = 'get5';
        break;
      }
    }
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.get5 = g5ev;
    break;
    case rgx.connect.test(line):
    match = line.match(rgx.connect);
    ev.type = 'connected';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4]
    };
    break;
    case rgx.enteredgame.test(line):
    match = line.match(rgx.enteredgame);
    ev.type = 'enteredgame';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4]
    };
    break;
    case rgx.steamvalidated.test(line):
    match = line.match(rgx.steamvalidated);
    ev.type = 'steamvalidated';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4]
    };
    break;
    case rgx.disconnect.test(line):
    match = line.match(rgx.disconnect);
    ev.type = 'disconnected';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = {
      name: match[3],
      steam: match[4],
      team: match[5]
    };
    ev.data.reason = match[6];
    break;
    case rgx.matchstart.test(line):
    match = line.match(rgx.matchstart);
    ev.type = 'matchstart';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.map = match[3];
    break;
    case rgx.teamplaying.test(line):
    match = line.match(rgx.teamplaying);
    ev.type = 'teamplaying';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.team = {
      side: match[3],
      name: match[4]
    };
    break;
    case rgx.gameover.test(line):
    match = line.match(rgx.gameover);
    ev.type = 'gameover';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.map = match[3];
    ev.data.score = {
      ct: match[4],
      t: match[5]
    };
    ev.data.duration = match[6];
    break;
    case rgx.rcon.test(line):
    match = line.match(rgx.rcon);
    ev.type = 'rcon';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.source = match[3];
    ev.data.message = match[4];
    break;
    case rgx.sayconsole.test(line):
    match = line.match(rgx.sayconsole);
    ev.type = 'sayconsole';
    ev.data.date = match[1];
    ev.data.time = match[2];
    ev.data.message = match[3];
    break;
    case rgx.smpause.test(line):
    match = line.match(rgx.smpause);
    ev.type = 'pause';
    ev.data.date = match[1];
    ev.data.time = match[2];
    break;
    case rgx.smunpause.test(line):
    match = line.match(rgx.smunpause);
    ev.type = 'unpause';
    ev.data.date = match[1];
    ev.data.time = match[2];
    break;
    default:
    ev = {type: 'woops', data: {}};
    console.log('No match found');
  }

  return ev;
}


//Export parseLine function and rgx object
module.exports = {
  parseLine: parseLine,
  rgx: rgx
};
