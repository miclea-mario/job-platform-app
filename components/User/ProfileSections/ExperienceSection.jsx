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
import { experienceSchema, initialExperienceValues } from '@models/profile';
import { Calendar as CalendarIcon, MapPin, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ExperienceForm = ({
  defaultValues = initialExperienceValues,
  onSubmit,
  onCancel,
  onDelete,
  showDelete = false,
}) => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(experienceSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

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
                      captionLayout="dropdown"
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
                <FormLabel>Currently working here</FormLabel>
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
                      captionLayout="dropdown"
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
                <Textarea placeholder="Job description" {...field} />
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

const ExperienceItem = ({ experience, onEdit, onDelete, index }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultValues = {
    title: experience.title,
    company: experience.company,
    location: experience.location,
    startDate: experience.startDate,
    endDate: experience.endDate,
    current: experience.current || false,
    description: experience.description,
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
          <div className="flex items-center">
            <h3 className="font-light text-muted-foreground">{experience.title}</h3>
          </div>
          <p className="text-primary text-sm">{experience.company}</p>
          <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
            {experience.description}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <p className="text-xs">
            {formatDate(experience.startDate, 'MMM d, yyyy')} -{' '}
            {experience.current ? 'Present' : formatDate(experience.endDate, 'MMM d, yyyy')}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="w-4 h-4" /> {experience.location}{' '}
          </p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Experience Details</DialogTitle>
          </DialogHeader>
          <ExperienceForm
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

const ExperienceSection = ({ experience, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentDate = new Date();
  const defaultNewExperience = {
    title: '',
    company: '',
    location: '',
    startDate: currentDate,
    endDate: currentDate,
    current: false,
    description: '',
  };

  const handleAddExperience = (data) => {
    const newExperience = [...experience, data];
    onUpdate(newExperience);
    setIsDialogOpen(false);
  };

  const handleEditExperience = (index, updatedExperience) => {
    const newExperience = [...experience];
    newExperience[index] = updatedExperience;
    onUpdate(newExperience);
  };

  const handleDeleteExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    onUpdate(newExperience);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Experience</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm
              defaultValues={defaultNewExperience}
              onSubmit={handleAddExperience}
              onCancel={() => setIsDialogOpen(false)}
              showDelete={false}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="divide-y">
        {experience.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No experience added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click the Add button to showcase your work experience
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <ExperienceItem
                key={index}
                experience={exp}
                index={index}
                onEdit={handleEditExperience}
                onDelete={handleDeleteExperience}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
