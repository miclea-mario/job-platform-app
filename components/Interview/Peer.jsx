import {
  selectIsLocalVideoEnabled,
  selectPeerAudioByID,
  useHMSStore,
  useVideo,
} from '@100mslive/react-sdk';
import { classnames } from '@lib';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { useEffect, useState } from 'react';

const Peer = ({ peer }) => {
  const videoRef = useVideo({
    trackId: peer.videoTrack,
  });

  const isVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isPeerVideoEnabled = peer.isLocal ? isVideoEnabled : Boolean(peer.videoTrack);

  // Get avatar from peer metadata if available
  const avatar = null;

  const peerAudioLevel = useHMSStore(selectPeerAudioByID(peer.id));
  const [scale, setScale] = useState(1);

  // Update the scale based on audio level
  useEffect(() => {
    // Map audio level (0-100) to scale (1-1.2)
    const newScale = 1 + (peerAudioLevel / 100) * 0.2;
    setScale(newScale);
  }, [peerAudioLevel]);

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-700/50 backdrop-blur-sm">
      {/* Video Stream */}
      {isPeerVideoEnabled && (
        <video
          ref={videoRef}
          className={classnames(
            'h-full w-full object-cover transition-opacity duration-300',
            peer.isLocal && 'mirror-mode'
          )}
          autoPlay
          muted={peer.isLocal}
          playsInline
        />
      )}

      {/* Avatar/Placeholder when video is off */}
      {!isPeerVideoEnabled && (
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900">
          {avatar ? (
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full bg-blue-500/20 transition-transform ease-in-out duration-150"
                style={{ transform: `scale(${scale})` }}
              ></div>
              <img
                src={avatar}
                alt={`${peer.name}'s avatar`}
                className="relative h-32 w-32 rounded-full object-cover border-4 border-white/20 shadow-2xl"
              />
            </div>
          ) : (
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-4xl font-bold text-white shadow-2xl border-4 border-white/20">
              <div
                className="absolute inset-0 rounded-full bg-white/10 transition-transform duration-150"
                style={{ transform: `scale(${scale})` }}
              ></div>
              <span className="relative">{peer.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
        </div>
      )}

      {/* Overlay with peer info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Status indicator with audio level */}
            <div className="relative">
              <div
                className={classnames(
                  'h-3 w-3 rounded-full transition-all duration-200',
                  peer.isLocal ? 'bg-blue-500' : 'bg-emerald-500'
                )}
                style={{ transform: `scale(${scale})` }}
              ></div>
              {peerAudioLevel > 0 && (
                <div className="absolute -inset-1 rounded-full bg-white/20 animate-pulse"></div>
              )}
            </div>

            {/* Peer name */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {peer.name}
                {peer.isLocal && (
                  <span className="ml-2 text-xs text-blue-300 font-normal">(You)</span>
                )}
              </p>
            </div>
          </div>

          {/* Audio/Video status indicators */}
          <div className="flex items-center gap-2">
            {/* Microphone status */}
            <div
              className={classnames(
                'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                peer.audioTrack ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              )}
            >
              {peer.audioTrack ? (
                <Mic className="h-3.5 w-3.5" />
              ) : (
                <MicOff className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Camera status */}
            <div
              className={classnames(
                'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                isPeerVideoEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              )}
            >
              {isPeerVideoEnabled ? (
                <Video className="h-3.5 w-3.5" />
              ) : (
                <VideoOff className="h-3.5 w-3.5" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connection quality indicator */}
      <div className="absolute top-3 right-3 z-20">
        <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 backdrop-blur-sm">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-green-300"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Peer;
