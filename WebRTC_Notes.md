# WebRTC Notes

## 1. WebRTC

WebRTC enables real-time peer-to-peer audio, video, and data exchange in browsers.

### What WebRTC Is Good For
- video calling
- audio calling
- screen sharing
- peer-to-peer data transfer

### Main Building Blocks
- signaling
- STUN
- TURN
- peer connections
- media streams

### Signaling
- Signaling is the process of exchanging setup information between peers.
- WebRTC does not define signaling transport itself.
- Developers usually use WebSockets, Socket.IO, or another channel for signaling.

#### What Signaling Exchanges
- session descriptions
- network candidates
- connection metadata

### STUN and TURN

#### STUN
- Helps peers discover their public-facing network address.
- Useful for NAT traversal.

#### TURN
- Relays media when direct peer-to-peer connection fails.
- Used when NAT or firewall restrictions are too strict.

#### Simple Rule
- STUN helps peers find each other.
- TURN helps relay media when peers cannot connect directly.

### Peer Connections
- `RTCPeerConnection` is the core WebRTC interface.
- It manages the connection, ICE negotiation, and media exchange.

### Video and Audio Streaming
- Media is captured from devices using browser media APIs.
- Streams are attached to peer connections and rendered in video elements.

### Important Concepts
- ICE candidates
- SDP offers and answers
- media tracks
- codecs
- NAT traversal

### WebRTC Notes
- use HTTPS in production
- handle permissions carefully
- support connection failure and renegotiation
- separate signaling from media transport






