import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { CheckCircle, Edit, Plus, X, XCircle } from 'lucide-react';
import { useState } from 'react';

const SkillsSection = ({ skills, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSkills, setEditedSkills] = useState([...skills]);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    onUpdate(editedSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedSkills([...skills]);
    setNewSkill('');
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedSkills.includes(newSkill.trim())) {
      setEditedSkills([...editedSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedSkills(editedSkills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Skills</CardTitle>
        {!isEditing && (
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button
                type="button"
                size="icon"
                onClick={handleAddSkill}
                className="shrink-0"
                disabled={!newSkill.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {editedSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-secondary text-secondary-foreground gap-1 pl-3 pr-2 py-1.5"
                >
                  {skill}
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" size="sm" variant="outline" onClick={handleCancel}>
                <XCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={handleSave}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-h-[100px]">
            {skills.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Edit className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No skills added yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the edit button to showcase your skills
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="bg-secondary text-secondary-foreground px-3 py-1.5 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
