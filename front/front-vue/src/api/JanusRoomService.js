import Janus from "../janus/janus";
import JanusRoom from "../janus/JanusRoom";

var vuexStore = null;
var janus = null;
var sfutest = null;
var opaqueId = "videoroomtest-"+Janus.randomString(12);


var mystream = null;
function sessionCreated() {
  // Attach to echo test plugin
  janus.attach({
    plugin: "janus.plugin.videoroom",
    opaqueId:opaqueId,
    success: function(pluginHandle) {
      sfutest = pluginHandle;
      Janus.log(
        "Plugin attached! (" +
          sfutest.getPlugin() +
          ", id=" +
          sfutest.getId() +
          ")"
      );

      registerUsername();
    },
    error: function(error) {
      Janus.error("  -- Error attaching plugin...", error);
    },
    consentDialog: function(on) {
      Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
    },
    mediaState: function(medium, on) {
      Janus.log(
        "Janus " + (on ? "started" : "stopped") + " receiving our " + medium
      );
    },
    webrtcState: function(on) {
      Janus.log(
        "Janus says our WebRTC PeerConnection is " +
          (on ? "up" : "down") +
          " now"
      );
    },
    onmessage: function(msg, jsep) {
      Janus.debug(" ::: Got a message :::");
      Janus.debug(JSON.stringify(msg));
      var event = msg["videoroom"];
      Janus.debug("event: "+event)
      if(event){
        if(event === "joined"){
          let myid = msg["id"];
          let mypvid = msg["private_id"];
          Janus.log("Successful joined room " +msg["room"]+" with Id " + myid + " " + mypvid);
          publishOwnFeed(true);
          if(msg["publishers"]){
            let list = msg["publishers"];
            Janus.debug("got a list of available publisher/feeds:", list);
            for(let f in list){
              let id = list[f]["id"];
              let display = list[f]["display"];
              let audio = list[f]["audio_codec"];
              let video = list[f]["video_codec"];
              Janus.debug(">> ["+id +"]"+display+"(audio: "+audio+", video: "+vidoe+")");
              newRemoteFeed(id,display,audio,video);
            }
          }
        }
        else if(event === "destroyed"){
          window.location.reload();
        }
        else if(event === "event"){
          if(msg["publishers"]){
            let list msg["publishers"];
            Janus.debug("got a list of available publishers/feeds: " , list)
          }
          else if(msg["leaving"]){}
          else if(msg["unpublished"]){}
          else if(msg["error"]){
            console.log("on message error");
          }
        }
      }
      if(jsep){
        sfutest.handleRemoteJsep({jesp : jesp});
        var audio = msg["audio_codec"]
        if(mystream && mystream.getAudioTracks() && mystream.getAudioTracks().length >0 && !audio){
          console.log("audio error")
        }
        var video = msg["video_codec"]

        if(mystream && mystream.getVideoTracks() && mystream.getVideoTracks().length >0 && !video){
          console.log("video error")
        }
      }
    },
    onlocalstream: function(stream) {
      Janus.debug(" ::: Got a local stream :::");
      Janus.debug(JSON.stringify(stream));
      var localVideoId = vuexStore.getters.getActive.localVideo;
      Janus.attachMediaStream(document.getElementById(localVideoId), stream);

      var videoTracks = stream.getVideoTracks();
      if (
        videoTracks === null ||
        videoTracks === undefined ||
        videoTracks.length === 0
      ) {
        Janus.debug("No camera found");
      }
    },
    onremotestream: function(stream) {
     // 볼일 없다
    },
    oncleanup: function() {
      Janus.log(" ::: Got a cleanup notification :::");
    }
  });
}

function registerUsername(username,myroom) {
  var register = { request: "join",room:myroom,ptype:"publisher",username: username };
  myusername = username
  sfutest.send({ message: register });
}

function newRemoteFeed(id,display,audio,video){
  let reomteFeed = null;
  janus.attach({
    plugin:"janus.plugin.videoroom",

  })
}





function createSession() {
  // Create session
  janus = new Janus({
    server:
      "http://ec2-3-133-158-185.us-east-2.compute.amazonaws.com:8088/janus",
    success: sessionCreated,
    error: function(error) {
      Janus.error(error);
    },
    destroyed: function() {
      window.location.reload();
    }
  });
}

export default {
  init(store) {
    vuexStore = store;
    Janus.init({
      debug: true,
      callback: function() {
        // Make sure the browser supports WebRTC
        if (!Janus.isWebrtcSupported()) {
          return;
        }
        createSession();
      }
    });
  },
  publishOwnFeed(useAudio){
    let RoomHandle = new JanusRoom();
    RoomHandle.publishOwnFeed(useAudio);
    c
  }
};
