import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { CheckCircle, Edit, Mail, MapPin, Phone, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactSection = ({ phone, email, location, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm({
    defaultValues: {
      phone,
      email,
      location,
    },
  });

  const handleSave = (data) => {
    onUpdate(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    form.reset({
      phone,
      email,
      location,
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Contact</CardTitle>
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
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your location"
                        {...field}
                        startAdornment={<MapPin className="h-4 w-4" />}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your phone number"
                        {...field}
                        startAdornment={<Phone className="h-4 w-4" />}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your email"
                        type="email"
                        {...field}
                        startAdornment={<Mail className="h-4 w-4" />}
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
                <Button type="submit" size="sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="min-h-[100px]">
            {!phone && !email && !location ? (
              <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Edit className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No contact information added yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Click the edit button to add your contact details
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {location && (
                  <div className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-accent/10 transition-colors overflow-hidden">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span>{location}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-accent/10 transition-colors overflow-hidden">
                    <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span>{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-accent/10 transition-colors overflow-hidden">
                    <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span>{email}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSection;
