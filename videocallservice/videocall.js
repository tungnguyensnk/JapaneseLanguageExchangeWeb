"use strict";

// Lay dia chi IP cua client
let myHostname = window.location.hostname;
console.log("Hostname: " + myHostname);

let connection = null;
let clientID = 0;

// cau hinh ICE
let mediaConstraints = {
    audio: true,
    video: true
};

let myUsername = null;
let targetUsername = null;      // username ket noi toi
let myPeerConnection = null;    // RTCPeerConnection
let hasAddTrack = false;

// ghi log ra console
function log(text) {
    let time = new Date();
    console.log("[" + time.toLocaleTimeString() + "] " + text);
}

// Gui object msg toi server
function sendToServer(msg) {
    let msgJSON = JSON.stringify(msg);
    log("Sending '" + msg.type + "' message: " + msgJSON);
    connection.send(msgJSON);
}

// Khi server gui id toi client thi client se gui username toi server
function setUsername() {
    myUsername = document.getElementById("name").value;
    sendToServer({
        name: myUsername,
        date: Date.now(),
        id: clientID,
        type: "username"
    });
}

// Mo ket noi toi server
function connect() {
    let serverUrl = "wss://" + myHostname + "/video";
    connection = new WebSocket(serverUrl, "json");
    connection.onopen = () => log("Connected to the signaling server");
    connection.onerror = (err) => console.dir(err);

    connection.onmessage = evt => {
        let msg = JSON.parse(evt.data);
        log("Message received: ");
        console.dir(msg);

        // Xu ly cac tin nhan tu server
        switch (msg.type) {
            case "id":                  // Server gui id toi client
                clientID = msg.id;
                setUsername();
                break;
            case "userlist":            // Server gui danh sach username toi client
                handleUserlistMsg(msg);
                break;
            case "video-offer":         // Loi moi ket noi video
                handleVideoOfferMsg(msg);
                break;
            case "video-answer":        // Tra loi loi moi ket noi video
                handleVideoAnswerMsg(msg);
                break;
            case "new-ice-candidate":   // Gui thong tin ICE
                handleNewICECandidateMsg(msg);
                break;
            case "hang-up":             // Tin nhan ket thuc ket noi
                handleHangUpMsg();
                break;
            default:
                log("Unknown message received: " + msg);
        }
    };
}

// Tao ket noi video
function createPeerConnection() {
    log("Setting up a connection...");

    // Tao RTCPeerConnection
    myPeerConnection = new RTCPeerConnection({
        iceServers: [
            {
                url: 'stun:stun.l.google.com:19302'
            },
            {
                url: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            }
        ]
    });

    // neu khong co ham addTrack thi su dung addStream
    hasAddTrack = (myPeerConnection.addTrack !== undefined);

    // Handle ICE su kien
    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.onremovestream = handleRemoveStreamEvent;
    myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent;
    myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent;
    myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

    if (hasAddTrack) {
        myPeerConnection.ontrack = handleTrackEvent;
    } else {
        myPeerConnection.onaddstream = handleAddStreamEvent;
    }
}

// Handle loi moi ket noi video
function handleNegotiationNeededEvent() {
    myPeerConnection.createOffer().then(function (offer) {
        log("---> Creating new description object to send to remote peer");
        return myPeerConnection.setLocalDescription(offer);
    })
        .then(function () {
            log("---> Sending offer to remote peer");
            sendToServer({
                name: myUsername,
                target: targetUsername,
                type: "video-offer",
                sdp: myPeerConnection.localDescription
            });
        })
        .catch(reportError);
}

// Handle track event
function handleTrackEvent(event) {
    log("*** Track event");
    document.getElementById("received_video").srcObject = event.streams[0];
    document.getElementById("hangup-button").disabled = false;
}

// Handle stream event
function handleAddStreamEvent(event) {
    log("*** Stream added");
    document.getElementById("received_video").srcObject = event.stream;
    document.getElementById("hangup-button").disabled = false;
}

// Handle remove stream event
function handleRemoveStreamEvent() {
    log("*** Stream removed");
    closeVideoCall();
}

