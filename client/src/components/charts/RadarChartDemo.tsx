
import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define types for the habit data structure
interface DaysTracked {
  current_streak: number;
  total_days: number;
  completed_days_count: number;
}

interface Habit {
  _id: string;
  habit_name: string;
  days_tracked: DaysTracked;
}

// Define type for transformed chart data
interface ChartDataPoint {
  name: string;
  completionRate: number;
  currentStreak: number;
}

// Transform habits data for the radar chart
const transformHabitsData = (habits: Habit[]): ChartDataPoint[] => {
  return habits.map(habit => ({
    name: habit.habit_name,
    completionRate: Math.round((habit.days_tracked.completed_days_count / habit.days_tracked.total_days) * 100),
    currentStreak: habit.days_tracked.current_streak
  }));
};

const habitsData: Habit[] = [
  {
    "_id": "1",
    "habit_name": "Exercise",
    "days_tracked": {
      "current_streak": 3,
      "total_days": 30,
      "completed_days_count": 20
    }
  },
  {
    "_id": "2",
    "habit_name": "Read a Book",
    "days_tracked": {
      "current_streak": 5,
      "total_days": 30,
      "completed_days_count": 25
    }
  },
  {
    "_id": "3",
    "habit_name": "Meditation",
    "days_tracked": {
      "current_streak": 2,
      "total_days": 15,
      "completed_days_count": 10
    }
  },
  {
    "_id": "4",
    "habit_name": "Coding Practice",
    "days_tracked": {
      "current_streak": 7,
      "total_days": 30,
      "completed_days_count": 28
    }
  },
  {
    "_id": "5",
    "habit_name": "Drink 8 Glasses of Water",
    "days_tracked": {
      "current_streak": 10,
      "total_days": 30,
      "completed_days_count": 30
    }
  },
  {
    "_id": "6",
    "habit_name": "Journal Writing",
    "days_tracked": {
      "current_streak": 4,
      "total_days": 30,
      "completed_days_count": 25
    }
  }
];

const chartConfig = {
  completionRate: {
    label: "Completion Rate",
    color: "hsl(var(--chart-1))",
  },
  currentStreak: {
    label: "Current Streak",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface TickProps {
  x: number;
  y: number;
  textAnchor: string;
  value: string;
  index: number;
  payload: {
    value: string;
  };
}

export  function HabitsRadarChart(): JSX.Element {
  const chartData = transformHabitsData(habitsData);

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Habits Performance Overview</CardTitle>
        <CardDescription>
          Showing completion rates and current streaks for all habits
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="name"
              tick={({ x, y, textAnchor, value, index, ...props }: TickProps) => {
                const data = chartData[index];
                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{data.completionRate}%</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{data.currentStreak}d</tspan>
                    <tspan
                      x={x}
                      dy="1rem"
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.name}
                    </tspan>
                  </text>
                );
              }}
            />
            <PolarGrid />
            <Radar
              dataKey="completionRate"
              stroke="var(--color-completionRate)"
              fill="var(--color-completionRate)"
              fillOpacity={0.6}
            />
            <Radar
              dataKey="currentStreak"
              stroke="var(--color-currentStreak)"
              fill="var(--color-currentStreak)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Overall completion trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Habits Performance Analysis
        </div>
      </CardFooter>
    </Card>
  );
}

export default HabitsRadarChart;