import { selectPeers, useHMSStore } from '@100mslive/react-sdk';
import { classnames } from '@lib';
import { Users } from 'lucide-react';
import Peer from './Peer';

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

export default Conference;
