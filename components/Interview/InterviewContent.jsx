import {
  selectIsConnectedToRoom,
  selectPeers,
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
} from '@100mslive/react-sdk';
import { toaster } from '@lib';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Conference from './Conference';
import Footer from './Footer';
import InterviewHeader from './InterviewHeader';
import Preview from './Preview';
import RoomNotAvailable from './RoomNotAvailable';

const InterviewContent = ({ token, user, applicationId }) => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const [showPreview, setShowPreview] = useState(true);
  const [roomEnded, setRoomEnded] = useState(false);
  const notification = useHMSNotifications();
  const router = useRouter();

  useEffect(() => {
    if (!notification) {
      return;
    }

    switch (notification.type) {
      case 'ROOM_ENDED':
        toaster.error(notification.data.reason);
        setRoomEnded(true);
        router.push('/user/applications');
        break;
      case 'PEER_LEFT':
        // If user left voluntarily, show preview again
        if (notification.data?.peerId === peers.find((p) => p.isLocal)?.id) {
          setShowPreview(true);
        }
        break;
      case 'ROOM_NOT_FOUND':
      case 'ROOM_NOT_ACTIVE':
        // Handle cases where room is not available/active
        setRoomEnded(true);
        toaster.error('The interview room is no longer available');
        break;
    }
  }, [notification, peers, router]);

  const handleJoinComplete = () => {
    setShowPreview(false);
  };

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

  // Handle connection state changes to show preview when disconnected
  useEffect(() => {
    if (!isConnected && !showPreview) {
      // If we were connected but now disconnected, show preview again
      setShowPreview(true);
    }
  }, [isConnected, showPreview]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {roomEnded ? (
        <RoomNotAvailable />
      ) : (
        <>
          <InterviewHeader isConnected={isConnected} showPreview={showPreview} peers={peers} />

          {showPreview && !isConnected ? (
            <Preview token={token} user={user} onJoin={handleJoinComplete} />
          ) : isConnected ? (
            <div className="flex flex-1 flex-col">
              <Conference />
              <div className="h-20"></div> {/* Space for the fixed footer */}
              <Footer applicationId={applicationId} />
            </div>
          ) : (
            <Preview token={token} user={user} onJoin={handleJoinComplete} />
          )}
        </>
      )}
    </div>
  );
};

export default InterviewContent;
