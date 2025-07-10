import {
  HMSRoomProvider,
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Button } from '@components';
import { classnames } from '@lib';
import { AlertTriangle, Circle, RefreshCw, Users, VideoOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Peer from './Peer';

// Conference Component - Displays all peers
const Conference = () => {
  const peers = useHMSStore(selectPeers);

  const getGridClass = () => {
    if (peers.length === 1) return 'grid-cols-1 max-w-3xl mx-auto';
    if (peers.length === 2) return 'grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto';
    if (peers.length <= 4) return 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto';
    if (peers.length <= 6) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto';
    return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 max-w-7xl mx-auto';
  };

  return (
    <div className="flex-1 w-full px-4 py-6">
      {peers.length === 0 ? (
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Waiting for participants
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Share the interview link with other participants to start the session
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
                <div
                  className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classnames('grid gap-6', getGridClass())}>
          {peers.map((peer) => (
            <div
              key={peer.id}
              className={classnames(
                'aspect-video transition-all duration-300 hover:scale-[1.02]',
                peers.length === 1 && 'aspect-video max-h-[70vh]'
              )}
            >
              <Peer peer={peer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Interview Content Component
const InterviewContent = ({ token, user, applicationId }) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
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
    <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Enhanced Header */}
      <div className="border-b bg-white/95 backdrop-blur-sm shadow-sm dark:border-gray-800 dark:bg-gray-950/95 sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Interview Room
                </h1>
              </div>
              <div className="hidden sm:block">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <Circle className="mr-1 h-3 w-3 fill-current" />
                  {isConnected ? 'Live' : 'Connecting'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isConnected && (
                <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="mr-1.5 h-4 w-4" />
                  {peers.length} participant{peers.length !== 1 ? 's' : ''}
                </div>
              )}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isConnected ? 'Interview in progress' : 'Connecting to interview room...'}
          </p>
        </div>
      </div>

      {isJoining && (
        <div className="flex flex-1 flex-col items-center justify-center py-12">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20"></div>
              <div className="relative h-20 w-20 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin mx-auto"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Connecting to interview
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              Please wait while we connect you to the interview room...
            </p>
          </div>
        </div>
      )}

      {isConnected ? (
        <div className="flex flex-1 flex-col">
          <Conference />
          <div className="h-20"></div> {/* Space for the fixed footer */}
          <Footer applicationId={applicationId} />
        </div>
      ) : (
        !isJoining && (
          <div className="flex flex-1 flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50">
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                      <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Connection Error
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {error ||
                      'Could not connect to the interview room. Please check your connection and try again.'}
                  </p>

                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Main component wrapping everything with the 100ms provider
const InterviewRoom = ({ token, user, applicationId, room }) => {
  if (!room.enabled) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        {/* Header */}
        <div className="border-b bg-white/95 backdrop-blur-sm shadow-sm dark:border-gray-800 dark:bg-gray-950/95 sticky top-0 z-30">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Interview Room
                  </h1>
                </div>
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                  <Circle className="mr-1 h-3 w-3 fill-current" />
                  Taken
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              This interview room has been taken or completed
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className="w-full max-w-lg">
            <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50">
              <div className="text-center">
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/40">
                    <VideoOff className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Interview Room Taken
                </h2>

                {/* Description */}
                <div className="space-y-3 mb-8">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    This interview room is no longer available as the interview session has already
                    been conducted.
                  </p>
                </div>

                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh Page
                </Button>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    If you believe this is an error or need to reschedule, please contact the HR
                    department or your interviewer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HMSRoomProvider>
      <InterviewContent token={token} user={user} applicationId={applicationId} />
    </HMSRoomProvider>
  );
};

export default InterviewRoom;
