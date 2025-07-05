import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@components/ui/chart';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

const SkillRadarChart = ({ skills = [] }) => {
  // Transform skills data for the radar chart
  const chartData = skills.map((skill) => ({
    skill: skill.name,
    score: skill.score,
  }));

  const chartConfig = {
    score: {
      label: 'Skill Level',
      color: 'hsl(var(--primary))',
    },
  };

  if (!skills || skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">
        No skills data available
      </div>
    );
  }

  return (
    <div className="w-[250px] h-[250px]">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px] w-full h-full"
      >
        <RadarChart data={chartData} width={250} height={250}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="skill" className="text-xs" tick={{ fontSize: 10 }} />
          <PolarGrid />
          <Radar
            dataKey="score"
            fill="var(--color-score)"
            fillOpacity={0.6}
            dot={{
              r: 4,
              fillOpacity: 1,
            }}
          />
        </RadarChart>
      </ChartContainer>
    </div>
  );
};

export default SkillRadarChart;
