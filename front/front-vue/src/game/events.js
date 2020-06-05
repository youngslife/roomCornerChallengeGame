const { Events } = require("phaser");
const events = new Events.EventEmitter();
events.on("meetMonster", () => {
  console.log(events);

  events.store.commit("phaser/setIsMeet", true);
});

export default events;
