import React from 'react';

const RadarChart = ({ scores, labels, size = 300 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5;
  const sides = scores.length;
  const angleStep = (2 * Math.PI) / sides;

  const getPoint = (index, value) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 5) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const gridLines = Array.from({ length: levels }, (_, i) => {
    const levelRadius = ((i + 1) / levels) * radius;
    const points = Array.from({ length: sides }, (_, j) => {
      const angle = angleStep * j - Math.PI / 2;
      return `${center + levelRadius * Math.cos(angle)},${center + levelRadius * Math.sin(angle)}`;
    }).join(' ');
    return points;
  });

  const dataPoints = scores.map((score, i) => getPoint(i, score));
  const dataPath = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const axisLines = Array.from({ length: sides }, (_, i) => {
    const angle = angleStep * i - Math.PI / 2;
    return {
      x2: center + radius * Math.cos(angle),
      y2: center + radius * Math.sin(angle)
    };
  });

  const labelPositions = labels.map((label, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const labelR = radius + 32;
    return {
      x: center + labelR * Math.cos(angle),
      y: center + labelR * Math.sin(angle),
      text: label
    };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md mx-auto">
      {/* Grid */}
      {gridLines.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={i === levels - 1 ? 1.5 : 0.5}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={center} y1={center}
          x2={line.x2} y2={line.y2}
          stroke="#e2e8f0" strokeWidth={0.5}
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPath}
        fill="rgba(99, 102, 241, 0.15)"
        stroke="#6366f1"
        strokeWidth={2}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="#6366f1" stroke="#fff" strokeWidth={2} />
      ))}

      {/* Labels */}
      {labelPositions.map((pos, i) => (
        <text
          key={i}
          x={pos.x} y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-slate-600 text-[9px] font-semibold"
        >
          {pos.text.length > 18
            ? pos.text.split(' ').reduce((lines, word) => {
                const last = lines[lines.length - 1];
                if (last && (last + ' ' + word).length <= 18) {
                  lines[lines.length - 1] = last + ' ' + word;
                } else {
                  lines.push(word);
                }
                return lines;
              }, []).map((line, j) => (
                <tspan key={j} x={pos.x} dy={j === 0 ? 0 : 11}>{line}</tspan>
              ))
            : pos.text
          }
        </text>
      ))}

      {/* Level numbers */}
      {Array.from({ length: levels }, (_, i) => {
        const y = center - ((i + 1) / levels) * radius;
        return (
          <text key={i} x={center + 8} y={y + 3} className="fill-slate-400 text-[8px]">
            {i + 1}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;
