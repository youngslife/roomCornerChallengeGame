/* eslint-disable */
import Janus from "./janus";

let instance = null;

class JanusRoom {
  constructor(roomName, userId, userName) {
    if (instance === null) {
      instance = this;
      instance.tmpId = 0;
      instance.roomName = roomName;
      for (var i = 0; i < roomName.length; i++) {
        instance.tmpId = instance.tmpId + roomName.charCodeAt(i);
      }

      console.log("Room name translates to id: " + instance.tmpId);

      if (window.location.protocol === "http:") {
        instance.server = "http://k02a3041.p.ssafy.io:8088/janus";
      } else {
        instance.server = "https://k02a3041.p.ssafy.io:8089/janus";
      }

      instance.janus = null;
      instance.sfutest = null;
      instance.opaqueId = "videoroomtest-" + Janus.randomString(12);

      instance.myusername = userName;
      instance.myid = userId;
      instance.mystream = null;
      instance.mypvtid = null;

      instance.feeds = [];
      instance.bitrateTimer = [];
      instance.participants = [];

      instance.doSimulcast =
        instance.getQueryStringValue("simulcast") === "yes" ||
        instance.getQueryStringValue("simulcast") === "true";
      instance.doSimulcast2 =
        instance.getQueryStringValue("simulcast2") === "yes" ||
        instance.getQueryStringValue("simulcast2") === "true";

      instance.init();
    }

    return instance;
  }

  switchRoom(roomName) {
    var leave = {
      request: "leave",
      room: instance.tmpId
    };

    if (instance == null || instance.sfutest == null) {
      instance = null;

      new JanusRoom(roomName);

      return;
    }

    instance.sfutest.send({
      message: leave,
      error: err => {
        console.error("Error: ", err);
      },
      success: () => {
        instance.sfutest.detach();

        instance = null;

        new JanusRoom(roomName);
      }
    });
  }

  disconnect() {
    var leave = {
      request: "leave",
      room: instance.tmpId
    };

    instance.sfutest.send({
      message: leave,
      error: err => {
        console.error("Error: ", err);
      },
      success: () => {}
    });
  }

  connect(roomName) {
    instance = null;
    new JanusRoom(roomName);
  }

  showUsers(roomName) {
    console.log(roomName);
    var tmpRoomid = 0;

    for (var i = 0; i < roomName.length; i++) {
      tmpRoomid = tmpRoomid + roomName.charCodeAt(i);
    }

    instance.sfutest.send({
      message: {
        request: "list",
        message: {
          audio: true,
          video: true
        }
      },
      error: err => {
        console.error("Error retrieving list of rooms: ", err);
      },
      success: data => {
        console.log(data.list.filter(room => room.room === tmpRoomid)[0]);
        console.log(
          data.list.filter(room => room.room === tmpRoomid)[0].num_participants
        );
      }
    });
  }

  toggleMute() {
    var muted = instance.sfutest.isAudioMuted();

    if (muted) {
      instance.sfutest.unmuteAudio();
    } else {
      instance.sfutest.muteAudio();
    }

    muted = instance.sfutest.isAudioMuted();
    return muted;
  }

  unpublishOwnFeed() {
    var unpublish = { request: "unpublish" };

    instance.sfutest.send({
      message: unpublish
    });
  }

