import { selectPermissions, useAVToggle, useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import { updateApplicationStatus } from '@api/company';
import { Button } from '@components';
import { APPLICATION_STATUS } from '@constants/application';
import { useMutation } from '@hooks';
import { classnames } from '@lib';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, Users } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Footer = ({ applicationId }) => {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } = useAVToggle();
  const hmsActions = useHMSActions();
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  // Get permissions from HMS store
  const permissions = useHMSStore(selectPermissions);
  const canEndRoom = permissions?.endRoom;

  const updateStatusMutation = useMutation(updateApplicationStatus, {
    invalidateQueries: 'company/applications',
  });

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

  const handleEndRoom = async () => {
    if (!canEndRoom) return;

    if (!confirm('Are you sure you want to end the interview for all participants?')) {
      return;
    }

    try {
      const lock = true;
      const reason = 'The interview has ended';

      // Use the mutation that was defined at the component level
      await updateStatusMutation.mutateAsync({
        id: applicationId,
        status: APPLICATION_STATUS.INTERVIEWED,
      });

      await hmsActions.endRoom(lock, reason);
      router.push('/company/applications');
    } catch (error) {
      console.error('Error ending room:', error);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white/95 via-white/90 to-white/80 backdrop-blur-xl p-6 border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/80 dark:border-gray-800/50 transition-all duration-300 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        {/* Controls Container */}
        <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
          {/* Audio Toggle */}
          <Button
            onClick={toggleAudio}
            className={classnames(
              'group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105',
              isLocalAudioEnabled
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/25'
                : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
            )}
            title={isLocalAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isLocalAudioEnabled ? (
              <Mic size={20} className="relative z-10" />
            ) : (
              <MicOff size={20} className="relative z-10" />
            )}
            {/* Status indicator */}
            <div
              className={classnames(
                'absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white transition-all duration-300',
                isLocalAudioEnabled ? 'bg-green-500' : 'bg-red-500'
              )}
            />
          </Button>

          {/* Video Toggle */}
          <Button
            onClick={toggleVideo}
            className={classnames(
              'group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105',
              isLocalVideoEnabled
                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/25'
                : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
            )}
            title={isLocalVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isLocalVideoEnabled ? (
              <Camera size={20} className="relative z-10" />
            ) : (
              <CameraOff size={20} className="relative z-10" />
            )}
            {/* Status indicator */}
            <div
              className={classnames(
                'absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white transition-all duration-300',
                isLocalVideoEnabled ? 'bg-green-500' : 'bg-red-500'
              )}
            />
          </Button>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-300/60 dark:bg-gray-600/60 mx-2" />

          {/* Leave Button */}
          <Button
            onClick={handleLeave}
            disabled={isLeaving}
            className={classnames(
              'group relative flex h-14 px-6 items-center justify-center rounded-full transition-all duration-300 gap-3 min-w-[120px] transform hover:scale-105',
              'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25',
              isLeaving && 'opacity-70 cursor-not-allowed scale-100 hover:scale-100'
            )}
            title="Leave interview"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className={classnames(
                'flex items-center gap-3 relative z-10',
                isLeaving && 'animate-pulse'
              )}
            >
              <PhoneOff size={20} className={isLeaving ? 'animate-bounce' : ''} />
              <span className="font-semibold text-sm">{isLeaving ? 'Leaving...' : 'Leave'}</span>
            </div>
          </Button>

          {/* End Interview button - only visible if user has endRoom permission */}
          {canEndRoom && (
            <>
              {/* Separator */}
              <div className="h-8 w-px bg-gray-300/60 dark:bg-gray-600/60 mx-2" />

              <Button
                onClick={handleEndRoom}
                className={classnames(
                  'group relative flex h-14 px-6 items-center justify-center rounded-full transition-all duration-300 gap-3 min-w-[160px] transform hover:scale-105',
                  'bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-amber-500/25'
                )}
                title="End interview for all participants"
              >
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 relative z-10">
                  <Users size={20} />
                  <span className="font-semibold text-sm">End Interview</span>
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
