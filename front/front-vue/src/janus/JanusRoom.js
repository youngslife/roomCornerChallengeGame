import Janus from "./janus";

let instance = null;

class JanusRoom {
  constructor(roomName) {
    if (instance === null) {
      instance = this;
      instance.tmpId = 0;
      instance.roomName = roomName;
      for (var i = 0; i < roomName.length; i++) {
        instance.tmpId = instance.tmpId + roomName.charCodeAt(i);
      }

      console.log("Room name translates to id: " + instance.tmpId);

      instance.server = null;

      if (window.location.protocol === "http:") {
        instance.server =
          "http://k02a3011.p.ssafy.io:8088/janus";
      } else {
        instance.server =
          "http://k02a3011.p.ssafy.io:8088/janus";
      }

      instance.janus = null;
      instance.sfutest = null;
      instance.opaqueId = "videoroomtest-" + Janus.randomString(12);

      instance.myusername = null;
      instance.myid = null;
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

      // eslint-disable-next-line no-new
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

        // eslint-disable-next-line no-new
        new JanusRoom(roomName);
      }
    });
  }

  disconnect() {
    // console.log(instance.sfutest)

    var leave = {
      request: "leave",
      room: instance.tmpId
    };

    instance.sfutest.send({
      message: leave,
      error: err => {
        console.error("Error: ", err);
      },
      success: () => {
        // console.log('success?')
      }
    });
  }

  connect(roomName) {
    instance = null;

    // eslint-disable-next-line no-new
    new JanusRoom(roomName);
  }

  showUsers(roomName) {
    // console.log('called')
    console.log(roomName);
    var tmpRoomid = 0;

    for (var i = 0; i < roomName.length; i++) {
      // console.log(roomName.charCodeAt(i))
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
        // console.log(data);
        console.log(data.list.filter(room => room.room === tmpRoomid)[0]);
        console.log(data.list.filter(room => room.room === tmpRoomid)[0].num_participants)
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
          server:
            "http://k02a3041.p.ssafy.io:8088/janus",
          success: function() {
            // console.log('janus success')

            instance.janus.attach({
              plugin: "janus.plugin.videoroom",
              success: function(pluginHandle) {
                instance.sfutest = pluginHandle;
                // Janus.log('Plugin attached! (' + instance.sfutest.getPlugin() + ', id=' + instance.sfutest.getId() + ')')
                // Janus.log('  -- This is a publisher/manager')

                // Retrieve rooms
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
                      console.log('ROOM EXISTS')

                      var username = "SingleCore";

                      var register = {
                        request: "join",
                        room: instance.tmpId,
                        ptype: "publisher",
                        display: username
                      };
                      instance.myusername = username;
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
                          is_private: false
                        },
                        error: err => {
                          console.log("Error creating room: ", err);
                        },
                        success: data => {
                          console.log("Success creating room: ", data);

                          var username = "SingleCore";

                          var register = {
                            request: "join",
                            room: instance.tmpId,
                            ptype: "publisher",
                            display: username
                          };
                          instance.myusername = username;
                          instance.sfutest.send({
                            message: register
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
                // Janus.debug(' ::: Got a message (publisher) :::')
                // Janus.debug(msg)
                var event = msg["videoroom"];
                // Janus.debug('Event: ' + event)
                if (event !== undefined && event != null) {
                  if (event === "joined") {
                    // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                    instance.myid = msg["id"];
                    instance.mypvtid = msg["private_id"];
                    // Janus.log('Successfully joined room ' + msg['room'] + ' with ID ' + instance.myid)
                    instance.publishOwnFeed(true);
                    // Any new feed to attach to?
                    if (
                      msg["publishers"] !== undefined &&
                      msg["publishers"] !== null
                    ) {
                      var list = msg["publishers"];
                      // Janus.debug('Got a list of available publishers/feeds:')
                      // Janus.debug(list)
                      for (var f in list) {
                        var id = list[f]["id"];
                        var display = list[f]["display"];
                        var audio = list[f]["audio_codec"];
                        var video = list[f]["video_codec"];
                        // Janus.debug('  >> [' + id + '] ' + display + ' (audio: ' + audio + ', video: ' + video + ')')
                        instance.newRemoteFeed(id, display, audio, video);
                      }
                    }
                  } else if (event === "destroyed") {
                    // The room has been destroyed
                    Janus.warn("The room has been destroyed!");
                  } else if (event === "event") {
                    // Any new feed to attach to?
                    if (
                      msg["publishers"] !== undefined &&
                      msg["publishers"] !== null
                    ) {
                      let list = msg["publishers"];
                      // Janus.debug('Got a list of available publishers/feeds:')
                      // Janus.debug(list)
                      for (let f in list) {
                        let id = list[f]["id"];
                        let display = list[f]["display"];
                        let audio = list[f]["audio_codec"];
                        let video = list[f]["video_codec"];
                        // Janus.debug('  >> [' + id + '] ' + display + ' (audio: ' + audio + ', video: ' + video + ')')
                        instance.newRemoteFeed(id, display, audio, video);
                      }
                    } else if (
                      msg["leaving"] !== undefined &&
                      msg["leaving"] !== null
                    ) {
                      // One of the publishers has gone away?
                      var leaving = msg["leaving"];
                      // Janus.log('Publisher left: ' + leaving)
                      var remoteFeed = null;
                      for (var i = 1; i < 8; i++) {
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
                        // Janus.debug('Feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') has left the room, detaching')
                        // $('#remote'+remoteFeed.rfindex).empty().hide();
                        // $('#videoremote'+remoteFeed.rfindex).empty();
                        instance.feeds[remoteFeed.rfindex] = null;
                        remoteFeed.detach();
                      }
                    } else if (
                      msg["unpublished"] !== undefined &&
                      msg["unpublished"] !== null
                    ) {
                      // One of the publishers has unpublished?
                      var unpublished = msg["unpublished"];
                      // Janus.log('Publisher left: ' + unpublished)
                      if (unpublished === "ok") {
                        // That's us
                        instance.sfutest.hangup();
                        return;
                      }
                      let remoteFeed = null;
                      for (let i = 1; i < 8; i++) {
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
                        // Janus.debug('Feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') has left the room, detaching')
                        // $('#remote'+remoteFeed.rfindex).empty().hide();
                        // $('#videoremote'+remoteFeed.rfindex).empty();
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
                  // Janus.debug('Handling SDP as well...')
                  // Janus.debug(jsep)
                  instance.sfutest.handleRemoteJsep({
                    jsep: jsep
                  });
                  // Check if any of the media we wanted to publish has
                  // been rejected (e.g., wrong or unsupported codec)
                  let audio = msg["audio_codec"];
                  if (
                    instance.mystream &&
                    instance.mystream.getAudioTracks() &&
                    instance.mystream.getAudioTracks().length > 0 &&
                    !audio
                  ) {
                    // Audio has been rejected
                    // toastr.warning("Our audio stream has been rejected, viewers won't hear us")
                  }
                  let video = msg["video_codec"];
                  if (
                    instance.mystream &&
                    instance.mystream.getVideoTracks() &&
                    instance.mystream.getVideoTracks().length > 0 &&
                    !video
                  ) {
                    // Video has been rejected
                    // toastr.warning("Our video stream has been rejected, viewers won't see us")
                    // Hide the webcam video
                  }
                }
              },
              onlocalstream: function(stream) {
                // Janus.debug(' ::: Got a local stream :::')
                instance.mystream = stream;
                // Janus.debug(stream)

                // var video = document.createElement('video')
                // video.id = stream.idd
                // video.setAttribute('autoplay', 'true')
                // document.getElementById('videos').prepend(video)
                // Janus.attachMediaStream(video, stream)

                // var video

                // if (document.getElementById('feed0') === null) {
                //   video = document.createElement('video')
                //   video.id = 'feed0'
                //   video.setAttribute('autoplay', 'true')
                //   document.getElementById('videos').appendChild(video)
                // } else {
                //   video = document.getElementById('feed0')
                //   video.setAttribute('autoplay', 'true')
                // }

                // video.muted = 'muted'
                // Janus.attachMediaStream(video, stream)
                var video;

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
                  console.log("if");
                }
              },
              onremotestream: function(stream) {
                // The publisher stream is sendonly, we don't expect anything here
                console.log(stream);
              },
              oncleanup: function() {
                // Janus.log(' ::: Got a cleanup notification: we are unpublished now :::')
                instance.mystream = null;
                // document.getElementById('participant1').srcObject = null
                // console.log('Cleaning old video object ... ')
                // $('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
                // $('#publish').click(function() { publishOwnFeed(true); });
                // $("#videolocal").parent().parent().unblock();
                // $('#bitrate').parent().parent().addClass('hide');
                // $('#bitrate a').unbind('click');
              }
            });
          },
          error: function(error) {
            console.log(error);
          },
          destroyed: function() {
            // console.log('janus destroyed')
          }
        });
      }
    });
  }

  publishOwnFeed(useAudio) {
      console.log("my video")
    instance.sfutest.createOffer({
      media: {
        audioRecv: false,
        videoRecv: false,
        audioSend: useAudio,
        videoSend: true
      }, // Publishers are sendonly
      simulcast: instance.doSimulcast,
      simulcast2: instance.doSimulcast2,
      success: function(jsep) {
        // Janus.debug('Got publisher SDP!')
        // Janus.debug(jsep)

        var publish = {
          request: "configure",
          audio: useAudio,
          video: true,
          bitrate : 100000
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
      // opaqueId: instance.opaqueId,
      success: function(pluginHandle) {
        remoteFeed = pluginHandle;
        remoteFeed.simulcastStarted = false;
        // Janus.log('Plugin attached! (' + remoteFeed.getPlugin() + ', id=' + remoteFeed.getId() + ')')
        // Janus.log('  -- This is a subscriber')
        // We wait for the plugin to send us an offer
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
        remoteFeed.videoCodec = video;
        remoteFeed.send({
          message: subscribe
        });
      },
      error: function(error) {
        Janus.error("  -- Error attaching plugin...", error);
      },
      onmessage: function(msg, jsep) {
        // Janus.debug(' ::: Got a message (subscriber) :::')
        // Janus.debug(msg)
        var event = msg["videoroom"];
        // Janus.debug('Event: ' + event)
        if (msg["error"] !== undefined && msg["error"] !== null) {
          // bootbox.alert(msg['error'])
        } else if (event !== undefined && event != null) {
          if (event === "attached") {
            // Subscriber created and attached
            for (var i = 1; i < 8; i++) {
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
            // Janus.log('Successfully attached to feed ' + remoteFeed.rfid + ' (' + remoteFeed.rfdisplay + ') in room ' + msg['room'])
          } else if (event === "event") {
            // Check if we got an event on a simulcast-related event from this publisher
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
            // What has just happened?
          }
        }
        if (jsep !== undefined && jsep !== null) {
          // Janus.debug('Handling SDP as well...')
          // Janus.debug(jsep)
          // Answer and attach
          remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: {
              audioSend: false,
              videoSend: false
            }, // We want recvonly audio/video
            success: function(jsep) {
              // Janus.debug('Got SDP!')
              // Janus.debug(jsep)
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
              // bootbox.alert("WebRTC error... " + JSON.stringify(error));
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
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: function(stream) {
        
        var video;
        // console.log(remoteFeed.rfindex)
        if (document.getElementById("feed" + remoteFeed.rfindex) !== null) {
        //   console.log(
        //     "feed.id : " + remoteFeed.id + " has already been attached."
        //   );
          video = document.getElementById("feed" + remoteFeed.rfindex);
          video.setAttribute("autoplay", "true");
        }

        Janus.attachMediaStream(video, stream);
       
      },
      oncleanup: function() {
        // Janus.log(' ::: Got a cleanup notification (remote feed ' + id + ') :::')

        console.log(remoteFeed);
        // document.getElementById('feed' + remoteFeed.rfindex).srcObject = null
        remoteFeed.mystream = null;
        // mystream = null;
        // document.getElementById('participant1').srcObject = null

        // instance.participants.filter(participant => participant.id === id).srcObject = null

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
