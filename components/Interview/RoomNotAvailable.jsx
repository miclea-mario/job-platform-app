import { Button } from '@components';
import { Circle, RefreshCw, VideoOff } from 'lucide-react';

const RoomNotAvailable = () => {
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
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                <Circle className="mr-1 h-3 w-3 fill-current" />
                Ended
              </span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            The interview session has ended
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-900/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900/40">
                  <VideoOff className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Interview Ended
              </h2>

              {/* Description */}
              <div className="space-y-3 mb-8">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  The interview session has ended. Thank you for your participation.
                </p>
              </div>

              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <RefreshCw className="h-4 w-4" />
                Go Back
              </Button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  If you have any questions about the interview process, please contact our HR team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomNotAvailable;
