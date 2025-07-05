import { formatDate } from '@functions';

const ExperienceItem = ({ experience }) => {
  return (
    <div className="py-2 first:pt-0 border-t first:border-t-0">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground">{experience.title}</h4>
          </div>
          <p className="text-muted-foreground text-sm">{experience.company}</p>
          {experience.location && (
            <p className="text-xs text-muted-foreground">{experience.location}</p>
          )}
          {experience.description && (
            <p className="text-xs mt-1 line-clamp-2">{experience.description}</p>
          )}
        </div>
        <div className="text-xs ml-4 text-right whitespace-nowrap">
          {formatDate(new Date(experience.startDate), 'MMM yyyy')} -{' '}
          {experience.current ? 'Present' : formatDate(new Date(experience.endDate), 'MMM yyyy')}
        </div>
      </div>
    </div>
  );
};

export default ExperienceItem;
