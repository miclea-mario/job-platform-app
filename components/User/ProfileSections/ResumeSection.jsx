import { updateResume } from '@api/user';
import FileUpload from '@components/Fields/FileUpload';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@components/ui/form';
import { formatDate } from '@functions';
import { useMutation } from '@hooks';
import { toaster } from '@lib';
import { CheckCircle, Download, Edit, FileText, Upload, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ResumeSection = ({ resume, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    defaultValues: {
      file: null,
    },
  });

  const updateResumeMutation = useMutation(updateResume, {
    onSuccess: (response) => {
      onUpdate(response.data.resume);
      setIsEditing(false);
      toaster.success('Resume updated successfully');
    },
    onError: (error) => {
      toaster.error(error.message || 'Failed to update resume');
    },
  });

  const handleSave = async (data) => {
    if (!data.file) {
      setIsEditing(false);
      return;
    }

    try {
      await updateResumeMutation.mutateAsync(data.file);
    } catch (error) {
      console.error('Failed to update resume:', error);
    }
  };

  const handleCancel = () => {
    form.reset({
      file: null,
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Resume</CardTitle>
        {!isEditing && (
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>Upload resume</FormLabel>
                    <FormControl>
                      <FileUpload
                        accept=".pdf"
                        setFile={(file) => onChange(file[0])}
                        disabled={updateResumeMutation.isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" size="sm" variant="outline" onClick={handleCancel}>
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!form.watch('file') || updateResumeMutation.isLoading}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {updateResumeMutation.isLoading ? 'Uploading...' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col gap-3">
            {resume?.url ? (
              <>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  <span>{resume.fileName || 'View Resume'}</span>
                  <Download className="h-3 w-3 ml-auto" />
                </a>
                {resume.updatedAt && (
                  <p className="text-xs text-muted-foreground">
                    Last updated: {formatDate(resume.updatedAt, 'MMM d, yyyy')}
                  </p>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">No Resume Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your resume to make your profile more attractive to employers
                </p>
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resume
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
