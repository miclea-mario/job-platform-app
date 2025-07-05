'use client';

import { Button } from '@components/ui/button';
import { classnames } from '@lib';
import { cva } from 'class-variance-authority';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInMinutes,
  format,
  getMonth,
  isSameDay,
  isSameHour,
  isSameMonth,
  isToday,
  setHours,
  setMonth,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const monthEventVariants = cva('size-2 rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      pink: 'bg-pink-500',
      purple: 'bg-purple-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Context = createContext({});

const Calendar = ({
  children,
  defaultDate = new Date(),
  locale = enUS,
  enableHotkeys = true,
  view: _defaultMode = 'month',
  onEventClick,
  events: defaultEvents = [],
  onChangeView,
}) => {
  const [view, setView] = useState(_defaultMode);
  const [date, setDate] = useState(defaultDate);
  const [events, setEvents] = useState(defaultEvents);

  const changeView = (view) => {
    setView(view);
    onChangeView?.(view);
  };

  useHotkeys('m', () => changeView('month'), {
    enabled: enableHotkeys,
  });

  useHotkeys('w', () => changeView('week'), {
    enabled: enableHotkeys,
  });

  useHotkeys('y', () => changeView('year'), {
    enabled: enableHotkeys,
  });

  useHotkeys('d', () => changeView('day'), {
    enabled: enableHotkeys,
  });

  return (
    <Context.Provider
      value={{
        view,
        setView,
        date,
        setDate,
        events,
        setEvents,
        locale,
        enableHotkeys,
        onEventClick,
        onChangeView,
        today: new Date(),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useCalendar = () => useContext(Context);

const CalendarViewTrigger = forwardRef(({ children, view, ...props }) => {
  const { view: currentView, setView, onChangeView } = useCalendar();

  return (
    <Button
      aria-current={currentView === view}
      size="sm"
      variant="ghost"
      {...props}
      onClick={() => {
        setView(view);
        onChangeView?.(view);
      }}
    >
      {children}
    </Button>
  );
});
CalendarViewTrigger.displayName = 'CalendarViewTrigger';

const EventGroup = ({ events, hour }) => {
  const { onEventClick } = useCalendar();

  return (
    <div className="h-20 border-t last:border-b">
      {events
        .filter((event) => isSameHour(event.start, hour))
        .map((event) => {
          const hoursDifference = differenceInMinutes(event.end, event.start) / 60;
          const startPosition = event.start.getMinutes() / 60;

          return (
            <div
              key={event.id}
              className={classnames(
                'relative cursor-pointer hover:opacity-90 transition-all p-2 rounded-md border-l-4',
                'bg-blue-50 border-blue-400 text-blue-900 hover:bg-blue-100'
              )}
              style={{
                top: `${startPosition * 100}%`,
                height: `${Math.max(hoursDifference * 100, 25)}%`, // Minimum height for visibility
              }}
              onClick={() => onEventClick?.(event)}
            >
              <div className="flex items-start gap-2 h-full">
                {event.user && (
                  <div className="shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-sm">
                    {event.user.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">
                    {event.user?.name || 'Candidate'}
                  </div>
                  {event.job?.title && (
                    <div className="text-xs text-blue-700 truncate">{event.job.title}</div>
                  )}
                  <div className="text-xs text-blue-600 font-medium">
                    {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const CalendarDayView = () => {
  const { view, events, date } = useCalendar();

  if (view !== 'day') return null;

  const hours = [...Array(24)].map((_, i) => setHours(date, i));

  return (
    <div className="flex relative pt-2 overflow-auto h-full">
      <TimeTable />
      <div className="flex-1">
        {hours.map((hour) => (
          <EventGroup key={hour.toString()} hour={hour} events={events} />
        ))}
      </div>
    </div>
  );
};

const CalendarWeekView = () => {
  const { view, date, locale, events } = useCalendar();

  const weekDates = useMemo(() => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(start, i);
      const hours = [...Array(24)].map((_, i) => setHours(day, i));
      weekDates.push(hours);
    }

    return weekDates;
  }, [date]);

  const headerDays = useMemo(() => {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const result = addDays(startOfWeek(date, { weekStartsOn: 0 }), i);
      daysOfWeek.push(result);
    }
    return daysOfWeek;
  }, [date]);

  if (view !== 'week') return null;

  return (
    <div className="flex flex-col relative overflow-auto h-full">
      <div className="flex sticky top-0 bg-card z-10 border-b mb-3">
        <div className="w-12"></div>
        {headerDays.map((date, i) => (
          <div
            key={date.toString()}
            className={classnames(
              'text-center flex-1 gap-1 pb-2 text-sm text-muted-foreground flex items-center justify-center',
              [0, 6].includes(i) && 'text-muted-foreground/50'
            )}
          >
            {format(date, 'E', { locale })}
            <span
              className={classnames(
                'h-6 grid place-content-center',
                isToday(date) && 'bg-primary text-primary-foreground rounded-full size-6'
              )}
            >
              {format(date, 'd')}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-1">
        <div className="w-fit">
          <TimeTable />
        </div>
        <div className="grid grid-cols-7 flex-1">
          {weekDates.map((hours, i) => {
            return (
              <div
                className={classnames(
                  'h-full text-sm text-muted-foreground border-l first:border-l-0',
                  [0, 6].includes(i) && 'bg-muted/50'
                )}
                key={hours[0].toString()}
              >
                {hours.map((hour) => (
                  <EventGroup key={hour.toString()} hour={hour} events={events} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CalendarMonthView = () => {
  const { date, view, events, locale, onEventClick } = useCalendar();

  const monthDates = useMemo(() => getDaysInMonth(date), [date]);
  const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

  if (view !== 'month') return null;

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-7 gap-px sticky top-0 bg-background border-b">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={classnames(
              'mb-2 text-right text-sm text-muted-foreground pr-2',
              [0, 6].includes(i) && 'text-muted-foreground/50'
            )}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid overflow-hidden -mt-px flex-1 auto-rows-fr p-px grid-cols-7 gap-px">
        {monthDates.map((_date) => {
          const currentEvents = events.filter((event) => isSameDay(event.start, _date));

          return (
            <div
              className={classnames(
                'ring-1 p-2 text-sm text-muted-foreground ring-border overflow-auto min-h-28',
                !isSameMonth(date, _date) && 'text-muted-foreground/50'
              )}
              key={_date.toString()}
            >
              <span
                className={classnames(
                  'size-6 grid place-items-center rounded-full mb-1 sticky top-0',
                  isToday(_date) && 'bg-primary text-primary-foreground'
                )}
              >
                {format(_date, 'd')}
              </span>

              {currentEvents.map((event) => {
                return (
                  <div
                    key={event.id}
                    className="px-1 py-1 mb-1 rounded text-sm flex items-center gap-2 cursor-pointer hover:bg-muted/70 transition-colors border border-transparent hover:border-blue-200"
                    onClick={() => onEventClick?.(event)}
                  >
                    {event.user ? (
                      <div className="shrink-0 h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white border-2 border-white shadow-sm">
                        {event.user.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    ) : (
                      <div
                        className={classnames(
                          'shrink-0',
                          monthEventVariants({ variant: event.color })
                        )}
                      ></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium text-gray-900">
                        {event.user?.name || 'Candidate'}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {event.job?.title || 'Interview'}
                      </div>
                    </div>
                    <time className="tabular-nums text-muted-foreground/70 text-xs font-medium bg-white/80 px-1 py-0.5 rounded">
                      {format(event.start, 'HH:mm')}
                    </time>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarYearView = () => {
  const { view, date, today, locale } = useCalendar();

  const months = useMemo(() => {
    if (!view) {
      return [];
    }

    return Array.from({ length: 12 }).map((_, i) => {
      return getDaysInMonth(setMonth(date, i));
    });
  }, [date, view]);

  const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

  if (view !== 'year') return null;

  return (
    <div className="grid grid-cols-4 gap-10 overflow-auto h-full">
      {months.map((days, i) => (
        <div key={days[0].toString()}>
          <span className="text-xl">{i + 1}</span>

          <div className="grid grid-cols-7 gap-2 my-5">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid gap-x-2 text-center grid-cols-7 text-xs tabular-nums">
            {days.map((_date) => {
              return (
                <div
                  key={_date.toString()}
                  className={classnames(getMonth(_date) !== i && 'text-muted-foreground')}
                >
                  <div
                    className={classnames(
                      'aspect-square grid place-content-center size-full tabular-nums',
                      isSameDay(today, _date) &&
                        getMonth(_date) === i &&
                        'bg-primary text-primary-foreground rounded-full'
                    )}
                  >
                    {format(_date, 'd')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const CalendarNextTrigger = forwardRef(({ children, onClick, ...props }, ref) => {
  const { date, setDate, view, enableHotkeys } = useCalendar();

  const next = useCallback(() => {
    if (view === 'day') {
      setDate(addDays(date, 1));
    } else if (view === 'week') {
      setDate(addWeeks(date, 1));
    } else if (view === 'month') {
      setDate(addMonths(date, 1));
    } else if (view === 'year') {
      setDate(addYears(date, 1));
    }
  }, [date, view, setDate]);

  useHotkeys('ArrowRight', () => next(), {
    enabled: enableHotkeys,
  });

  return (
    <Button
      size="icon"
      variant="outline"
      ref={ref}
      {...props}
      onClick={(e) => {
        next();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
});
CalendarNextTrigger.displayName = 'CalendarNextTrigger';

const CalendarPrevTrigger = forwardRef(({ children, onClick, ...props }, ref) => {
  const { date, setDate, view, enableHotkeys } = useCalendar();

  useHotkeys('ArrowLeft', () => prev(), {
    enabled: enableHotkeys,
  });

  const prev = useCallback(() => {
    if (view === 'day') {
      setDate(subDays(date, 1));
    } else if (view === 'week') {
      setDate(subWeeks(date, 1));
    } else if (view === 'month') {
      setDate(subMonths(date, 1));
    } else if (view === 'year') {
      setDate(subYears(date, 1));
    }
  }, [date, view, setDate]);

  return (
    <Button
      size="icon"
      variant="outline"
      ref={ref}
      {...props}
      onClick={(e) => {
        prev();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
});
CalendarPrevTrigger.displayName = 'CalendarPrevTrigger';

const CalendarTodayTrigger = forwardRef(({ children, onClick, ...props }, ref) => {
  const { setDate, enableHotkeys, today } = useCalendar();

  useHotkeys('t', () => jumpToToday(), {
    enabled: enableHotkeys,
  });

  const jumpToToday = useCallback(() => {
    setDate(today);
  }, [today, setDate]);

  return (
    <Button
      variant="outline"
      ref={ref}
      {...props}
      onClick={(e) => {
        jumpToToday();
        onClick?.(e);
      }}
    >
      {children}
    </Button>
  );
});
CalendarTodayTrigger.displayName = 'CalendarTodayTrigger';

const CalendarCurrentDate = () => {
  const { date, view } = useCalendar();

  return (
    <time dateTime={date.toISOString()} className="tabular-nums">
      {format(date, view === 'day' ? 'dd MMMM yyyy' : 'MMMM yyyy')}
    </time>
  );
};

const TimeTable = () => {
  const now = new Date();

  return (
    <div className="pr-2 w-12">
      {Array.from(Array(25).keys()).map((hour) => {
        return (
          <div
            className="text-right relative text-xs text-muted-foreground/50 h-20 last:h-0"
            key={hour}
          >
            {now.getHours() === hour && (
              <div
                className="absolute z- left-full translate-x-2 w-dvw h-[2px] bg-red-500"
                style={{
                  top: `${(now.getMinutes() / 60) * 100}%`,
                }}
              >
                <div className="size-2 rounded-full bg-red-500 absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            )}
            <p className="top-0 -translate-y-1/2">{hour === 24 ? 0 : hour}:00</p>
          </div>
        );
      })}
    </div>
  );
};

const getDaysInMonth = (date) => {
  const startOfMonthDate = startOfMonth(date);
  const startOfWeekForMonth = startOfWeek(startOfMonthDate, {
    weekStartsOn: 0,
  });

  let currentDate = startOfWeekForMonth;
  const calendar = [];

  while (calendar.length < 42) {
    calendar.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return calendar;
};

const generateWeekdays = (locale) => {
  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i);
    daysOfWeek.push(format(date, 'EEEEEE', { locale }));
  }
  return daysOfWeek;
};

export {
  Calendar,
  CalendarCurrentDate,
  CalendarDayView,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
  CalendarWeekView,
  CalendarYearView,
};
