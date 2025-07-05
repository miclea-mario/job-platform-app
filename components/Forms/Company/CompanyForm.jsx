import { Avatar, Combobox, Email, Input, Phone, Select, Textarea } from '@components/Fields';
import { ArrayField, Field, Fieldset, Form, Submit } from '@components/HookForm';
import { CardTitle } from '@components/ui/card';
import { SelectItem } from '@components/ui/select';
import { COMPANY_SIZE } from '@constants/company';
import { countries } from '@data';
import { useFormContext, useWatch } from 'react-hook-form';

const CompanyForm = () => {
  const values = useWatch();
  const form = useFormContext();

  const handleAvatarChange = (file) => {
    form.setValue('avatar', file);
  };

  return (
    <Form className="flex flex-col gap-10">
      {/* Company Profile Section */}
      <div className="flex flex-col gap-5">
        <div className="space-y-6">
          <div className="flex gap-6 items-start">
            <Avatar name={values.name} value={values.avatar} onChange={handleAvatarChange} />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Fieldset name="name" label="Company name">
                <Field id="name" name="name" as={Input} />
              </Fieldset>
              <Fieldset name="email" label="Email">
                <Field id="email" name="email" as={Email} />
              </Fieldset>
              <Fieldset name="phone" label="Phone">
                <Field id="phone" name="phone" as={Phone} />
              </Fieldset>
              <Fieldset name="website" label="Website">
                <Field id="website" name="website" as={Input} />
              </Fieldset>
            </div>
          </div>
          <Fieldset name="description" label="Description">
            <Field
              id="description"
              name="description"
              placeholder="Tell us about your company..."
              as={Textarea}
              className="min-h-[100px]"
            />
          </Fieldset>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="flex flex-col gap-5">
        <CardTitle>Company Details</CardTitle>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Fieldset name="industry" label="Industry">
              <Field id="industry" name="industry" as={Input} placeholder="e.g. Technology" />
            </Fieldset>
            <Fieldset name="companySize" label="Company Size">
              <Field id="companySize" name="companySize" as={Select}>
                {COMPANY_SIZE.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </Field>
            </Fieldset>
            <Fieldset name="foundedYear" label="Founded Year">
              <Field
                id="foundedYear"
                name="foundedYear"
                as={Input}
                type="number"
                placeholder="YYYY"
              />
            </Fieldset>
          </div>
        </div>
      </div>

      {/* Company Location Section */}
      <div className="flex flex-col gap-5">
        <CardTitle>Company Location</CardTitle>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Fieldset name="address" label="Address">
              <Field id="address" name="address" as={Input} />
            </Fieldset>
            <Fieldset name="city" label="City">
              <Field id="city" name="city" as={Input} />
            </Fieldset>
            <Fieldset name="country" label="Country">
              <Field id="country" name="country" as={Combobox}>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </Field>
            </Fieldset>
            <Fieldset name="postalCode" label="Postal Code">
              <Field id="postalCode" name="postalCode" as={Input} />
            </Fieldset>
          </div>
        </div>
      </div>

      {/* Company Culture Section */}
      <div className="flex flex-col gap-5">
        <CardTitle>Company Culture</CardTitle>
        <div className="space-y-6">
          <Fieldset name="values" label="Company Values">
            <ArrayField name="values" placeholder="Value" charactersLimit={50} elementLimit={6} />
          </Fieldset>
          <Fieldset name="benefits" label="Company Benefits">
            <ArrayField
              name="benefits"
              placeholder="Benefit"
              charactersLimit={50}
              elementLimit={6}
            />
          </Fieldset>
        </div>
      </div>

      <Submit className="w-full">Update Company Profile</Submit>
    </Form>
  );
};

export default CompanyForm;