  init() {
    Janus.init({
      debug: "all",
      callback: function() {
        instance.janus = new Janus({
          server: instance.server,
          success: function() {
            instance.janus.attach({
              plugin: "janus.plugin.videoroom",
              success: function(pluginHandle) {
                instance.sfutest = pluginHandle;

                instance.sfutest.send({
                  message: {
                    request: "list",
                    message: {
                      audio: true,
                      video: true
                    }
                  },
                  error: err => {
                    console.error("Error retrieving list of rooms: ", err);
                  },
                  success: data => {
                    console.log("List of rooms: ", data.list);
                    if (data.list.some(room => room.room === instance.tmpId)) {
                      console.log("ROOM EXISTS");

                      var register = {
                        request: "join",
                        room: instance.tmpId,
                        ptype: "publisher",
                        display: instance.myusername,
                        id: instance.myid
                      };
                      instance.sfutest.send({
                        message: register,
                        error: err => {
                          console.log("Error joining room: ", err);
                        },
                        success: data => {
                          console.log("Success join room: ", data);
                        }
                      });
                    } else {
                      console.log("ROOM DOESNT EXIST, WE NEED TO CREATE IT!");
                      console.log("Attempting to create: ", instance.tmpId);

                      instance.sfutest.send({
                        message: {
                          request: "create",
                          room: instance.tmpId,
                          description: instance.roomName,
                          publishers: 100,
                          is_private: false,
                          videocodec: "vp9"
                        },
                        error: err => {
                          console.log("Error creating room: ", err);
                        },
                        success: data => {
                          console.log("Success creating room: ", data);

                          var register = {
                            request: "join",
                            room: instance.tmpId,
                            ptype: "publisher",
                            display: instance.myusername,
                            id: instance.myid
                          };
                          instance.sfutest.send({
                            message: register,
                            error: err => {
                              console.log("Error joining room: ", err);
                            },
                            success: data => {
                              console.log("Success join room: ", data);
                            }
                          });
                        }
                      });
                    }
                  }
                });
              },
              error: function(error) {
                Janus.error("  -- Error attaching plugin...", error);
              },
              consentDialog: function(on) {
                Janus.debug(
                  "Consent dialog should be " + (on ? "on" : "off") + " now"
                );
              },
              mediaState: function(medium, on) {
                Janus.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium
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
                var event = msg["videoroom"];

                if (event !== undefined && event != null) {
                  if (event === "joined") {
                    instance.myid = msg["id"];
                    instance.mypvtid = msg["private_id"];

                    instance.publishOwnFeed(true);

                    if (
                      msg["publishers"] !== undefined &&
                      msg["publishers"] !== null
                    ) {
                      var list = msg["publishers"];

                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];

                        instance.newRemoteFeed(id, display, audio, video);
                      }
                    }
                  } else if (event === "destroyed") {
                    Janus.warn("The room has been destroyed!");
                  } else if (event === "event") {
                    if (
                      msg["publishers"] !== undefined &&
                      msg["publishers"] !== null
                    ) {
                      let list = msg["publishers"];

                      for (let f in list) {
                        let id = list[f]["id"];
                        let display = list[f]["display"];
                        let audio = list[f]["audio_codec"];
                        let video = list[f]["video_codec"];

                        instance.newRemoteFeed(id, display, audio, video);
                      }
                    } else if (
                      msg["leaving"] !== undefined &&
                      msg["leaving"] !== null
                    ) {
                      var leaving = msg["leaving"];

                      var remoteFeed = null;
                      for (var i = 1; i < 6; i++) {
                        if (
                          instance.feeds[i] != null &&
                          instance.feeds[i] !== undefined &&
                          instance.feeds[i].rfid === leaving
                        ) {
                          remoteFeed = instance.feeds[i];
                          break;
                        }
                      }
                      if (remoteFeed != null) {
                        instance.feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                      }
                    } else if (
                      msg["unpublished"] !== undefined &&
                      msg["unpublished"] !== null
                    ) {
                      var unpublished = msg["unpublished"];

                      if (unpublished === "ok") {
                        instance.sfutest.hangup();
                        return;
                      }
                      let remoteFeed = null;
                      for (let i = 1; i < 6; i++) {
                        if (
                          instance.feeds[i] != null &&
                          instance.feeds[i] !== undefined &&
                          instance.feeds[i].rfid === unpublished
                        ) {
                          remoteFeed = instance.feeds[i];
                          break;
                        }
                      }
                      if (remoteFeed != null) {
                        instance.feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                      }
                    } else if (
                      msg["error"] !== undefined &&
                      msg["error"] !== null
                    ) {
                      console.log("error");
                    }
                  }
                }
                if (jsep !== undefined && jsep !== null) {
                  instance.sfutest.handleRemoteJsep({
                    jsep: jsep
                  });

                  let audio = msg["audio_codec"];
                  if (
                    instance.mystream &&
                    instance.mystream.getAudioTracks() &&
                    instance.mystream.getAudioTracks().length > 0 &&
                    !audio
                  ) {
                  }
                  let video = msg["video_codec"];
                  if (
                    instance.mystream &&
                    instance.mystream.getVideoTracks() &&
                    instance.mystream.getVideoTracks().length > 0 &&
                    !video
                  ) {
                  }
                }
              },
              onlocalstream: function(stream) {
                instance.mystream = stream;

                var video;
                document.getElementById("name0").innerHTML = instance.myusername
              
                if (document.getElementById("feed0") !== null) {
                  video = document.getElementById("feed0");
                  video.setAttribute("autoplay", "true");

                  video.muted = "muted";
                  Janus.attachMediaStream(video, stream);
                }

                if (
                  instance.sfutest.webrtcStuff.pc.iceConnectionState !==
                    "completed" &&
                  instance.sfutest.webrtcStuff.pc.iceConnectionState !==
                    "connected"
                ) {
                }
              },
              onremotestream: function(stream) {
                console.log(stream);
              },
              oncleanup: function() {
                instance.mystream = null;
              }
            });
          },
          error: function(error) {
            console.log(error);
          },
          destroyed: function() {}
        });
      }
    });
  }
  attachElementContent(element,content){
    element = content
  }
  publishOwnFeed(useAudio) {
    instance.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: useAudio,
        videoSend: true
      },
      simulcast: instance.doSimulcast,
      simulcast2: instance.doSimulcast2,
      success: function(jsep) {
        var publish = {
          request: "configure",
          audio: useAudio,
          video: true,
          bitrate: 100000
        };

        instance.sfutest.send({
          message: publish,
          jsep: jsep
        });
      },
      error: function(error) {
        Janus.error("WebRTC error:", error);
        if (useAudio) {
          instance.publishOwnFeed(false);
        }
      }
    });
  }

  newRemoteFeed(id, display, audio, video) {
    var remoteFeed = null;
    instance.janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: instance.opaqueId,
      success: function(pluginHandle) {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;

        var subscribe = {
          request: "join",
          room: instance.tmpId,
          ptype: "subscriber",
          feed: id,
          private_id: instance.mypvtid
        };
        if (
          Janus.webRTCAdapter.browserDetails.browser === "safari" &&
          (video === "vp9" || (video === "vp8" && !Janus.safariVp8))
        ) {
          if (video) {
            video = video.toUpperCase();
          }
          subscribe["offer_video"] = false;
        }
        remoteFeed.videoCodec = "vp9";
        remoteFeed.send({
          message: subscribe
        });
      },
      error: function(error) {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: function(msg, jsep) {
        var event = msg["videoroom"];

        if (msg["error"] !== undefined && msg["error"] !== null) {
        } else if (event !== undefined && event != null) {
          if (event === "attached") {
            for (var i = 1; i < 6; i++) {
              if (
                instance.feeds[i] === undefined ||
                instance.feeds[i] === null
              ) {
                instance.feeds[i] = remoteFeed;
                remoteFeed.rfindex = i;
                break;
              }
            }
            remoteFeed.rfid = msg["id"];
            remoteFeed.rfdisplay = msg["display"];
          } else if (event === "event") {
            var substream = msg["substream"];
            var temporal = msg["temporal"];
            if (
              (substream !== null && substream !== undefined) ||
              (temporal !== null && temporal !== undefined)
            ) {
              if (!remoteFeed.simulcastStarted) {
                remoteFeed.simulcastStarted = true;
              }
            }
          } else {
          }
        }
        if (jsep !== undefined && jsep !== null) {
          remoteFeed.createAnswer({
            jsep: jsep,

            media: {
              audioSend: false,
              videoSend: false
            },
            success: function(jsep) {
              var body = {
                request: "start",
                room: instance.tmpId
              };
              remoteFeed.send({
                message: body,
                jsep: jsep
              });
            },
            error: function(error) {
              Janus.error("WebRTC error:", error);
            }
          });
        }
      },
      webrtcState: function(on) {
        Janus.log(
          "Janus says this WebRTC PeerConnection (feed #" +
            remoteFeed.rfindex +
            ") is " +
            (on ? "up" : "down") +
            " now"
        );
      },
      onlocalstream: function(stream) {
        console.log(stream);
      },
      onremotestream: function(stream) {
        var video;
        console.log(remoteFeed)
        console.log(
          "이번에들어왔다 다른놈" + remoteFeed.rfid + " " + remoteFeed.rfdisplay
        );
        // remoteFeed.rfid 
        document.getElementById("name"+remoteFeed.rfindex).innerHTML=remoteFeed.rfdisplay;
        if (document.getElementById("feed" + remoteFeed.rfindex) !== null) {
          video = document.getElementById("feed" + remoteFeed.rfindex);
          video.setAttribute("autoplay", "true");
        }
        
        Janus.attachMediaStream(video, stream);
      },
      oncleanup: function() {
        console.log(remoteFeed);

        remoteFeed.mystream = null;

        if (
          instance.bitrateTimer[remoteFeed.rfindex] !== null &&
          instance.bitrateTimer[remoteFeed.rfindex] !== null
        ) {
          clearInterval(instance.bitrateTimer[remoteFeed.rfindex]);
        }
        instance.bitrateTimer[remoteFeed.rfindex] = null;
        remoteFeed.simulcastStarted = false;
      }
    });
  }

  getQueryStringValue(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);

    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}

export default JanusRoom;
