import { HMSRoomProvider } from '@100mslive/react-sdk';
import InterviewContent from './InterviewContent';
import RoomNotAvailable from './RoomNotAvailable';

// Main component wrapping everything with the 100ms provider
const InterviewRoom = ({ token, user, applicationId, room }) => {
  if (!room.enabled) {
    return <RoomNotAvailable />;
  }

  return (
    <HMSRoomProvider>
      <InterviewContent token={token} user={user} applicationId={applicationId} />
    </HMSRoomProvider>
  );
};

export default InterviewRoom;
