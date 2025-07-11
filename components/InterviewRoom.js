import {
  HMSRoomProvider,
  selectIsConnectedToRoom,
  selectPeers,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Button } from '@components';
import { classnames } from '@lib';
import { Camera, CameraOff, Mic, MicOff, PhoneOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import Peer from './Interview/Peer';

// Conference Component - Displays all peers
const Conference = () => {
  const peers = useHMSStore(selectPeers);

  return (
    <div className="my-6 w-full px-4">
      {peers.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
          <p className="text-gray-500 dark:text-gray-400">Waiting for participants...</p>
        </div>
      ) : (
        <div
          className={classnames(
            'grid gap-4',
            peers.length === 1 && 'grid-cols-1',
            peers.length === 2 && 'grid-cols-2',
            peers.length > 2 && peers.length <= 4 && 'grid-cols-2',
            peers.length > 4 && 'grid-cols-3'
          )}
        >
          {peers.map((peer) => (
            <div key={peer.id} className="aspect-video">
              <Peer peer={peer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Footer Component - Controls for audio/video
const Footer = () => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const hmsActions = useHMSActions();
  const [isLeaving, setIsLeaving] = useState(false);

  const handleLeave = async () => {
    setIsLeaving(true);
    try {
      await hmsActions.leave();
    } catch (error) {
      console.error('Error leaving room:', error);
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] dark:bg-gray-900/90 dark:border-gray-800 transition-all duration-300">
      <div className="mx-auto flex max-w-4xl items-center justify-center gap-4">
        <Button
          onClick={toggleAudio}
          className={classnames(
            'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
            isLocalAudioEnabled
              ? 'bg-white text-gray-800 hover:bg-gray-100 shadow-sm border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 dark:bg-red-900/30 dark:hover:bg-red-900/40 dark:border-red-900/30'
          )}
          title={isLocalAudioEnabled ? 'Mute' : 'Unmute'}
        >
          {isLocalAudioEnabled ? <Mic size={18} /> : <MicOff size={18} />}
        </Button>

        <Button
          onClick={toggleVideo}
          className={classnames(
            'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
            isLocalVideoEnabled
              ? 'bg-white text-gray-800 hover:bg-gray-100 shadow-sm border border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
              : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 dark:bg-red-900/30 dark:hover:bg-red-900/40 dark:border-red-900/30'
          )}
          title={isLocalVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
        >
          {isLocalVideoEnabled ? <Camera size={18} /> : <CameraOff size={18} />}
        </Button>

        <Button
          onClick={handleLeave}
          disabled={isLeaving}
          className={classnames(
            'flex h-12 px-4 items-center justify-center rounded-full transition-all duration-200 gap-2',
            'bg-red-500 text-white hover:bg-red-600 shadow-md',
            isLeaving && 'opacity-70 cursor-not-allowed'
          )}
          title="Leave interview"
        >
          <PhoneOff size={18} />
          <span className="font-medium">Leave</span>
        </Button>
      </div>
    </div>
  );
};

// Interview Content Component
const InterviewContent = ({ token, user }) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState(null);

  // Connect to room using token directly
  useEffect(() => {
    const joinRoom = async () => {
      if (token && !isConnected && !isJoining) {
        try {
          setIsJoining(true);
          setError(null);
          await hmsActions.join({
            authToken: token,
            userName: user.name,
            metadata: JSON.stringify({
              avatar: user.avatar,
            }),
          });
        } catch (error) {
          console.error('Failed to join room:', error);
          setError('Failed to connect to interview room. Please try again.');
        } finally {
          setIsJoining(false);
        }
      }
    };

    joinRoom();
  }, [hmsActions, isConnected, isJoining, token, user]);

  // Handle cleanup when component unmounts or window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col">
      <div className="border-b bg-white/95 backdrop-blur-sm p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/95 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
            Interview Room
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isConnected ? 'Interview in progress' : 'Connecting to interview room...'}
          </p>
        </div>
      </div>

      {isJoining && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20"></div>
            <div className="relative h-16 w-16 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-700 dark:text-gray-300">Connecting to interview room...</p>
        </div>
      )}

      {isConnected ? (
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
          <Conference />
          <div className="h-20"></div> {/* Space for the fixed footer */}
          <Footer />
        </div>
      ) : (
        !isJoining && (
          <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mx-auto dark:bg-red-900/30 dark:text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="mb-3 text-center text-xl font-semibold text-gray-900 dark:text-white">
                Connection Error
              </h3>

              <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
                {error ||
                  'Could not connect to the interview room. Please check your connection and try again.'}
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                    <path d="M21 3v5h-5"></path>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                    <path d="M3 21v-5h5"></path>
                  </svg>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Main component wrapping everything with the 100ms provider
const InterviewRoom = ({ token, user }) => {
  return (
    <HMSRoomProvider>
      <InterviewContent token={token} user={user} />
    </HMSRoomProvider>
  );
};

export default InterviewRoom;
