import React, { useState, useMemo } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { color as d3color } from 'd3-color';
import styled from 'styled-components';
import { IndicatorColor } from '@/constants';

type TIndicator = {
  color?: string;
  text: string;
};

const AnimatedContainer = styled(animated.div)`
  font-size: 32px;
  padding: 4px;
  font-weight: 300;
  border-radius: 12px;
`;

const Indicator: React.FC<TIndicator> = ({
  color = IndicatorColor.normal,
  text,
}) => {
  const [running, setRunning] = useState(true);
  const darkerColor = useMemo(
    () =>
      d3color(color) && color
        ? d3color(color)!
            .darker()
            .toString()
        : 'grey',
    [color],
  );
  const props = useSpring({
    from: {
      opacity: 0.8,
      color: darkerColor,
      marginLeft: 24,
      border: `2px solid ${darkerColor}`,
      fontWeight: 600,
    },
    to: {
      opacity: running ? 1 : 0.8,
      color,
      marginLeft: 24,
      border: `2px solid ${color}`,
      fontWeight: 600,
    },
    config: config.gentle,
    onRest: () => setRunning(prev => !prev),
  });

  return <AnimatedContainer style={props}>{text}</AnimatedContainer>;
};

export default Indicator;
