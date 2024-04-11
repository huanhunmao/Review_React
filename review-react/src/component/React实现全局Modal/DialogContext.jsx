import React, { createContext, useState, useContext} from 'react'

const DialogContext = createContext()

export const useDialog = () => useContext(DialogContext)

export const DialogProvider = ({ children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState(null)

    const openDialog = content => {
        setContent(content)
        setIsOpen(true)
    }

    const closeDialog = () => {
        setContent(null)
        setIsOpen(false)
    }

    return (
        <DialogContext.Provider value={{isOpen, content, openDialog, closeDialog}}>
            {children}
        </DialogContext.Provider>
    )
}