import {
  HMSRoomProvider,
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Button } from '@components';
import { classnames } from '@lib';
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
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
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
                <div className="relative">
                  <span className="inline-block h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-500 animate-ping opacity-30"></span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Interview Room
                </h1>
              </div>
              <div className="hidden sm:block">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  {isConnected ? 'Live' : 'Connecting'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isConnected && (
                <div className="hidden md:flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    className="mr-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
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
                      <svg
                        className="h-6 w-6 text-red-600 dark:text-red-400"
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
          </div>
        )
      )}
    </div>
  );
};

// Main component wrapping everything with the 100ms provider
const InterviewRoom = ({ token, user, applicationId }) => {
  return (
    <HMSRoomProvider>
      <InterviewContent token={token} user={user} applicationId={applicationId} />
    </HMSRoomProvider>
  );
};

export default InterviewRoom;
