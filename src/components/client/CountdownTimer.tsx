import { Divider } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface TimeLeft {
    months: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}
interface CountdownTimerProps {
    startTime: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime }) => {
    const targetDate = new Date(startTime).getTime();

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft: TimeLeft = {
            months: '00',
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
        };

        if (difference > 0) {
            timeLeft = {
                months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)).toString().padStart(2, '0'),
                days: Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
                    .toString()
                    .padStart(2, '0'),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                    .toString()
                    .padStart(2, '0'),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                    .toString()
                    .padStart(2, '0'),
                seconds: Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0'),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const isCountdownFinished =
        timeLeft.months === '00' &&
        timeLeft.days === '00' &&
        timeLeft.hours === '00' &&
        timeLeft.minutes === '00' &&
        timeLeft.seconds === '00';

    const t = useTranslations('MyLanguage');

    return (
        <div>
            <h1>{startTime == undefined ? t('notschedule') : dayjs(startTime).format('YYYY/MM/DD HH:mm')}</h1>
            {!isCountdownFinished ? (
                <div className="border-t">
                    <span></span>
                    <span>{timeLeft.months}/</span>
                    <span>{timeLeft.days} </span>
                    <span>{timeLeft.hours}: </span>
                    <span>{timeLeft.minutes}: </span>
                    <span>{timeLeft.seconds} {t('left')}</span>
                </div>
            ) : (
                <></> // Display a message or leave blank
            )}
        </div>
    );
};

export default CountdownTimer;

