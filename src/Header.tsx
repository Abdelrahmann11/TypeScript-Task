export interface props{
    title: string
    color?: string
}

const Header = (props: props)=>{
    return(
        <header>
            <h1 style={{color:props.color ? props.color:"red"}}>
                {props.title}
            </h1>
        </header>
    )
}

export default Header;