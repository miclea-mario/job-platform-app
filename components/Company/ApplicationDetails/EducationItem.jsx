import { formatDate } from '@functions';

const EducationItem = ({ education }) => {
  return (
    <div className="py-2 first:pt-0 border-t first:border-t-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{education.school}</h4>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground">{education.degree}</span>
            {education.fieldOfStudy && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{education.fieldOfStudy}</span>
              </>
            )}
          </div>
          {education.description && (
            <p className="text-xs mt-1 line-clamp-2">{education.description}</p>
          )}
        </div>
        <div className="text-xs ml-4 text-right whitespace-nowrap">
          {formatDate(new Date(education.startDate), 'MMM yyyy')} -{' '}
          {education.current ? 'Present' : formatDate(new Date(education.endDate), 'MMM yyyy')}
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
