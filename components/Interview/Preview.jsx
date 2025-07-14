import {
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectLocalPeer,
  useHMSActions,
  useHMSStore,
} from '@100mslive/react-sdk';
import { Button } from '@components';
import { classnames } from '@lib';
import { AlertTriangle, Camera, CameraOff, Mic, MicOff, RefreshCw, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import Peer from './Peer';

const Preview = ({ token, user, onJoin }) => {
  const localPeer = useHMSStore(selectLocalPeer);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const hmsActions = useHMSActions();
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [isJoining, setIsJoining] = useState(false);
  const [deviceAvailability, setDeviceAvailability] = useState({
    hasCamera: true,
    hasMicrophone: true,
  });

  // Start preview when component mounts
  useEffect(() => {
    const startPreview = async () => {
      if (token && !localPeer && !isPreviewLoading) {
        try {
          setIsPreviewLoading(true);
          setPreviewError(null);

          // Check for device availability first
          try {
            let hasCamera = false;
            let hasMicrophone = false;

            if (
              typeof navigator !== 'undefined' &&
              navigator.mediaDevices &&
              typeof navigator.mediaDevices.enumerateDevices === 'function'
            ) {
              const devices = await navigator.mediaDevices.enumerateDevices();
              hasCamera = devices.some((device) => device.kind === 'videoinput');
              hasMicrophone = devices.some((device) => device.kind === 'audioinput');
            }

            setDeviceAvailability({ hasCamera, hasMicrophone });

            await hmsActions.preview({
              authToken: token,
              userName: user.name,
              metadata: JSON.stringify({
                avatar: user.avatar,
              }),
              settings: {
                isAudioMuted: !hasMicrophone, // Start muted if no microphone
                isVideoMuted: !hasCamera, // Start video off if no camera
              },
            });
          } catch (deviceError) {
            // Fallback: try preview with both audio and video muted
            setDeviceAvailability({ hasCamera: false, hasMicrophone: false });
            await hmsActions.preview({
              authToken: token,
              userName: user.name,
              metadata: JSON.stringify({
                avatar: user.avatar,
              }),
              settings: {
                isAudioMuted: true,
                isVideoMuted: true,
              },
            });
          }
        } catch (error) {
          console.error('Failed to start preview:', error);
          if (error.message?.includes('DeviceNotAvailable')) {
            setPreviewError(
              'Camera or microphone not available. You can still join the interview with devices disabled.'
            );
          } else if (
            error.message?.includes('NotAllowedError') ||
            error.message?.includes('Permission')
          ) {
            setPreviewError(
              'Camera and microphone permissions are required. Please allow access and refresh the page.'
            );
          } else {
            setPreviewError(
              'Failed to initialize preview. Please check your camera and microphone permissions.'
            );
          }
        } finally {
          setIsPreviewLoading(false);
        }
      }
    };

    startPreview();
  }, [hmsActions, localPeer, isPreviewLoading, token, user]);

  const handleJoin = async () => {
    try {
      setIsJoining(true);
      await hmsActions.join({
        authToken: token,
        userName: user.name,
        metadata: JSON.stringify({
          avatar: user.avatar,
        }),
      });
      onJoin();
    } catch (error) {
      console.error('Failed to join room:', error);
      setPreviewError('Failed to join interview room. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  const toggleAudio = async () => {
    try {
      await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
    } catch (error) {
      console.error('Failed to toggle audio:', error);
      if (error.message?.includes('DeviceNotAvailable')) {
        setPreviewError('Microphone not available. Please check your device connections.');
      }
    }
  };

  const toggleVideo = async () => {
    try {
      await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
      if (error.message?.includes('DeviceNotAvailable')) {
        setPreviewError('Camera not available. Please check your device connections.');
      }
    }
  };

  if (isPreviewLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/20"></div>
            <div className="relative h-20 w-20 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin mx-auto"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Setting up preview
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Preparing your camera and microphone for the interview...
          </p>
        </div>
      </div>
    );
  }

  if (previewError) {
    return (
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
                Preview Error
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {previewError}
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
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Preview Header */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Preview Your Setup
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check your camera and microphone before joining the interview
            </p>
          </div>

          {/* Video Preview */}
          <div className="relative mb-6">
            <div className="aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700">
              {localPeer && isLocalVideoEnabled ? (
                <Peer peer={localPeer} isLocal={true} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
                      {!deviceAvailability.hasCamera ? (
                        <CameraOff className="h-8 w-8 text-gray-400" />
                      ) : (
                        <Camera className="h-8 w-8 text-gray-300" />
                      )}
                    </div>
                    <p className="text-gray-300">
                      {!deviceAvailability.hasCamera
                        ? 'Camera not available'
                        : !isLocalVideoEnabled
                        ? 'Camera turned off'
                        : 'Camera preview'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preview Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
                <Button
                  onClick={toggleAudio}
                  disabled={!deviceAvailability.hasMicrophone}
                  className={classnames(
                    'group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105',
                    !deviceAvailability.hasMicrophone
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600 shadow-md'
                      : isLocalAudioEnabled
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/25'
                      : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
                  )}
                  title={
                    !deviceAvailability.hasMicrophone
                      ? 'Microphone not available'
                      : isLocalAudioEnabled
                      ? 'Mute microphone'
                      : 'Unmute microphone'
                  }
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {!isLocalAudioEnabled ? (
                    <MicOff size={20} className="relative z-10" />
                  ) : (
                    <Mic size={20} className="relative z-10" />
                  )}
                  {/* Status indicator */}
                  {deviceAvailability.hasMicrophone && (
                    <div
                      className={classnames(
                        'absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white transition-all duration-300',
                        isLocalAudioEnabled ? 'bg-green-500' : 'bg-red-500'
                      )}
                    />
                  )}
                </Button>

                <Button
                  onClick={toggleVideo}
                  disabled={!deviceAvailability.hasCamera}
                  className={classnames(
                    'group relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105',
                    !deviceAvailability.hasCamera
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600 shadow-md'
                      : isLocalVideoEnabled
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-emerald-500/25'
                      : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
                  )}
                  title={
                    !deviceAvailability.hasCamera
                      ? 'Camera not available'
                      : isLocalVideoEnabled
                      ? 'Turn off camera'
                      : 'Turn on camera'
                  }
                >
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {!isLocalVideoEnabled ? (
                    <CameraOff size={20} className="relative z-10" />
                  ) : (
                    <Camera size={20} className="relative z-10" />
                  )}
                  {/* Status indicator */}
                  {deviceAvailability.hasCamera && (
                    <div
                      className={classnames(
                        'absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white transition-all duration-300',
                        isLocalVideoEnabled ? 'bg-green-500' : 'bg-red-500'
                      )}
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Device Status */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                {!deviceAvailability.hasMicrophone ? (
                  <MicOff className="h-4 w-4 text-gray-400" />
                ) : isLocalAudioEnabled ? (
                  <Mic className="h-4 w-4 text-green-600" />
                ) : (
                  <MicOff className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={classnames(
                    'font-medium',
                    !deviceAvailability.hasMicrophone
                      ? 'text-gray-400'
                      : isLocalAudioEnabled
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  Microphone{' '}
                  {!deviceAvailability.hasMicrophone
                    ? 'Not Available'
                    : isLocalAudioEnabled
                    ? 'On'
                    : 'Off'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!deviceAvailability.hasCamera ? (
                  <CameraOff className="h-4 w-4 text-gray-400" />
                ) : isLocalVideoEnabled ? (
                  <Camera className="h-4 w-4 text-green-600" />
                ) : (
                  <CameraOff className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={classnames(
                    'font-medium',
                    !deviceAvailability.hasCamera
                      ? 'text-gray-400'
                      : isLocalVideoEnabled
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  Camera{' '}
                  {!deviceAvailability.hasCamera
                    ? 'Not Available'
                    : isLocalVideoEnabled
                    ? 'On'
                    : 'Off'}
                </span>
              </div>
            </div>
            {(!deviceAvailability.hasCamera || !deviceAvailability.hasMicrophone) && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Some devices are not available. You can still join the interview.
              </p>
            )}
          </div>

          {/* Join Button */}
          <div className="text-center">
            <Button
              onClick={handleJoin}
              disabled={isJoining}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isJoining ? (
                <>
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  Joining...
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  Join Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
