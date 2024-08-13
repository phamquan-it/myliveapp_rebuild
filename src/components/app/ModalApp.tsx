import React, { ReactNode } from 'react';
interface ModalContent {
    key: string,
    component: ReactNode
}
interface ModalAppProps {
    openKey: string
    contents: ModalContent[]
}

const ModalApp: React.FC<ModalAppProps> = ({ contents, openKey }) => {
    return (
        <>
            {contents.map((content) => (<>
                {(content.key == openKey) ? content.component : <></>}
            </>))}
        </>
    )
}

export default ModalApp
