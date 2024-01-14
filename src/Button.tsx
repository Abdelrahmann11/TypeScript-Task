export interface props{
    title: string
    disabled:boolean
}

const Button = (props: props) =>{
    return(
        <button disabled={props.disabled}>
            {props.title}
        </button>
    )
}

export default Button