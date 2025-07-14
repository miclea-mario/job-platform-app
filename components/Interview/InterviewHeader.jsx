import { Circle, Users } from 'lucide-react';

const InterviewHeader = ({ isConnected, showPreview, peers }) => {
  return (
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
                {isConnected ? 'Live' : showPreview ? 'Preview' : 'Connecting'}
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
          {isConnected
            ? 'Interview in progress'
            : showPreview
            ? 'Check your setup before joining'
            : 'Connecting to interview room...'}
        </p>
      </div>
    </div>
  );
};

export default InterviewHeader;
