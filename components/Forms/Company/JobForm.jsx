import { DatePicker, Input, Number, Select, Textarea } from '@components/Fields';
import { ArrayField, Field, Fieldset, Form, Submit } from '@components/HookForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { SelectItem } from '@components/ui/select';
import {
  EMPLOYMENT_TYPE,
  EXPERIENCE_LEVEL,
  MINIMUM_QUALIFICATION,
  WORKPLACE_TYPE,
} from '@constants/job';
import {
  AlertTriangle,
  Briefcase,
  Building2,
  DollarSign,
  Euro,
  Eye,
  FileText,
  GraduationCap,
  Info,
  Lightbulb,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/router';

const JobForm = () => {
  const router = useRouter();
  const isEditing = router.pathname.includes('/edit');

  return (
    <div>
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? 'Update your job posting details to attract the right candidates'
            : 'Fill in the details below to create an attractive job posting'}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Form - Left Side */}
        <div className="xl:col-span-3">
          <Form className="space-y-8">
            {/* Basic Job Information */}
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Information
                </CardTitle>
                <CardDescription>Basic information about the position and company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Fieldset name="title" label="Job Title" className="md:col-span-2">
                    <Field
                      id="title"
                      name="title"
                      as={Input}
                      placeholder="e.g. Senior Software Engineer, Marketing Manager"
                    />
                  </Fieldset>

                  <Fieldset name="numberOfOpenings" label="Number of Openings">
                    <Field
                      id="numberOfOpenings"
                      name="numberOfOpenings"
                      as={Number}
                      placeholder="1"
                      startAdornment={<Users className="h-4 w-4" />}
                    />
                  </Fieldset>

                  <Fieldset name="deadlineDate" label="Application Deadline">
                    <Field as={DatePicker} name="deadlineDate" placeholder="Select deadline date" />
                  </Fieldset>
                  <Fieldset name="employmentType" label="Employment Type">
                    <Field id="employmentType" name="employmentType" as={Select}>
                      {Object.values(EMPLOYMENT_TYPE).map((employmentType) => (
                        <SelectItem key={employmentType} value={employmentType}>
                          {employmentType}
                        </SelectItem>
                      ))}
                    </Field>
                  </Fieldset>
                </div>

                <Fieldset name="description" label="Job Description">
                  <Field
                    id="description"
                    name="description"
                    placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                    as={Textarea}
                    className="min-h-[120px]"
                  />
                </Fieldset>

                <Fieldset name="responsibilities" label="Key Responsibilities">
                  <ArrayField
                    name="responsibilities"
                    placeholder="Add a key responsibility"
                    charactersLimit={80}
                    elementLimit={8}
                  />
                </Fieldset>
              </CardContent>
            </Card>

            {/* Location & Work Setup */}
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Work Setup
                </CardTitle>
                <CardDescription>
                  Where will the employee work and what's the setup?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Fieldset name="city" label="City">
                    <Field
                      id="city"
                      name="city"
                      as={Input}
                      placeholder="e.g. Bucharest, Cluj-Napoca, Remote"
                      startAdornment={<Building2 className="h-4 w-4" />}
                    />
                  </Fieldset>

                  <Fieldset name="workplaceType" label="Work Type">
                    <Field id="workplaceType" name="workplaceType" as={Select}>
                      {Object.values(WORKPLACE_TYPE).map((workplaceType) => (
                        <SelectItem key={workplaceType} value={workplaceType}>
                          <div className="flex items-center gap-2">
                            {workplaceType === 'Remote' && <span>🏠</span>}
                            {workplaceType === 'On site' && <span>🏢</span>}
                            {workplaceType === 'Hybrid' && <span>🔄</span>}
                            {workplaceType}
                          </div>
                        </SelectItem>
                      ))}
                    </Field>
                  </Fieldset>
                </div>
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Compensation
                </CardTitle>
                <CardDescription>Salary range and compensation details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Fieldset name="salary.min" label="Minimum Salary">
                    <Field
                      id="salary.min"
                      name="salary.min"
                      as={Number}
                      placeholder="3000"
                      endAdornment={<Euro className="h-4 w-4" />}
                    />
                  </Fieldset>

                  <Fieldset name="salary.max" label="Maximum Salary">
                    <Field
                      id="salary.max"
                      name="salary.max"
                      as={Number}
                      placeholder="5000"
                      endAdornment={<Euro className="h-4 w-4" />}
                    />
                  </Fieldset>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Salary Transparency</p>
                      <p>
                        Including salary ranges helps attract qualified candidates and improves
                        application quality.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Qualifications */}
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Requirements & Qualifications
                </CardTitle>
                <CardDescription>
                  What qualifications and skills are needed for this role?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Fieldset name="minimumQualification" label="Education Level">
                    <Field id="minimumQualification" name="minimumQualification" as={Select}>
                      {Object.values(MINIMUM_QUALIFICATION).map((qualification) => (
                        <SelectItem key={qualification} value={qualification}>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            {qualification}
                          </div>
                        </SelectItem>
                      ))}
                    </Field>
                  </Fieldset>

                  <Fieldset name="experienceLevel" label="Experience Level">
                    <Field id="experienceLevel" name="experienceLevel" as={Select}>
                      {Object.values(EXPERIENCE_LEVEL).map((experienceLevel) => (
                        <SelectItem key={experienceLevel} value={experienceLevel}>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            {experienceLevel}
                          </div>
                        </SelectItem>
                      ))}
                    </Field>
                  </Fieldset>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Fieldset name="requiredSkills" label="Required Skills">
                    <ArrayField
                      name="requiredSkills"
                      placeholder="Add a required skill"
                      charactersLimit={50}
                      elementLimit={10}
                    />
                  </Fieldset>

                  <Fieldset name="benefits" label="Benefits & Perks">
                    <ArrayField
                      name="benefits"
                      placeholder="Add a benefit or perk"
                      charactersLimit={50}
                      elementLimit={8}
                    />
                  </Fieldset>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Submit className="w-full md:w-auto min-w-[200px] h-12 text-lg font-medium">
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <FileText className="h-5 w-5" />
                      Update Job Posting
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-5 w-5" />
                      Publish Job Posting
                    </>
                  )}
                </div>
              </Submit>
            </div>
          </Form>
        </div>

        {/* AI Tips & Recommendations Sidebar - Right Side */}
        <div className="xl:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* AI Writing Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  AI Matching Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Use Standard Skill Names</p>
                      <p className="text-muted-foreground">
                        Use common skill terms like "JavaScript", "Project Management" for better AI
                        matching
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Include Experience Keywords</p>
                      <p className="text-muted-foreground">
                        Mention specific technologies, tools, and methodologies candidates use
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Eye className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium">Detailed Responsibilities</p>
                      <p className="text-muted-foreground">
                        Describe actual tasks to help AI match candidate experience accurately
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Mistakes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Avoid These Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="font-medium text-red-600">× Vague job titles</p>
                    <p className="text-muted-foreground text-xs">
                      Use "Marketing Manager" not "Marketing Ninja"
                    </p>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium text-red-600">× Too many requirements</p>
                    <p className="text-muted-foreground text-xs">
                      Focus on 5-7 essential skills maximum
                    </p>
                  </div>

                  <div className="text-sm">
                    <p className="font-medium text-red-600">× No company culture info</p>
                    <p className="text-muted-foreground text-xs">
                      Mention work environment and values
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
