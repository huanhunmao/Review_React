import React from 'react'

import {useDialog} from './DialogContext'

const GlobalDialog = () => {
    const {isOpen,openDialog, content, closeDialog} = useDialog()

    return isOpen ? (
        <div>
            <div>{content}</div>
            <button onClick={closeDialog}>关闭</button>
        </div>
    ): <button onClick={() => openDialog('Show Modal Data')}>打开</button>
}

export default GlobalDialog