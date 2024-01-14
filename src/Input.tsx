import './Input.css';
export interface props{
    type: string
    placeholder?: string
    id: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string | number
}
const Input = (props: props) => {
    return(
        <input className='CC' type={props.type} placeholder={props.placeholder} id={props.id} value={props.value} onChange={props.onChange}/>
    )
}

export default Input;