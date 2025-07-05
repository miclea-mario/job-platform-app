import { Progress } from '@components/ui/progress';
import { Skeleton } from '@components/ui/skeleton';
import { getScoreColor } from '@functions';
import { useQuery } from '@hooks';
import { classnames } from '@lib';
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const AIMatchReport = ({ jobId }) => {
  const { data, status } = useQuery(`user/job-match-report/${jobId}`);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [opacity, setOpacity] = useState(1);

  // Array of friendly loading messages
  const loadingMessages = [
    'Analyzing your profile...',
    'Crunching the numbers...',
    'Matching your skills...',
    'Finding your strengths...',
    'Calculating compatibility...',
    'AI is thinking...',
    'Identifying opportunities...',
    'Almost there...',
  ];

  // Function to manage loading message animation
  useEffect(() => {
    if (status !== 'loading') return;

    let messageIndex = 0;
    let isFadingOut = false;

    const messageInterval = setInterval(() => {
      if (isFadingOut) {
        setOpacity((prev) => {
          const newOpacity = prev - 0.1;
          if (newOpacity <= 0) {
            isFadingOut = false;
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
            return 0;
          }
          return newOpacity;
        });
      } else {
        setOpacity((prev) => {
          const newOpacity = prev + 0.1;
          if (newOpacity >= 1) {
            isFadingOut = true;
            return 1;
          }
          return newOpacity;
        });
      }
    }, 100);

    setLoadingMessage(loadingMessages[0]);

    return () => clearInterval(messageInterval);
  }, [status]);

  // Render skeleton loader when data is loading
  if (status === 'loading') {
    return (
      <section className="bg-card rounded-3xl border p-6 space-y-4 relative">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-2 w-full" />

        {/* Animated loading message overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center flex-col"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '1.5rem',
            opacity: opacity,
            transition: 'opacity 0.5s ease',
          }}
        >
          <Sparkles className="h-12 w-12 text-primary animate-pulse mb-3" />
          <p className="text-primary font-medium text-lg">{loadingMessage}</p>
          <div className="mt-4 flex space-x-2">
            <div
              className="h-2 w-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="h-2 w-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
            <div
              className="h-2 w-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: '600ms' }}
            ></div>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <Skeleton className="h-16 w-full" />
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <div className="w-full">
                <Skeleton className="h-5 w-24 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-4/5 mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Extract data from API response
  const { score = 0, overview = '', strengths = [], gaps = [] } = data || {};

  const { textColor, backgroundColor } = getScoreColor(score);

  return (
    <section className="bg-card rounded-3xl border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">AI Match Score</h3>
        <div className="flex items-center gap-2">
          <Sparkles className={classnames('h-4 w-4', textColor)} />
          <span className={classnames('font-semibold', textColor)}>{score}%</span>
        </div>
      </div>
      <Progress value={score} className="h-2" indicatorColor={backgroundColor} />

      <div className="space-y-4 mt-4">
        <p className="text-sm text-muted-foreground">{overview}</p>

        {strengths.length > 0 && (
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
        )}

        {gaps.length > 0 && (
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
        )}
      </div>
    </section>
  );
};

export default AIMatchReport;
