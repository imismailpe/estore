import { Fragment } from "react"
import { HeaderComp } from "./header"

const Layout = (props)=>{
    return(
        <Fragment>
            <header><HeaderComp /></header>
            <main>{props.children}</main>
        </Fragment>
    )
}
export default Layout;