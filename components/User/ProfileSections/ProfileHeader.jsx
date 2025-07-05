import { Avatar } from '@components/Fields';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Progress } from '@components/ui/progress';
import { CheckCircle, Edit, XCircle } from 'lucide-react';
import { useState } from 'react';

const ProfileHeader = ({
  avatar,
  name,
  title,
  profileCompletion,
  onUpdateAvatar,
  onDeleteAvatar,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    onUpdate(editedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar
          onChange={onUpdateAvatar}
          onDelete={onDeleteAvatar}
          className="w-36 h-36 p-2 backdrop-blur-md"
          value={avatar}
          name={name}
        />
        <div>
          <h1 className="text-3xl font-semibold">{name}</h1>

          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="h-8 text-sm w-48"
                placeholder="Your title"
              />
              <Button size="icon" variant="ghost" onClick={handleSave} className="h-7 w-7">
                <CheckCircle className="h-5 w-5 text-primary" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCancel} className="h-7 w-7">
                <XCircle className="h-5 w-5 text-destructive" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-accent">{title || 'Add Title'}</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-6 w-6"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Profile Completion</span>
          <span className="text-sm font-medium">{profileCompletion}%</span>
        </div>
        <Progress value={profileCompletion} className="h-2" />
      </div>
    </div>
  );
};

export default ProfileHeader;
