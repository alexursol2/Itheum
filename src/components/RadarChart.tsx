import React from 'react';
import '../styles/profile.scss';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function RadarChart({ profile }: { profile: any }) {
    const labelsFromProfile = profile ? Object.keys(profile) : [];
    const dataFromProfile = profile ? Object.values(profile) : [];

    const data = {
        labels: labelsFromProfile,
        datasets: [
            {
                label: '# of Votes',
                data: dataFromProfile,
                backgroundColor: 'rgba(66, 189, 99, 0.30)',
                borderColor: '#42BD63',
                borderWidth: 4,
                pointRadius: 0,
                tension: 0.01,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltips: {
                enabled: false,
                font: {
                    size: 24
                }

            }
        },
        scales: {
            r: {
                angleLines: {
                    display: false,
                },
                suggestedMin: -5,
                suggestedMax: 100,
                grid: {
                    lineWidth: 2,
                    borderWidth: 1,

                },
                pointLabels: {
                    color: '#ffffff',
                    font: {
                        size: (window.innerWidth < 600 ? 14 : 20) // is responsive
                    }
                },
                ticks: {
                    display: false,
                    stepSize: 1,

                },
                afterBuildTicks: (axis: { ticks: { value: number; }[]; }) => axis.ticks = [0, 1, 33, 67, 100].map(v => ({ value: v }))
            },
        },
    };

    return (
        <Radar data={data} options={options} />
    );
}