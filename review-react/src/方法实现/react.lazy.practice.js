import React from "react";


export function lazyLoadComponent(importComponent){
   return class lazyLoadComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            component: null
        }
    }

    async componentDidMount(){
        const {default: component}  = await importComponent()
        this.setState({component: component})
    }

    render(){
        const LoadedComponent = this.state.component
        return LoadedComponent ? <LoadedComponent {...this.props}/> : null
    }
   }
}