import { Modal, Steps } from 'antd';
import React from 'react';
interface ResultCreateStreamProps {
    data: any[],
    openState: boolean,
    closeFunc: () => void
}

const ResultCreateStream: React.FC<ResultCreateStreamProps> = ({ data, openState, closeFunc }) => {
    const description = 'This is a description.';
    return <>

        <Modal title="Basic Modal" open={openState} onCancel={closeFunc}>
            <Steps
                current={1}
                items={[
                    {
                        title: 'Finished',
                        description,
                    },
                    {
                        title: 'In Progress',
                        description,
                        subTitle: 'Left 00:00:08',
                    },
                    {
                        title: 'Waiting',
                        description,
                    },
                ]}
            />
        </Modal>
    </>

}

export default ResultCreateStream
