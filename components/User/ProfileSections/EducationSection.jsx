import UniversitySearch from '@components/Fields/UniversitySearch';
import { Button } from '@components/ui/button';
import { Calendar } from '@components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { Textarea } from '@components/ui/textarea';
import { formatDate } from '@functions';
import { yupResolver } from '@hookform/resolvers/yup';
import { educationSchema, initialEducationValues } from '@models/profile';
import { Calendar as CalendarIcon, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EducationForm = ({
  defaultValues = initialEducationValues,
  onSubmit,
  onCancel,
  onDelete,
  showDelete = false,
}) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(educationSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <UniversitySearch
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Search for a university..."
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Degree" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Field of Study" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          formatDate(field.value, 'MMM d, yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="border rounded-md shadow p-3"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-8">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Currently studying here</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {!form.watch('current') && (
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal bg-white"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          formatDate(field.value, 'MMM d, yyyy')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="border rounded-md shadow p-3"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional information" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter className="mt-6 flex items-center justify-between">
          {showDelete && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
          )}
          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};

const EducationItem = ({ education, onEdit, onDelete, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultValues = {
    school: education.school,
    degree: education.degree,
    fieldOfStudy: education.fieldOfStudy,
    startDate: education.startDate,
    endDate: education.endDate,
    current: education.current || false,
    description: education.description,
  };

  const handleSubmit = (data) => {
    onEdit(index, data);
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    onDelete(index);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div
        className="py-2 first:pt-0 flex justify-between border-t first:border-t-0 cursor-pointer hover:bg-accent/10 px-2 -mx-2 rounded-md transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-light text-foreground">{education.school}</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              {education.degree}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{education.fieldOfStudy}</p>
          {education.description && (
            <p className="text-xs mt-1 line-clamp-2">{education.description}</p>
          )}
        </div>
        <div className="text-xs ml-4 text-right">
          {formatDate(education.startDate, 'MMM d, yyyy')} -{' '}
          {education.current ? 'Present' : formatDate(education.endDate, 'MMM d, yyyy')}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Education Details</DialogTitle>
          </DialogHeader>
          <EducationForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            onCancel={() => setIsDialogOpen(false)}
            onDelete={handleDelete}
            showDelete={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const EducationSection = ({ education, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentDate = new Date();
  const defaultNewEducation = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: currentDate,
    endDate: currentDate,
    current: false,
    description: '',
  };

  const handleAddEducation = (data) => {
    const newEducation = [...education, data];
    onUpdate(newEducation);
    setIsDialogOpen(false);
  };

  const handleEditEducation = (index, updatedEducation) => {
    const newEducation = [...education];
    newEducation[index] = updatedEducation;
    onUpdate(newEducation);
  };

  const handleDeleteEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    onUpdate(newEducation);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Education</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Education</DialogTitle>
            </DialogHeader>
            <EducationForm
              defaultValues={defaultNewEducation}
              onSubmit={handleAddEducation}
              onCancel={() => setIsDialogOpen(false)}
              showDelete={false}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="divide-y">
        {education.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No education added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the Add button to showcase your educational background
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu, index) => (
              <EducationItem
                key={index}
                education={edu}
                index={index}
                onEdit={handleEditEducation}
                onDelete={handleDeleteEducation}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