// Handle new ICE candidate
function handleICECandidateEvent(event) {
    if (event.candidate) {
        log("Outgoing ICE candidate: " + event.candidate.candidate);

        sendToServer({
            type: "new-ice-candidate",
            target: targetUsername,
            candidate: event.candidate
        });
    }
}

// Handle khi ket noi ICE bi ngat
function handleICEConnectionStateChangeEvent() {
    log("*** ICE connection state changed to " + myPeerConnection.iceConnectionState);

    switch (myPeerConnection.iceConnectionState) {
        case "closed":
        case "failed":
        case "disconnected":
            closeVideoCall();
            break;
    }
}

// Handle khi trang thai ket noi ICE dong
function handleSignalingStateChangeEvent() {
    log("*** WebRTC signaling state changed to: " + myPeerConnection.signalingState);
    switch (myPeerConnection.signalingState) {
        case "closed":
            closeVideoCall();
            break;
    }
}

// Handle gather state change
function handleICEGatheringStateChangeEvent() {
    log("*** ICE gathering state changed to: " + myPeerConnection.iceGatheringState);
}

// Handle khi list user duoc nhan
function handleUserlistMsg(msg) {
    let i;

    let listElem = document.getElementById("userlistbox");

    while (listElem.firstChild) {
        listElem.removeChild(listElem.firstChild);
    }

    for (i = 0; i < msg.users.length; i++) {
        let item = document.createElement("li");
        item.appendChild(document.createTextNode(msg.users[i]));
        item.addEventListener("click", invite, false);

        listElem.appendChild(item);
    }
}

// Handle khi dung videocall
function closeVideoCall() {
    let remoteVideo = document.getElementById("received_video");
    let localVideo = document.getElementById("local_video");

    log("Closing the call");
    if (myPeerConnection) {
        log("--> Closing the peer connection");
        myPeerConnection.onaddstream = null;
        myPeerConnection.ontrack = null;
        myPeerConnection.onremovestream = null;
        myPeerConnection.onnicecandidate = null;
        myPeerConnection.oniceconnectionstatechange = null;
        myPeerConnection.onsignalingstatechange = null;
        myPeerConnection.onicegatheringstatechange = null;
        myPeerConnection.onnotificationneeded = null;

        if (remoteVideo.srcObject) {
            remoteVideo.srcObject.getTracks().forEach(track => track.stop());
        }

        if (localVideo.srcObject) {
            localVideo.srcObject.getTracks().forEach(track => track.stop());
        }

        remoteVideo.src = null;
        localVideo.src = null;

        myPeerConnection.close();
        myPeerConnection = null;
    }

    document.getElementById("hangup-button").disabled = true;
    targetUsername = null;
}

// Handle khi nhan dung cuoc goi
function handleHangUpMsg() {
    log("*** Received hang up notification from other peer");
    closeVideoCall();
}

// Gui tin nhan dung cuoc goi toi client khac
function hangUpCall() {
    closeVideoCall();
    sendToServer({
        name: myUsername,
        target: targetUsername,
        type: "hang-up"
    });
}

// Handle khi click vao user de goi video
function invite(evt) {
    log("Starting to prepare an invitation");
    if (myPeerConnection) {
        alert("You can't start a call because you already have one open!");
    } else {
        targetUsername = evt.target.textContent;
        log("Inviting user " + targetUsername);

        // Call createPeerConnection() to create the RTCPeerConnection.

        log("Setting up connection to invite user: " + targetUsername);
        createPeerConnection();

        // Now configure and create the local stream, attach it to the
        // "preview" box (id "local_video"), and add it to the
        // RTCPeerConnection.

        log("Requesting webcam access...");

        navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(function (localStream) {
                log("-- Local video stream obtained");
                document.getElementById("local_video").srcObject = localStream;

                if (hasAddTrack) {
                    log("-- Adding tracks to the RTCPeerConnection");
                    localStream.getTracks().forEach(track => myPeerConnection.addTrack(track, localStream));
                } else {
                    log("-- Adding stream to the RTCPeerConnection");
                    myPeerConnection.addStream(localStream);
                }
            })
            .catch(handleGetUserMediaError);
    }
}

