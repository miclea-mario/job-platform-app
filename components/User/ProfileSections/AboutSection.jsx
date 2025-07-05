import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Textarea } from '@components/ui/textarea';
import { CheckCircle, Edit, XCircle } from 'lucide-react';
import { useState } from 'react';

const AboutSection = ({ bio, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(bio);

  const handleSave = () => {
    onUpdate(editedBio);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedBio(bio);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>About me</CardTitle>
        {!isEditing && (
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && (
          <div className="space-y-2">
            <Textarea
              value={editedBio}
              onChange={(e) => setEditedBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="min-h-[100px] resize-none"
              rows={8}
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={handleCancel} className="h-8">
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="h-8">
                <CheckCircle className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        )}
        {!isEditing && (
          <div className="min-h-[100px]">
            {bio ? (
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Edit className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No bio added yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the edit button to tell us about yourself
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;
