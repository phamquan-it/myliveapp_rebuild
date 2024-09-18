import { Progress } from 'antd';
import React from 'react';
interface CreateStreamProcessProps{
    stepsGap: number,
    stepsCount: number,
    percent: number
}

const CreateStreamProcess:React.FC<CreateStreamProcessProps> = ({ stepsGap, stepsCount, percent }) => {
    return <>
        <Progress
          type="circle"
          percent={percent}
          steps={{ count: stepsCount, gap: stepsGap }}
          trailColor="rgba(0, 0, 0, 0.06)"
          strokeWidth={20}
        />
    </>
}

export default CreateStreamProcess