// Accept an offer to video chat. We configure our local settings,
// create our RTCPeerConnection, get and attach our local camera
// stream, then create and send an answer to the caller.

function handleVideoOfferMsg(msg) {
    let localStream = null;

    targetUsername = msg.name;

    // Call createPeerConnection() to create the RTCPeerConnection.

    log("Starting to accept invitation from " + targetUsername);
    createPeerConnection();

    // We need to set the remote description to the received SDP offer
    // so that our local WebRTC layer knows how to talk to the caller.

    let desc = new RTCSessionDescription(msg.sdp);

    myPeerConnection.setRemoteDescription(desc).then(function () {
        log("Setting up the local media stream...");
        return navigator.mediaDevices.getUserMedia(mediaConstraints);
    })
        .then(function (stream) {
            log("-- Local video stream obtained");
            localStream = stream;
            document.getElementById("local_video").srcObject = localStream;

            if (hasAddTrack) {
                log("-- Adding tracks to the RTCPeerConnection");
                localStream.getTracks().forEach(track =>
                    myPeerConnection.addTrack(track, localStream)
                );
            } else {
                log("-- Adding stream to the RTCPeerConnection");
                myPeerConnection.addStream(localStream);
            }
        })
        .then(function () {
            log("------> Creating answer");
            // Now that we've successfully set the remote description, we need to
            // start our stream up locally then create an SDP answer. This SDP
            // data describes the local end of our call, including the codec
            // information, options agreed upon, and so forth.
            return myPeerConnection.createAnswer();
        })
        .then(function (answer) {
            log("------> Setting local description after creating answer");
            // We now have our answer, so establish that as the local description.
            // This actually configures our end of the call to match the settings
            // specified in the SDP.
            return myPeerConnection.setLocalDescription(answer);
        })
        .then(function () {
            let msg = {
                name: myUsername,
                target: targetUsername,
                type: "video-answer",
                sdp: myPeerConnection.localDescription
            };

            // We've configured our end of the call now. Time to send our
            // answer back to the caller so they know that we want to talk
            // and how to talk to us.

            log("Sending answer packet back to other peer");
            sendToServer(msg);
        })
        .catch(handleGetUserMediaError);
}

// Responds to the "video-answer" message sent to the caller
// once the callee has decided to accept our request to talk.

function handleVideoAnswerMsg(msg) {
    log("Call recipient has accepted our call");

    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.

    let desc = new RTCSessionDescription(msg.sdp);
    myPeerConnection.setRemoteDescription(desc).catch(reportError);
}

// A new ICE candidate has been received from the other peer. Call
// RTCPeerConnection.addIceCandidate() to send it along to the
// local ICE framework.

function handleNewICECandidateMsg(msg) {
    let candidate = new RTCIceCandidate(msg.candidate);

    log("Adding received ICE candidate: " + JSON.stringify(candidate));
    myPeerConnection.addIceCandidate(candidate)
        .catch(reportError);
}

// Handle errors which occur when trying to access the local media
// hardware; that is, exceptions thrown by getUserMedia(). The two most
// likely scenarios are that the user has no camera and/or microphone
// or that they declined to share their equipment when prompted. If
// they simply opted not to share their media, that's not really an
// error, so we won't present a message in that situation.

function handleGetUserMediaError(e) {
    log(e);
    switch (e.name) {
        case "NotFoundError":
            alert("Unable to open your call because no camera and/or microphone" +
                "were found.");
            break;
        case "SecurityError":
        case "PermissionDeniedError":
            // Do nothing; this is the same as the user canceling the call.
            break;
        default:
            alert("Error opening your camera and/or microphone: " + e.message);
            break;
    }

    // Make sure we shut down our end of the RTCPeerConnection so we're
    // ready to try again.

    closeVideoCall();
}

// Handles reporting errors. Currently, we just dump stuff to console but
// in a real-world application, an appropriate (and user-friendly)
// error message should be displayed.

function reportError(errMessage) {
    log("Error " + errMessage.name + ": " + errMessage.message);
}

document.getElementById('name').onkeydown = e => e.key === 'Enter' ? connect() : null;