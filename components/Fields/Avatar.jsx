import { AvatarFallback, AvatarImage, Avatar as AvatarUI } from '@components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { getNameInitials } from '@functions';
import { Edit2Icon, Trash2, Upload, User } from 'lucide-react';
import { useRef, useState } from 'react';

const Avatar = ({
  value = '',
  onChange = () => {},
  onDelete = () => {},
  disabled = false,
  name = '',
  className = 'w-24 h-24 cursor-pointer',
}) => {
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setPreview('');
    onDelete(value);
  };

  return (
    <div>
      <div className="relative">
        <AvatarUI className={className}>
          <AvatarImage src={preview} alt="Avatar" />
          <AvatarFallback>{getNameInitials(name) || <User className="w-8 h-8" />}</AvatarFallback>
        </AvatarUI>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="group absolute shadow-md p-2 bottom-3 right-0 bg-secondary-foreground hover:bg-secondary border-secondary rounded-full border-4 cursor-pointer transition-colors">
              <Edit2Icon className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-2"
              onSelect={handleUploadClick}
              disabled={disabled}
            >
              <Upload className="h-4 w-4" />
              Upload photo
            </DropdownMenuItem>

            {preview && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex items-center gap-2 text-destructive"
                  onSelect={handleRemovePhoto}
                  disabled={disabled}
                >
                  <Trash2 className="h-4 w-4" />
                  Remove photo
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <Input
          id="avatar"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Avatar;
