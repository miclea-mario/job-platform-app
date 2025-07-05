import { Progress } from '@components/ui/progress';
import { getScoreColor } from '@functions';
import { classnames } from '@lib';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SkillRadarChart } from '.';

const AIMatchingReport = ({ jobMatchReport }) => {
  const { score, overview, strengths, gaps } = jobMatchReport;
  const { textColor, backgroundColor } = getScoreColor(score);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">AI Matching Report</h3>
      <div className="flex justify-between gap-20">
        <div className="col-span-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Match</span>
              <span className={classnames('text-sm font-bold', textColor)}>{score}%</span>
            </div>
            <Progress
              value={score}
              className={classnames('h-2 bg-opacity-20', backgroundColor)}
              indicatorColor={backgroundColor}
            />
            <p className="text-sm text-muted-foreground">{overview}</p>
          </div>
        </div>
        {jobMatchReport.essentialSkills && (
          <SkillRadarChart skills={jobMatchReport.essentialSkills} />
        )}
      </div>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Strengths</p>
              <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                {strengths.map((strength, idx) => (
                  <li key={idx}>{strength}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Skill Gaps</p>
              <ul className="text-sm text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                {gaps.map((gap, idx) => (
                  <li key={idx}>{gap}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
        <p>*AI analysis based on resume data and job requirements.</p>
      </div>
    </div>
  );
};

export default AIMatchingReport;
